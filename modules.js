import { DrawingArea } from "./DrawingArea.js";
import { getElement } from "./helpers.js";
import { Rectangle } from "./Rectangle.js";
import { SVGArea } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";


SVGArea.drawGrid();

const ColorPickerObject = new ColorPicker();

getElement("#rectangleTool").addEventListener("click", () => {
  const Rect = new Rectangle();
});


export { ColorPickerObject }