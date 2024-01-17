import React, { useEffect, useState } from "react";
import SidebarButton from "./SideBarButton";
import Sensei from "../senseiAi/Sensei";
import SidebarButtonsHandler, { SidebarButtonInfo } from "./SideBarButtonsHandler"; 
import "./Sidebar.css";
import { Android, Android2, Apple, ArrowLeftRight, FilePlay, FilePlayFill } from "react-bootstrap-icons";

function Sidebar() {
  const sidebarButtonsHandler = SidebarButtonsHandler.getInstance(); // Get the instance of SidebarButtonsHandler
  const [buttonsAdded, setButtonsAdded] = useState(false); // Add state to track if buttons are added

  useEffect(() => {
    const initialButtons: SidebarButtonInfo[] = [
      {
        id: "sidebar-button-test1",
        bootstrapIcon_active: <FilePlayFill />,
        bootstrapIcon_deactive: <FilePlay />,
        targetPage: <Sensei />,
        activeButtonId: sidebarButtonsHandler.getActiveButtonId(),
      },
      {
        id: "sidebar-button-test2",
        bootstrapIcon_active: <FilePlayFill />,
        bootstrapIcon_deactive: <FilePlay />,
        targetPage: <Sensei />,
        activeButtonId: sidebarButtonsHandler.getActiveButtonId(),
      }
    ];

    sidebarButtonsHandler.clearButtons();
    initialButtons.forEach((button) => {
      sidebarButtonsHandler.addButton(button);
    });

    setButtonsAdded(true); 

  }, [sidebarButtonsHandler]);

  // Render the buttons based on the data stored in the handler
  const renderSidebarButtons = () => {
    const buttons = sidebarButtonsHandler.getAllButtons();
    return buttons.map((button) => (
      <SidebarButton
        key={button.id}
        bootstrapIcon_active={button.bootstrapIcon_active}
        bootstrapIcon_deactive={button.bootstrapIcon_deactive}
        targetPage={button.targetPage}
        id={button.id}
        activeButtonId={button.activeButtonId}
      />
    ));
  };

  return <div className="nihongo-sensei-sidebar-container">{renderSidebarButtons()}</div>;
}

export default Sidebar;
