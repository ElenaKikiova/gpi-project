import { DrawingArea } from "./DrawingArea.js";
import { getElement } from "./helpers.js";
import { RectangleTool } from "./Tools/RectangleTool.js";
import { SVGArea } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { EllipseTool } from "./Tools/EllipseTool.js";


SVGArea.drawGrid();
const Rect = new RectangleTool();
const Elip = new EllipseTool();

const ColorPickerObject = new ColorPicker();

getElement("#rectangleTool").addEventListener("click", () => {
  Elip.onToolChanged();
  Rect.onToolClicked();
});

getElement("#ellipseTool").addEventListener("click", () => {
  Rect.onToolChanged();
  Elip.onToolClicked();
});

export { ColorPickerObject }