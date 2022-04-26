import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";

function App(props) {
  const [user, setUser] = useState(null);
  if (props?.user?.email) {
    sessionStorage.setItem("email", props?.user?.email);
    sessionStorage.setItem("name", props?.user?.name);
    sessionStorage.setItem("picture", props?.user?.picture);
    sessionStorage.setItem("id", props?.user?.id);
  }
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
    <div>
      {!(sessionStorage.getItem("email") && sessionStorage.getItem("name")) ? (
        <Login />
      ) : (
        <div className="App">
          <div className="app_body">
            {screenSize?.dynamicWidth > 500 && (
              <>
                <Sidebar />
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                    <Chat />
                  </Route>
                </Switch>
              </>
            )}
            {screenSize?.dynamicWidth <= 500 && (
              <>
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                    <Sidebar />
                  </Route>
                </Switch>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps, null)(App);
