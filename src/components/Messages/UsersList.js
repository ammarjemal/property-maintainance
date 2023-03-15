import Spinner from "../UI/Spinner";
import { useEffect, useContext, useState, useRef } from "react";
import UserItem from "./UserItem";
import Search from "./Search";
import { ChatContext } from "../../store/chat-context";
import { useMediaQuery } from 'react-responsive';
import Toast from "../UI/Toast";
import "../../index.css";
import conversations from "./Chats";
import ChatItem from "./ChatItem";
import ChatOnline from "./ChatOnline";
import { AuthContext, useAuth } from "../../store/AuthContext";

// import { setDoc, getDoc} from "firebase/firestore";
const UsersList = (props) => {
  const { socket, className } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [conversations, setconversations] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userSelected, setUserSelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const scrollRef = useRef();

  console.log(socket);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), 
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log(user);
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        users.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/conversations/find/${user._id}`, {
          method: 'GET'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get conversations.');
        }
        console.log(data.conversations);
        if(data.conversations.length){
          setConversations(data.conversations);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users`, {
          method: 'GET'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get users.');
        }
        console.log(data.users);
        if(data.users){
          setUsers(data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/messages/${currentChat?._id}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update service.');
        }
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage === ''){
      return;
    }
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(user._id,receiverId,newMessage,);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

      // const res = await axios.post("/messages", message);
      
    fetch(`http://localhost:5000/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
          'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if(res.ok){
          return res.json();
      }else{
        return res.json().then((data) => {
          console.log(data);
          let errorMessage = 'Error on sending message!';
          if (data && data.error || data.error.message) {
              errorMessage = data.error.message || data.error;
          }
          throw new Error(errorMessage);
        });
      }
    }).then((data) => {
      setMessages([...messages, data]);
      setNewMessage("");

    }).catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // const handleSelect = useCallback(async (user) => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //       console.log(combinedId);
  //   dispatch({ type: "CHANGE_USER", payload: user });
  //   setUserSelected(true);
  // },[dispatch, setUserSelected, setSidebarShown]);
  // useEffect(() => {
  //   user && handleSelect(user);
  // }, [handleSelect, user])
  return (
    <div className={`scroll5 ${className}`}>
      <div className='pt-5 h-full w-full bg-clip-padding bg-opacity-25 text-slate-600 bg-slate-300'>
        <Search user={user} /*selectUserHandler={handleSelect}*/ setUserSelected={setUserSelected}/>
        {/* {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>} */}
        {isLoading && <Spinner type='main'/>}
        {(!isLoading && !error && !conversations.length && suggestedUsers) &&
        <div>
          {/* <p className="text-sm text-center">No recent conversations</p> */}
          <h1 className="font-semibold my-3 pl-2">Suggested users</h1>
          {suggestedUsers && suggestedUsers.map(user => (
            user.displayName &&
              <UserItem
                key={user._id}
                id={user._id}
                // uid={user.uid || null}
                // displayName={user.displayName}
                // photoURL={user.photoURL}
                // lastMessage={user.profession}
                date={null}
                // onClick={() => handleSelect(user)}
              />
          ))}
        </div>
      }
      <div className="mt-4">
        {(!isLoading && error) && <p>Couldn't fetch users</p>}
        {/* Sort by date */}
        {conversations && conversations.map((chat) => (
          chat.lastMessage &&
            <UserItem
              // sidebarShown={sidebarShown}
              // setSidebarShown={setSidebarShown}
              key={chat._id}
              id={chat._id}
              // uid={chat.uid || null}
              // displayName={chat.displayName}
              // photoURL={chat.photoURL}
              // lastMessage={chat.lastMessage}
              date={chat.date}
              onClick={() => setCurrentChat(chat)}
              // onClick={() => handleSelect({uid: chat.uid, displayName: chat.displayName, photoURL: chat.photoURL})}
            />
          ))
        }
      </div>
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  )
}

export default UsersList;