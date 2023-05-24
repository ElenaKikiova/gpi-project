import { AppShapes } from "./Shapes/Shapes.js";

const getElement = (selector) => document.querySelector(selector);

const getClientCursorXY = (event) => [event.clientX - 60, event.clientY - 60];

const getLineLength = (ShapeElement) => {
  const points = ShapeElement.array();
  let x1 = points[0][0];
  let y1 = points[0][1];
  let x2 = points[1][0];
  let y2 = points[1][1];
  return Math.sqrt( Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2) );
}

const validateNumberInput = (value, min, max) => {
  if(value < min) value = min;
  if(value > max) value = max;
  return value;
}

const getOpacity = () => {
  
  let opacity = validateNumberInput(getElement("#opacity").value, 0, 1);

  getElement("#opacity").value = opacity;

  return opacity;
}

const getLineWidth = () => {
  let width = validateNumberInput(getElement("#lineWidth").value, 1, 100);

  getElement("#lineWidth").value = width;

  return width;
}

const listenForOpacityChange = () => {
  getElement("#opacityInput").style.display = "flex";
  getElement("#opacity").addEventListener("input", changeOpacity);
}

const changeOpacity = () => {
  const opacity = validateNumberInput(getElement("#opacity").value, 0, 1);
  
  if(AppShapes.getSelectedShape()){
    AppShapes.getSelectedShape().opacity(opacity);
  }
}

const listenForResizing = () => {
  getElement("#widthInput").style.display = "flex";
  getElement("#heightInput").style.display = "flex";

  getElement("#width").addEventListener("input", resizeWidth);
  getElement("#height").addEventListener("input", resizeHeight);
}
// for removeEventListener
const resizeWidth = () => resizeShape("width");
const resizeHeight = () => resizeShape("height");

const resizeShape = (param) => {
  
  let value = validateNumberInput(getElement(`#${param}`).value, 1, 2000);

  if(AppShapes.getSelectedShape()){
    if(param === 'width') AppShapes.getSelectedShape().width(value);
    if(param === 'height') AppShapes.getSelectedShape().width(value);
  }
}

const removeParamEventListeners = () => {
  getElement("#widthInput").style.display = "none";
  getElement("#heightInput").style.display = "none";
  getElement("#width").removeEventListener("input", resizeWidth);
  getElement("#height").removeEventListener("input", resizeHeight);
  getElement("#opacityInput").style.display = "none";
  getElement("#opacity").removeEventListener("input", changeOpacity);
  getElement("#opacity").value = 1;
}

const existsFocusedInput = () => {
  return getElement("input:focus");
}

const toSentenceCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export { getElement, getClientCursorXY, getLineLength, toSentenceCase, getOpacity, getLineWidth, listenForResizing, removeParamEventListeners, existsFocusedInput, listenForOpacityChange };