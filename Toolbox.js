
import { EllipseTool } from "./Tools/EllipseTool.js";
import { LineTool } from "./Tools/LineTool.js";
import { SelectTool } from "./Tools/SelectTool.js";
import { RectangleTool } from "./Tools/RectangleTool.js";
import { NewTool } from "./Tools/NewTool.js";

const Toolbox = class {

  currentTool;
  
  tools = {
    Select: new SelectTool(),
    Line: new LineTool(),
    Rectangle: new RectangleTool(),
    New: new NewTool(),
    Ellipse: new EllipseTool()
  };

  toolNames = Object.keys(this.tools);

  chooseTool = (toolName) => {
    this.toolNames.forEach(t => {
      this.tools[t].onToolChanged();
    });
    this.tools[toolName].onToolClicked();
    this.currentTool = toolName;
  }
}

export { Toolbox }