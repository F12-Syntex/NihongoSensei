import React from "react";
import { ChatRightText, ChatRightTextFill, FilePlay, FilePlayFill, FilePlus } from "react-bootstrap-icons";
import SidebarButton from "./SideBarButton";
import Sensei from "../senseiAi/Sensei";

function Sidebar() {
  return (
    <div className="nihongo-sensei-sidebar-container">
      <SidebarButton bootstrapIcon_active={<FilePlayFill/>} bootstrapIcon_deactive={<FilePlay/>} targetPage={<Sensei/>} id="sidebar-button-test1"/>
      <SidebarButton bootstrapIcon_active={<FilePlayFill/>} bootstrapIcon_deactive={<FilePlay/>} targetPage={<Sensei/>} id="sidebar-button-test2"/>
      <SidebarButton bootstrapIcon_active={<FilePlayFill/>} bootstrapIcon_deactive={<FilePlay/>} targetPage={<Sensei/>} id="sidebar-button-test3"/>
    </div>
  );
}

export default Sidebar;
