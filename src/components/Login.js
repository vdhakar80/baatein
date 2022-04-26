import React from "react";
import { authenticate, provider } from "./../firebaseConfig";
import "./../css/Login.css";
import { addNewUser } from "../redux/actions/userAction";
import { connect } from "react-redux";

const Login = (props) => {
  const handleClick = () => {
    authenticate
      .signInWithPopup(provider)
      .then((data) => {
        console.log(data);
        props.addUser(data?.additionalUserInfo?.profile);
      })
      .catch((error) => {
        alert("failed to login");
        console.log(error.message);
      });
  };
  return (
    <div className="login_wrap">
      <div className="login">
        <div className="login-info">
          <img src="/bubble-chat.png" alt="baatain image" />
          <br />
          <h1>Sign In to Baatain</h1>
          <button onClick={handleClick}>Sign In With Google</button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addNewUser(data)),
  };
};
export default connect(null, mapDispatchToProps)(Login);
