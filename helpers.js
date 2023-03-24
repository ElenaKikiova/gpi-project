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

export { getElement, getClientCursorXY, getLineLength };