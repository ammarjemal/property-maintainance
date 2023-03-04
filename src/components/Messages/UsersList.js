import Spinner from "../UI/Spinner";
import { useAuth } from "../../store/auth-context";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import UserItem from "./UserItem";
import Search from "./Search";
import { ChatContext } from "../../store/chat-context";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Dialog, Transition } from '@headlessui/react';
import Toast from "../UI/Toast";
import "../../index.css";
// import { setDoc, getDoc} from "firebase/firestore";
const UsersList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [chats, setChats] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });
  const { sidebarShown, setSidebarShown, user, setUserSelected } = props;
  const chats = [
    {
      _id: 1,
      displayName: "Abebe Kebede",
      photoURL: "https://picsum.photos/id/0/5000/3333",
      uid: "1234560",
      lastMessage: "How are you?",
      date: "2023-03-03T07:45:05.476Z",
    },
    {
      _id: 2,
      displayName: "Rediet Kebede",
      photoURL: "https://picsum.photos/id/16/2500/1667",
      uid: "14567890",
      lastMessage: "I'm fine",
      date: "2023-03-03T07:45:05.476Z",
    },
    {
      _id: 3,
      displayName: "Seid Abdulrahman",
      photoURL: "https://picsum.photos/id/19/2500/1667",
      uid: "122w567890",
      lastMessage: "Heyyy",
      date: "2023-03-03T07:45:05.476Z",
    },
    {
      _id: 4,
      displayName: "Meron Yimer",
      photoURL: "https://picsum.photos/id/25/5000/3333",
      uid: "1234asd7890",
      lastMessage: "Hey!",
      date: "2023-03-03T07:45:05.476Z",
    },
  ]
  const handleSelect = useCallback(async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        console.log(combinedId);
    dispatch({ type: "CHANGE_USER", payload: user });
    setUserSelected(true);
  },[dispatch, setUserSelected, setSidebarShown]);
  // useEffect(() => {
  //   user && handleSelect(user);
  // }, [handleSelect, user])
  const sidebar = 
    <div className={`scroll5 ${props.className}`}>
      <div className='pt-5 h-full w-full bg-clip-padding bg-opacity-25 text-slate-600 bg-slate-300'>
        <Search user={user} /*selectUserHandler={handleSelect}*/ setUserSelected={setUserSelected}/>
        {/* {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>} */}
        {isLoading && <Spinner type='main'/>}
        {(!isLoading && !error && !chats.length && suggestedUsers) &&
        <div>
          {/* <p className="text-sm text-center">No recent chats</p> */}
          <h1 className="font-semibold my-3 pl-2">Suggested users</h1>
          {suggestedUsers && suggestedUsers.map(user => (
            user.displayName &&
              <UserItem
                sidebarShown={sidebarShown}
                setSidebarShown={setSidebarShown}
                key={user._id}
                id={user._id}
                uid={user.uid || null}
                displayName={user.displayName}
                photoURL={user.photoURL}
                lastMessage={user.profession}
                date={null}
                // onClick={() => handleSelect(user)}
              />
          ))}
        </div>
      }
      <div className="mt-4">
        {(!isLoading && error) && <p>Couldn't fetch users</p>}
        {/* Sort by date */}
        {chats && chats.map((chat) => (
          chat.lastMessage &&
          <UserItem
            // sidebarShown={sidebarShown}
            // setSidebarShown={setSidebarShown}
            key={chat._id}
            id={chat._id}
            uid={chat.uid || null}
            displayName={chat.displayName}
            photoURL={chat.photoURL}
            lastMessage={chat.lastMessage}
            date={chat.date}
            onClick={() => handleSelect({uid: chat.uid, displayName: chat.displayName, photoURL: chat.photoURL})}
          />
        ))
        }
      </div>
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  return (
    <Fragment>
      <Transition appear show={sidebarShown} as={Fragment}>
        <Dialog as="div" className={`relative z-10`} onClose={() => setSidebarShown(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="-left-full"
            enterTo="-left-0"
            leave="ease-in duration-100"
            leaveFrom="-left-0"
            leaveTo="-left-full"
          >
            <Dialog.Panel className={`fixed sm:absolute inset-0 w-full max-w-md transform overflow-hidden transition-all`}>
              {isMobile && sidebar}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {!isMobile && sidebar}
    </Fragment>
  )
}

export default UsersList;