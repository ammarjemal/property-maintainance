import React, { useCallback } from 'react'
import Table from './ServicesTable';
import { useState, useEffect } from 'react';
import Spinner from '../UI/Spinner';
import { Confirm } from '../UI/Confirm';
import Toast from '../UI/Toast';
import { getServices, deleteService } from '../../APIs/serviceAPIs';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
const DeleteService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);

  const fetchData = useCallback(async () => {
    const services = await getServices({setError, setIsLoading});
    console.log(services);
    const tableRows = [];
    let count = 0;
    services.map((service) => (
      count++,
      tableRows.push({
        _id: service._id,
        number: count,
        serviceCategory: service.serviceCategory,
        serviceMaterials: service.serviceMaterials,
        servicePrice: service.servicePrice,
        serviceType: service.serviceType,
      })
    ))
    setServices(tableRows);
  }, [])
  useEffect(() => {
    fetchData();
  },[])
  const deleteServiceHandler = async () => {
    setIsConfirmDeleteShown(false);
    await deleteService(serviceId, { setError,  setSuccess });
    fetchData();
  }
  const deleteClickHandler = (serviceId) => {
    setIsConfirmDeleteShown(true);
    setServiceId(serviceId);
  }
  return (
    <div>
      {isConfirmDeleteShown && <Confirm confirmButtonText="Delete" confirmTitle="Delete" onClick={deleteServiceHandler} onCancel={() => {setIsConfirmDeleteShown(false)}}>Are you sure you want to delete this service?</Confirm>}
      {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
      {(!error && !services.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No services found</p>}
      {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
      <button className='text-sm flex items-center hover:bg-gray-100 p-1 rounded-lg' onClick={() => fetchData()}><ArrowCounterclockwise className='mr-1'/>Refresh</button>
      {(!isLoading && !error) && <Table deleteClickHandler={deleteClickHandler} headers={["#", "Service category", "Price","Service type",  "Material required", "Action"]} rows={services}/>}
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
      {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
    </div>
  )
}

export default DeleteService;