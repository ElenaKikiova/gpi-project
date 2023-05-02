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
  
  let opacity = validateNumberInput(getElement("#opacity").value, 0.1, 1);

  getElement("#opacity").value = opacity;

  return opacity;
}

const getLineWidth = () => {
  let width = validateNumberInput(getElement("#lineWidth").value, 1, 100);

  getElement("#lineWidth").value = width;

  return width;
}

const toSentenceCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export { getElement, getClientCursorXY, getLineLength, toSentenceCase, getOpacity, getLineWidth };