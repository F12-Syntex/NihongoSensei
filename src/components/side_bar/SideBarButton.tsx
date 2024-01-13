import React, { ReactElement, useState } from "react";
import "./SidebarButton.css";
import { color } from "framer-motion";

function SidebarButton({
  bootstrapIcon: icon,
}: {
  bootstrapIcon: ReactElement;
}) {
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconStyle = {
    height: "75%",
    width: "75%",
    color: isHovered ? "darkgray" : "gray",
  };

  return (
    <div
      className="nihongo-sensei-sidebar-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nihongo-sensei-sidebar-button-sideborder" />
      <div className="nihongo-sensei-sidebar-button-icon-container">
        {React.cloneElement(icon, {
          style: iconStyle,
        })}
      </div>
    </div>
  );
}

export default SidebarButton;
