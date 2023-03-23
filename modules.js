import { getElement } from "./helpers.js";
import { SVGArea, AppToolbox } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";

SVGArea.drawGrid();

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthTool").style.visibility = "hidden";

getElement("#selectTool").addEventListener("click", () => {
  AppToolbox.chooseTool('Select');
});

getElement("#lineTool").addEventListener("click", () => {
  AppToolbox.chooseTool('Line');
});

getElement("#rectangleTool").addEventListener("click", () => {
  AppToolbox.chooseTool('Rectangle');
});

getElement("#ellipseTool").addEventListener("click", () => {
  AppToolbox.chooseTool('Ellipse');
});

export { ColorPickerObject }