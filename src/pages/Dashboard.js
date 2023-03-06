import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getAllAdvertisments } from '../APIs/advertismentAPIs';
import Header from '../components/Layout/Header';
import RightSidebar from '../components/Layout/RightSidebar';

const MainDashboardPage = () => {
  const [advertisments, setAdvertisments] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
      const advertisments = await getAllAdvertisments({ setError, setIsLoading });
      setAdvertisments(advertisments);
    }, [])
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col w-full py-3 px-10'>
        <Header dashboardLayout={true}/>
        <div className="flex flex-col mt-5">
          <h2 className='font-semibold text-xl'>Welcome Back, Baby!</h2>
          <p className='my-5 text-gray-500'>Manager</p>
          <div className='cards grid grid-cols-12 bg-gray-100'>
            
          </div>
        </div>
      </div>
      <RightSidebar posts={advertisments} error={error} isLoading={isLoading}/>
    </div>
  )
}

export default MainDashboardPage;