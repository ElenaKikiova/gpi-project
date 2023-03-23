import { getElement } from "./helpers.js";
import { RectangleTool } from "./Tools/RectangleTool.js";
import { SVGArea } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { EllipseTool } from "./Tools/EllipseTool.js";
import { LineTool } from "./Tools/LineTool.js";


SVGArea.drawGrid();

const ToolInstances = {
  Line: new LineTool(),
  Rectangle: new RectangleTool(),
  Ellipse: new EllipseTool()
};

const chooseTool = (ToolName) => {
  Object.keys(ToolInstances).forEach(toolName => {
    console.log(ToolInstances[toolName])
    ToolInstances[toolName].onToolChanged();
  });
  ToolInstances[ToolName].onToolClicked();
}

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthTool").style.visibility = "hidden";

getElement("#lineTool").addEventListener("click", () => {
  chooseTool('Line');
});

getElement("#rectangleTool").addEventListener("click", () => {
  chooseTool('Rectangle');
});

getElement("#ellipseTool").addEventListener("click", () => {
  chooseTool('Ellipse');
});

export { ColorPickerObject }