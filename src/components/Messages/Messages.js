import { Fragment, useState } from "react"
import Toast from "../UI/Toast";
import UsersList from "./UsersList";
import Chats from "./Chats";
import bg from '../../assets/chat-bg.jpg';
import { useMediaQuery } from 'react-responsive';

const Messages = (props) => {
    console.log(props.socket);
    const isMobile = useMediaQuery({ query: `(max-width: 640px)` });
    const [sidebarShown, setSidebarShown] = useState(isMobile);
    const [isLoading, setIsLoading] = useState(false);
    const [userSelected, setUserSelected] = useState(false);
    const [error, setError] = useState(null);
    const chatClasses = "col-start-1 col-span-12 sm:col-span-7 md:col-span-7";
    console.log(userSelected);
    return (
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            {/* Displayed on the full page */}
            <div className={`h-screen mt-10 rounded-3xl w-full flex justify-center`} style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat"}}>
                <div className={`messages-wrapper rounded-3xl bg-inherit h-screen grid grid-cols-12 w-full mb-5 shadow-2xl items-center ${(!isLoading) ? 'justify-start' : 'justify-center'} relative text-zinc-200 ml-0`} style={{backdropFilter: `blur(7px)`}}>
                    {(error && !isLoading) && <p className="text-center text-sm font-semibold">{error}</p>}
                    <UsersList socket={props.socket} userSelected={userSelected} setUserSelected={setUserSelected} sidebarShown={sidebarShown} setSidebarShown={setSidebarShown} user={props?.user} className="col-span-2 col-start-1 sm:col-span-5 md:col-span-5 h-full overflow-auto overflow-y-auto" /*setUserSelected={setUserSelected}*/ setError={setError} setIsLoading={setIsLoading}/>
                    {/* List of messages for between specific user and the current */}
                    {userSelected ? <Chats sidebarShown={sidebarShown} setSidebarShown={setSidebarShown} setUser={props.setUser} /*setUserSelected={setUserSelected}*/ className={chatClasses} setError={setError} setIsLoading={setIsLoading}/> : <div className={`hidden sm:block ${chatClasses}`}><p className="text-center font-semibold text-sm text-gray-600">Select a chat to start messaging</p></div>}
                </div>
            </div>
        </Fragment>
    )
}

export default Messages;