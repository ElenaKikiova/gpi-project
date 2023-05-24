import { getElement } from "./helpers.js";
import { SVGArea, AppToolbox } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { AppShapes } from "./Shapes/Shapes.js";

SVGArea.drawGrid();

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthInput").style.display = "none";
getElement("#opacityInput").style.display = "none";
getElement("#widthInput").style.display = "none";
getElement("#heightInput").style.display = "none";

// add onclick listeners for all tools
AppToolbox.toolNames.forEach((tool) => {
  getElement(`#${tool.toLowerCase()}Tool`).addEventListener("click", () => {
    AppToolbox.chooseTool(tool);
  });
})

AppShapes.actions.forEach((action) => {
  getElement(`#${action}`).addEventListener("click", () => {
    if(AppShapes.selectedShapeID){
      AppShapes.shapeActionClicked(action);
    }
  })
});


getElement("#downloadImage").addEventListener("click", () => {
  SVGArea.downloadImage();
})

export { ColorPickerObject }