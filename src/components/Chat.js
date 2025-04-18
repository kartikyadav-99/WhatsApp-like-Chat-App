import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../redux/StateProvider"; // Import useStateValue from its module
import { doc, onSnapshot, collection, query, orderBy, serverTimestamp, addDoc } from "firebase/firestore"; // Import Firestore functions

const names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey"];

function Chat() {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
   const [{user}] = useStateValue();


  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId); // Get a reference to the document
      const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          setRoomName(snapshot.data().name);
        } else {
          console.error("Room does not exist");
        }
      });

      const messagesRef = collection(db, "rooms", roomId, "messages"); // Reference to messages collection
      const q = query(messagesRef, orderBy("timestamp", "asc")); // Query to order messages by timestamp
      const unsubscribeMessages = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      }; // Cleanup the listeners on unmount
    }
  }, [roomId]);



  useEffect(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    setName(randomName);
  }, []);


  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("You typed >>>", input);

    try {
      const messagesRef = collection(db, "rooms", roomId, "messages"); // Reference to messages collection
      await addDoc(messagesRef, {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(), // Use serverTimestamp from Firestore
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };






  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`}
        />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>



          <span className="chat__name">{message.name}</span>
         {message.message}
          <span className="chat__timestamp">
            {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
        </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}


export default Chat;
