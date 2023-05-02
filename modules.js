import { getElement } from "./helpers.js";
import { SVGArea, AppToolbox } from "./Main.js";
import { ColorPicker } from "./ColorPicker.js";
import { AppShapes } from "./Shapes/Shapes.js";

SVGArea.drawGrid();

const ColorPickerObject = new ColorPicker();
getElement("#lineWidthInput").style.visibility = "hidden";
getElement("#opacityInput").style.visibility = "hidden";

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

getElement("#showShapes").addEventListener("click", () => {
  console.log('All shapes', AppShapes.all);
  console.log('Selected shapes', AppToolbox.tools['Select'].selectedElements)
});

getElement("#deleteAction").addEventListener("click", () => {
  AppShapes.deleteActionClicked();
})

getElement("#renameAction").addEventListener("click", () => {
  AppShapes.renameActionClicked();
})

getElement("#downloadImage").addEventListener("click", () => {

  // remove selection border on shapes
  AppShapes.deselectAllShapes();

  // get only the Image group of the drawing area, which contains only the shapes
  var svgData = getElement("#image").innerHTML;
  // put the shapes in a svg element
  svgData = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs">${svgData}</svg>`;
  var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
  var svgUrl = URL.createObjectURL(svgBlob);
  // create a link which will be automatically clicked and start downloading the svg
  var downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "ExportedImage.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
})

export { ColorPickerObject }