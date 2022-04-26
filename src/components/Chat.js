import React, { useState, useEffect } from "react";
import "./../css/Chat.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useHistory, useParams } from "react-router-dom";
import db from "./../firebaseConfig";
import firebase from "firebase/compat";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputEmoji from "react-input-emoji";

function Chat() {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, [roomId]);

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomName(snapshot.data()?.name);
      });
  }, [roomId]);

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          id: sessionStorage.getItem("id"),
          name: sessionStorage.getItem("name"),
          message: inputValue,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
    setInputValue("");
  };
  const history = useHistory();
  const backward = () => {
    history.push("/");
  };

  //checking screen size
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header_left">
          {screenSize.dynamicWidth <= 500 && (
            <ArrowBackIosIcon onClick={backward} />
          )}
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chat_header_left_info">
            <h2>{roomName}</h2>
            <p>{`Last seen at ${new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}`}</p>
          </div>
        </div>
        <div className="chat_header_right">
          <SearchIcon />
          <AttachFileIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div
        className="chat_body"
        style={{
          backgroundImage: "url(/background1.jpg)",
        }}
      >
        {messages.map((message) => {
          return (
            <p
              className={`chat_message ${
                message.id == sessionStorage.getItem("id") && `chat_sender`
              }`}
            >
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp">
                {new Date(message?.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button type="submit">Send</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
