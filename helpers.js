const getElement = (selector) => document.querySelector(selector);

const getDrawingAreaCoordinates = (event) => [event.clientX - 60, event.clientY - 60];

export { getElement, getDrawingAreaCoordinates };