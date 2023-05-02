import { getElement } from "./helpers.js";
import { SVGArea, AppToolbox } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { AppShapes } from "./Shapes/Shapes.js";

SVGArea.drawGrid();

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthInput").style.visibility = "hidden";
getElement("#opacityInput").style.visibility = "hidden";

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

// getElement("#deleteAction").addEventListener("click", () => {
//   if(AppShapes.selectedShapeID){
//     AppShapes.deleteActionClicked();
//   }
// })

// getElement("#renameAction").addEventListener("click", () => {
//   if(AppShapes.selectedShapeID){
//     AppShapes.renameActionClicked();
//   }
// })

getElement("#downloadImage").addEventListener("click", () => {
  SVGArea.downloadImage();
})

export { ColorPickerObject }