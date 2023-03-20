import { DrawingArea } from "./DrawingArea.js";
import { getElement } from "./helpers.js";
import { Rectangle } from "./Rectangle.js";
import { SVGArea } from "./Main.js";


SVGArea.drawGrid();

let color = '#f06';

getElement("#rectangleTool").addEventListener("click", () => {
  const Rect = new Rectangle(color);
});

getElement("#colorPickerTool").addEventListener("click", () => {});

const onColorPickerOpen = () => {

}
