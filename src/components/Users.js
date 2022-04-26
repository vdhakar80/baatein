import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./../css/Users.css";
import { Link } from "react-router-dom";
import db from "./../firebaseConfig";

const Users = ({ id, name }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="user_body">
        <div className="user_row">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="user_info">
            <h3>{name}</h3>
            <p className="user_last_message">
              {messages[messages.length - 1]?.message}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Users;
