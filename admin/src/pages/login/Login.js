import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../redux/apiCalls";
import { loginSuccess } from "../../redux/userRedux";
import { Link } from "react-router-dom";
const Login = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const history = useHistory();
  const [Navigate, setNavigate] = useState(false);
  const navigate = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    // setNavigate((prev) => {
    //   return !prev;
    // });
    // console.log(loginSuccess)
    // history.push("/");
  };
  // useEffect(() => {
  //   if (Navigate) history.push("/");
  // }, [Navigate, history]);

  return (
    <div className="container">
      <div className="Wrapper">
        <form>
          <div className="header">
            <h2>Login</h2>
          </div>
          <div className="input">
            <input
              size="50"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              size="50"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            <button onClick={handleClick}>Login</button>
          </div>
        </form>
        {user && (
          <div className="start">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
