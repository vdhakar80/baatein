import React, { useState, useEffect } from "react";
import "./../css/Sidebar.css";
import { Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import Users from "./Users";
import db from "./../firebaseConfig";
import { connect } from "react-redux";

const Sidebar = (props) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);
  const addNewChat = () => {
    const roomName = prompt("Enter name of room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_header_left">
          <Avatar src={sessionStorage.getItem("picture")} />
          <h3>Baatain</h3>
        </div>
        <div className="sidebar_header_right">
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_content">
          <SearchIcon />
          <input type="text" placeholder="Search" className="input_field" />
        </div>
      </div>
      <div className="new_chat" onClick={addNewChat}>
        Add new chat
      </div>
      <div className="user">
        {rooms.map((room) => (
          <Users key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps, null)(Sidebar);
