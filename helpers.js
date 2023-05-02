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

const getOpacity = () => {
  
  let opacity = getElement("#opacity").value;

  if(opacity < 0.1){
    opacity = 0.1;
  }
  else if(opacity > 1){
    opacity = 1;
  }
  
  getElement("#opacity").value = opacity;

  return opacity;
}

const toSentenceCase = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export { getElement, getClientCursorXY, getLineLength, toSentenceCase, getOpacity };