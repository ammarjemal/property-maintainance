// import React, { useEffect, useState, useContext } from 'react';
// import ChatItem from './ChatItem';
// // import { onSnapshot, serverTimestamp, doc, arrayUnion, Timestamp, updateDoc } from 'firebase/firestore';
// import Spinner from '../UI/Spinner';
// // import { db} from '../../firebase';
// import { useAuth } from "../../store/auth-context";
// import { ChatContext } from '../../store/chat-context';
// import { v4 as uuid } from "uuid";
// import noChatFound from "../../assets/no-chats.svg";
// import chatBg from "../../assets/chat-bg.jpg";
// import { ArrowLeftShort } from 'react-bootstrap-icons';
// import useFocus from '../../hooks/use-focus';
// import socketIO from 'socket.io-client';
// // import { Link } from 'react-router-dom';
// const socket = socketIO.connect('http://localhost:5000');
// const Chats = (props) => {
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [messages, setMessages] = useState(
//     [
//         {
//             _id: "1",
//             message: "Hello",
//             senderId: "asw213",
//             date: "2023-02-01T07:45:05.476Z",
//         },
//         {
//             _id: "2",
//             message: "Hey",
//             senderId: "abc123",
//             date: "2023-02-03T07:45:05.476Z",
//         },
//         {
//             _id: "3",
//             message: "How are you?",
//             senderId: "asw213",
//             date: "2023-02-03T07:45:05.476Z",
//         },
//         {
//             _id: "4",
//             message: "Good, how are you?",
//             senderId: "abc123",
//             date: "2023-03-04T07:45:05.476Z",
//         },
//         {
//             _id: "5",
//             message: "Great!",
//             senderId: "asw213",
//             date: "2023-02-03T07:45:05.476Z",
//         },
//         {
//             _id: "6",
//             message: "How is work?",
//             senderId: "abc123",
//             date: "2023-02-03T07:45:05.476Z",
//         },
//         {
//             _id: "7",
//             message: "Very good, hbu?",
//             senderId: "asw213",
//             date: "2023-03-04T07:45:05.476Z",
//         },
//     ]);
//     const { sidebarShown, setSidebarShown, setUserSelected } = props;
//     const { currentUser } = useAuth();
//     const [message, setMessageText] = useState('');
//     const { data } = useContext(ChatContext);
//     const [inputRef, setInputFocus] = useFocus();

//     const combinedId =
//       currentUser.uid > data.uid
//         ? currentUser.uid + data.uid
//         : data.uid + currentUser.uid;
//     // send message
//     useEffect(() => {
//         setInputFocus();
//     })
//     const handleSend = async (e) => {
//         e.preventDefault();
//         if(message === ''){
//             return;
//         }
//         try{
//             setMessageText('');
//             setMessages(messages => [
//                 ...messages,
//                 {
//                     _id: uuid(),
//                     message,
//                     senderId: currentUser.uid,
//                     date: new Date()
//                 }
//             ])
//             // await updateDoc(doc(db, "chats", data.chatId), {
//             //     messages: arrayUnion({
//             //     id: uuid(),
//             //     text,
//             //     senderId: currentUser.uid,
//             //     date: Timestamp.now(),
//             //     }),
//             // });
//             // await updateDoc(doc(db, "userChats", currentUser.uid), {
//             //     [data.chatId + ".lastMessage"]: {
//             //         text,
//             //     },
//             //     [combinedId + ".userInfo"]: {
//             //         uid: data.user.uid,
//             //         displayName: data.user.displayName,
//             //         photoURL: data.user.photoURL,
//             //     },
//             //     [data.chatId + ".date"]: serverTimestamp(),
//             // });
//             // await updateDoc(doc(db, "userChats", data.user.uid), {
//             //     [data.chatId + ".lastMessage"]: {
//             //         text,
//             //     },
//             //     [combinedId + ".userInfo"]: {
//             //         uid: currentUser.uid,
//             //         displayName: currentUser.displayName,
//             //         photoURL: currentUser.photoURL,
//             //     },
//             //     [data.chatId + ".date"]: serverTimestamp(),
//             // });
//         } catch(err){
//             setError(err?.message)
//         }
//     };
    
//     // useEffect(() => {
//     //     setIsLoading(true);
//     //     try{
//     //         const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//     //             doc.exists() && setMessages(doc.data().messages);
//     //             setIsLoading(false);
//     //         });
        
//     //         return () => {
//     //           unSub();
//     //         };
//     //     }catch(e){
//     //         setIsLoading(false);
//     //         console.log(e);
//     //     }
//     // }, [data.chatId]);
//     const messageChangeHandler = (event) => {
//         setMessageText(event.target.value);
//     }
//     console.log(data);
//     return (
//         <div className={`message rounded-r-3xl h-full w-full ${sidebarShown ? "hidden" : "flex"} flex-col ${props.className}`} style={{backgroundImage: `url(${chatBg})`, backgroundRepeat: "repeat", backgroundSize: "contain"}}>
//             {/* Top */}
//             <div className="message-header p-2 w-full flex text-slate-600 bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}}>
//                 {/* Back button */}
//                 {/* <button onClick={() => {setSidebarShown(true); setUserSelected(false); props.setUser(null);}} className="sm:hidden mr-2"><ArrowLeftShort className="w-6 h-6"/></button> */}
//                 <div className='flex items-center'>
//                     <img className="ml-2 w-10 h-10 rounded-full object-cover" src={data.user?.photoURL} alt='User profile'/>
//                     <div className="ml-2 flex flex-col items-start text-sm">
//                         <p className="font-semibold">{data.user?.displayName}</p>
//                         {/* <p className="font-semibold">Client name</p> */}
//                     </div>
//                 </div>
//             </div>
//             {/* Middle */}
//             <div className={`message-content p-1 flex flex-col justify-end ${error && "justify-center items-center"} w-full h-full`}>
//                 {error && <p className='font-semibold text-sm'>{error}</p>}
//                 {(!error && isLoading) && <Spinner type='main'/>}
//                 {(!error && !isLoading && !messages.length) && <div className='m-auto'><img className='w-[150px]' src={noChatFound} alt=''/><p className='text-sm text-center mt-2 font-semibold text-slate-600'>No messages yet</p></div>}
//                 {(!error && !isLoading) && messages.map((message) => (
//                     <ChatItem message={message} key={message._id}/>
//                 ))}
//             </div>
//             {/* Bottom */}
//             <form className="w-full p-[3px] flex bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}} onSubmit={handleSend}>
//                 <textarea ref={inputRef} id="chat" autoFocus={true} value={message} onChange={messageChangeHandler} rows="1" className="resize-none bg-inherit outline-none block p-2.5 w-full text-sm text-slate-600 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a message..."></textarea>
//                 <button type="submit" className="inline-flex justify-center p-2 text-[#14A9F9] hover:text-[#145cf9] hover:bg-slate-200 cursor-pointer  dark:text-blue-500 dark:hover:bg-gray-600">
//                     <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
//                     <span className="sr-only">Send</span>
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default Chats;

// import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
// console.log(conversation, currentUser);
  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);

  //   const getUser = async () => {
  //     try {
  //       const response = await fetch(`/users?userId=${friendId}`, {
  //           method: 'GET',
  //       });
  //       const data = await response.json();
  //       if (!response.ok) {
  //           throw new Error(data.message || 'Could not update service.');
  //       }
  //       // const res = await axios();
  //       console.log(response.data)
  //       setUser(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg border"
        src={
          user?.profilePicture
            ? "http://localhost:3000/images/" + user.profilePicture
            : "http://localhost:3000/images/person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
