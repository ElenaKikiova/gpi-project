import { DrawingArea } from "./DrawingArea.js";
import { getElement } from "./helpers.js";
import { RectangleTool } from "./Tools/RectangleTool.js";
import { SVGArea } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { EllipseTool } from "./Tools/EllipseTool.js";
import { LineTool } from "./Tools/LineTool.js";


SVGArea.drawGrid();
const LineToolInstance = new LineTool();
const RectangleToolInstance = new RectangleTool();
const EllipseToolInstance = new EllipseTool();

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthTool").style.visibility = "hidden";

getElement("#lineTool").addEventListener("click", () => {
  EllipseToolInstance.onToolChanged();
  RectangleToolInstance.onToolChanged();
  LineToolInstance.onToolClicked();
});

getElement("#rectangleTool").addEventListener("click", () => {
  EllipseToolInstance.onToolChanged();
  LineToolInstance.onToolChanged();
  RectangleToolInstance.onToolClicked();
});

getElement("#ellipseTool").addEventListener("click", () => {
  RectangleToolInstance.onToolChanged();
  LineToolInstance.onToolChanged();
  EllipseToolInstance.onToolClicked();
});

export { ColorPickerObject }