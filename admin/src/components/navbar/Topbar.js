import React from "react";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import "./topbar.css";
import { logoutUser } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.currentUser.img);
  const history = useHistory();
  const handleClick = () => {
    dispatch(logoutUser());
    history.push("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin </span>
        </div>
        <div className="topRight">
        

          <img src={user.currentUser.img} alt="" className="topAvatar" />
          <div className="logout">
            <button onClick={handleClick}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
