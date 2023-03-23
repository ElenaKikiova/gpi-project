import { Tool } from "./Tool.js";

const SelectTool = class SelectTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Select';
    this.cursor = 'pointer';
  }
}

export { SelectTool };