import { getClientCursorXY, getElement } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const SelectTool = class SelectTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Select';
    this.cursor = 'select';
  }  
}

export { SelectTool };