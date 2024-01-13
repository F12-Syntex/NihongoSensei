import React, { ReactElement, useState } from "react";
import "./SidebarButton.css";

function SidebarButton({
  bootstrapIcon_deactive: deactiveIcon,
  bootstrapIcon_active: activeIcon,
  targetPage: targetPage
}: {
  bootstrapIcon_deactive: ReactElement;
  bootstrapIcon_active: ReactElement;
  targetPage: ReactElement;
}) {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);

  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePress = () => {

    if(isSelected){
      return;
    }

    setIsSelected(!isSelected);

    const sideborder = document.querySelector('.nihongo-sensei-sidebar-button-sideborder');
    const active = document.querySelector('.nihongo-sensei-sidebar-button-sideborder-active');
    const deactive = document.querySelector('.nihongo-sensei-sidebar-button-sideborder-deactive');

    if(sideborder && active) {
      sideborder.classList.remove('nihongo-sensei-sidebar-button-sideborder-active');
      sideborder.classList.add('nihongo-sensei-sidebar-button-sideborder-deactive');
    }

    if(sideborder && deactive) {
      sideborder.classList.remove('nihongo-sensei-sidebar-button-sideborder-deactive');
      sideborder.classList.add('nihongo-sensei-sidebar-button-sideborder-active');
    }

    //render the target page onto the main page

  };
  

  const defualt_colour = "gray";
  const hover_colour = "darkgray";
  const selected_colour = "darkgray";

  let button_colour = defualt_colour;

  if(isHovered) {
    button_colour = hover_colour;
  }

  if(isSelected) {
    button_colour = selected_colour;
  }

  const iconStyle = {
    height: "75%",
    width: "75%",
    color: button_colour,
  };

  const icon = isSelected ? activeIcon : deactiveIcon;

  return (
    <div
      className="nihongo-sensei-sidebar-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handlePress}
    >
    <div className="nihongo-sensei-sidebar-button-sideborder nihongo-sensei-sidebar-button-sideborder-deactive" />
      <div className="nihongo-sensei-sidebar-button-icon-container">
        {React.cloneElement(icon, {
          style: iconStyle,
        })}
      </div>
    </div>
  );
}

export default SidebarButton;
