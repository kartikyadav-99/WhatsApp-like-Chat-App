import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import db from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore"; // Ensure Firestore functions are imported
import { Link } from "react-router-dom";

const names = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Jamie",
  "Avery",
  "Skyler",
  "Dakota",
  "Blake",
  "Cameron",
  "Drew",
  "Parker",
  "Quinn",
  "Reese",
  "Rowan",
  "Sawyer",
  "Logan",
  "Finley",
];

function SidebarChat({ id, chatName, addNewChat }) {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, "rooms", id, "messages"); // Reference to messages collection
      const q = query(messagesRef, orderBy("timestamp", "desc")); // Query to order messages by timestamp
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => unsubscribe(); // Cleanup the listener on unmount
    }
  }, [id]);

  useEffect(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    setName(randomName);
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      try {
        await addDoc(collection(db, "rooms"), {
          name: roomName,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.log("Room name cannot be empty.");
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`}
        />
        <div className="sidebarChat__info">
          <h2>{chatName}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
