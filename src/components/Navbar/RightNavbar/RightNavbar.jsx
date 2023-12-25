import React from "react";
import { useState } from "react";
import "./RightNavbar.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../../redux/User/userTypes";
import { publicRequest } from "../../../requestMethods";
import { useEffect } from "react";
function RightNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: LOG_OUT });
  };

  return (
    <div className="right__navbar">
      <NavLink to="/">
        <TurnSlightLeftIcon className="buy" />
        <p>Feeds</p>
      </NavLink>
      <NavLink to="/mycars">
        <TurnSlightRightIcon />
        <p>My Cars</p>
      </NavLink>

      <div className="label" onClick={handleLogout}>
        <p>LogOut </p>
        <ExitToAppIcon />
      </div>
    </div>
  );
}

export default RightNavbar;
