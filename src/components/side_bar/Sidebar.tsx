import React from "react";
import { ChatRightText, ChatRightTextFill } from "react-bootstrap-icons";
import SidebarButton from "./SideBarButton";
import Sensei from "../senseiAi/Sensei";

function Sidebar() {
  return (
    <div className="nihongo-sensei-sidebar-container">
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
      <SidebarButton bootstrapIcon_active={<ChatRightTextFill/>} bootstrapIcon_deactive={<ChatRightText/>} targetPage={<Sensei/>} />
    </div>
  );
}

export default Sidebar;
