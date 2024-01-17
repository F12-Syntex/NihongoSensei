import React, { Component, ReactElement, useEffect } from "react";
import "./SidebarButton.css";
import SidebarButtonsHandler, { SidebarButtonInfo } from "./SideBarButtonsHandler";
import ReactDOM from "react-dom";
import { FilePlayFill } from "react-bootstrap-icons";
import Sidebar from "./Sidebar";
interface SidebarButtonState {
  isHovered: boolean;
}

class SidebarButton extends Component<{
  bootstrapIcon_deactive: ReactElement;
  bootstrapIcon_active: ReactElement;
  targetPage: ReactElement;
  id: string;
  activeButtonId: string;
}, SidebarButtonState> {
  state: SidebarButtonState = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handlePress = () => {
    const handler = SidebarButtonsHandler.getInstance();
    if(handler.getActiveButtonId() === this.props.id){
      return;
    }

    const button = document.getElementById(this.props.id);
    const sideborder = button?.querySelector('.nihongo-sensei-sidebar-button-sideborder');
    
    sideborder?.classList.remove('nihongo-sensei-sidebar-button-sideborder-active');

    handler.setActiveButtonId(this.props.id);

    //rerender the sidebar react element
    const sidebarButtonsHandler = SidebarButtonsHandler.getInstance();
    sidebarButtonsHandler.setActiveButtonId(this.props.id);

    //get the class nihongo-sensei-container-sidebar from the root
    const sidebarcontainer = document.getElementsByClassName(
      "nihongo-sensei-container-sidebar"
    )[0];

    //clone the sidebar and render it
    const sidebar = React.cloneElement(<Sidebar />, {});
    ReactDOM.render(sidebar, sidebarcontainer);
    
  };

  render() {
    const { bootstrapIcon_deactive, bootstrapIcon_active, id } = this.props;
    const { isHovered } = this.state;

    const handler = SidebarButtonsHandler.getInstance();

    const defualt_colour = "gray";
    const hover_colour = "lightgray";
    const selected_colour = "darkgray";

    let button_colour = defualt_colour;

    if (isHovered) {
      button_colour = hover_colour;
    }

    if (handler.getActiveButtonId() === this.props.id) {
      button_colour = selected_colour;
    }

    const iconStyle = {
      height: "75%",
      width: "75%",
      color: button_colour,
    };

    const icon = handler.getActiveButtonId() === this.props.id ? bootstrapIcon_active : bootstrapIcon_deactive;

    const clazz = handler.getActiveButtonId() === this.props.id ? "nihongo-sensei-sidebar-button-sideborder-active" : "nihongo-sensei-sidebar-button-sideborder";

    return (
      <div id={id} className="nihongo-sensei-sidebar-button">
        <div
          className="nihongo-sensei-sidebar-button-container"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handlePress}
        >
          <div className={clazz} />
          <div className="nihongo-sensei-sidebar-button-icon-container">
            {React.cloneElement(icon, {
              style: iconStyle,
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarButton;
