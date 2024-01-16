import React, { ReactElement, useState } from "react";
import "./SidebarButton.css";
import SideBarButton from './SideBarButton';

function SidebarButton({
  bootstrapIcon_deactive: deactiveIcon,
  bootstrapIcon_active: activeIcon,
  targetPage: targetPage,
  id: id,
}: {
  bootstrapIcon_deactive: ReactElement;
  bootstrapIcon_active: ReactElement;
  targetPage: ReactElement;
  id: string;
}) {
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePress = () => {

    // if(isSelected){
    //   return;
    // }

    //select the sidebar button with the id of id
    const sidebarButton = document.getElementById(id);

    //if button contains .nihongo-sensei-sidebar-button-active then remove it and add .nihongo-sensei-sidebar-button-deactive
    if(sidebarButton?.classList.contains('nihongo-sensei-sidebar-button-active')){
      sidebarButton?.classList.remove('nihongo-sensei-sidebar-button-active');
      sidebarButton?.classList.add('nihongo-sensei-sidebar-button-deactive');
    } else {
      sidebarButton?.classList.remove('nihongo-sensei-sidebar-button-deactive');
      sidebarButton?.classList.add('nihongo-sensei-sidebar-button-active');
    }
  };
  

  const defualt_colour = "gray";
  const hover_colour = "darkgray";
  const selected_colour = "darkgray";

  let button_colour = defualt_colour;

  if(isHovered) {
    button_colour = hover_colour;
  }

  if(isSelected()) {
    button_colour = selected_colour;
  }

  const iconStyle = {
    height: "75%",
    width: "75%",
    color: button_colour,
  };

  const icon = isSelected() ? activeIcon : deactiveIcon;

  function isSelected() : boolean {
    return document.getElementById(id)?.classList.contains('nihongo-sensei-sidebar-button-active') ?? false;
  }
  
  return (
    <div id={id} className="nihongo-sensei-sidebar-button-deactive">
    <div
      className="nihongo-sensei-sidebar-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handlePress}
    >
    <div className="nihongo-sensei-sidebar-button-sideborder" />
      <div className="nihongo-sensei-sidebar-button-icon-container">
        {React.cloneElement(icon, {
          style: iconStyle,
        })}
      </div>
    </div>
    </div>
  );
}


function disableButton(Button: Element){
  //remove the class nihongo-sensei-sidebar-button-sideborder-active and add nihongo-sensei-sidebar-button-sideborder-deactive
  const sideborder = Button.querySelector('.nihongo-sensei-sidebar-button-sideborder');
  sideborder?.classList.remove('nihongo-sensei-sidebar-button-sideborder-active');
  sideborder?.classList.add('nihongo-sensei-sidebar-button-sideborder-deactive');

  // Make all the other react elements' selected state false
}


export default SidebarButton;
