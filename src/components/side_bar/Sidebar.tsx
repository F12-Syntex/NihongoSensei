import { useEffect, useState } from "react";
import { ChatLeft, ChatLeftDotsFill, ChatLeftFill, FilePlay, FilePlayFill, HouseDoor, HouseDoorFill, Pencil, PencilFill, PencilSquare } from "react-bootstrap-icons";
import SentenceBuilder from "../SentenceBuilder/SentenceBuilder";
import Homepage from "../homepage/Homepage";
import SidebarButton from "./SideBarButton";
import SidebarButtonsHandler, { SidebarButtonInfo } from "./SideBarButtonsHandler";
import { IoBook, IoSettings } from "react-icons/io5";
import "./Sidebar.css";
import Browser from "../browser/Browser";
import Sensei from "../senseiAi/Sensei";
import Settings from "../settings/Settings";

function Sidebar() {
  const sidebarButtonsHandler = SidebarButtonsHandler.getInstance(); // Get the instance of SidebarButtonsHandler
  const [buttonsAdded, setButtonsAdded] = useState(false); // Add state to track if buttons are added

  useEffect(() => {
    const initialButtons: SidebarButtonInfo[] = [
      {
        id: "sidebar-button-homepage",
        bootstrapIcon_active: <HouseDoorFill />,
        bootstrapIcon_deactive: <HouseDoorFill />,
        targetPage: <Homepage />,
        activeButtonId: sidebarButtonsHandler.getActiveButtonId(),
      },
      {
        id: "sidebar-button-sentence-builder",
        bootstrapIcon_active: <PencilSquare />,
        bootstrapIcon_deactive: <PencilSquare />,
        targetPage: <SentenceBuilder />,
        activeButtonId: sidebarButtonsHandler.getActiveButtonId(),
      }, 
      {
        id: "sidebar-ai-chatbot",
        bootstrapIcon_active: <ChatLeft />,
        bootstrapIcon_deactive: <ChatLeft />,
        targetPage: <Sensei />,
        activeButtonId: sidebarButtonsHandler.getActiveButtonId(),
      },
      {
        id: "sidebar-button-settings",
        bootstrapIcon_active: <IoSettings />,
        bootstrapIcon_deactive: <IoSettings />,
        targetPage: <Settings/>,
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
