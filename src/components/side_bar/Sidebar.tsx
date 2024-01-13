import React from "react";
import { ChatRightText } from "react-bootstrap-icons";
import SidebarButton from "./SideBarButton";

function Sidebar() {
  return (
    <div className="nihongo-sensei-sidebar-container">
      <SidebarButton bootstrapIcon={<ChatRightText />} />
    </div>
  );
}

export default Sidebar;
