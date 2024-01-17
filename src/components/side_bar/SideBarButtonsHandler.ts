import ReactDOM from "react-dom";
import SidebarButton from "./SideBarButton";
import Homepage from "../homepage/Homepage";
import Sidebar from "./Sidebar";

export interface SidebarButtonInfo {
  id: string;
  bootstrapIcon_active: JSX.Element;
  bootstrapIcon_deactive: JSX.Element;
  targetPage: JSX.Element;
  activeButtonId: string;
}

class SidebarButtonsHandler {

  private static instance: SidebarButtonsHandler;
  private buttons: SidebarButtonInfo[];
  private activeButtonId: string = "sidebar-button-test1";

  private constructor() {
    this.buttons = [];
  }

  public static getInstance(): SidebarButtonsHandler {
    if (!SidebarButtonsHandler.instance) {
      SidebarButtonsHandler.instance = new SidebarButtonsHandler();
    }
    return SidebarButtonsHandler.instance;
  }

  public addButton(buttonInfo: SidebarButtonInfo): void {
    this.buttons.push(buttonInfo);
  }

  public removeButton(id: string): void {
    this.buttons = this.buttons.filter((button) => button.id !== id);
  }

  public getAllButtons(): SidebarButtonInfo[] {
    return this.buttons;
  }

  public clearButtons(): void {
    this.buttons = [];
  }

  public setActiveButtonId(id: string): void {
    this.activeButtonId = id;
  }

  public getActiveButtonId(): string {
    return this.activeButtonId;
  }
}

export default SidebarButtonsHandler;
