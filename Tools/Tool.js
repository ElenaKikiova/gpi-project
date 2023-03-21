import { SizeLabel } from "../SizeLabel.js";
import { getDrawingAreaCoordinates, getElement } from "../helpers.js";

const Tool = class {
  Element;
  ToolName;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();
  DrawingArea;
  
  startX;
  startY;

  activeTool;
  
  keepRatio = false;

  constructor(){
    this.activeTool = false;
  }

  onToolClicked = () => {
    this.activeTool = true;
    document.body.style.cursor = 'crosshair';
    this.listenForFistClick();
  }
  
  keyDownListener = (event) => {
    this.keepRatio = (event.key == "Shift");
  }
  keyUpListener = (event) => {
    this.keepRatio = false;
  }

  startListeningForShiftHold = () => {
    document.addEventListener("keydown", this.keyDownListener);
    document.addEventListener("keyup", this.keyUpListener);
  }

  stopListeningForShiftHold = () => {
    this.keepRatio = false;
    document.removeEventListener("keydown", this.keyDownListener);
    document.removeEventListener("keyup", this.keyUpListener);
  }

  onToolChanged = () => {
    this.activeTool = false;
    getElement("#drawing-area").removeEventListener("mousedown", this.onFirstPointClicked);
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    getElement("#drawing-area").removeEventListener("mousedown", this.onSecondPointClicked);
  }
  
  onSecondPointClicked = () => {
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    if(this.activeTool){
      this.listenForFistClick();
    }
    this.stopListeningForShiftHold();

    if(this.ToolName != 'Line'){
      this.Element.stroke({ color: 'transparent' });
    }
  };

  onMouseMovement = (event) => {
    /* is implemented in the Tools extending this class */
  };

  setSizeLabels = (widthLabel, heightLabel) => {
    this.SizeLabelWidth.setLabel(this.Element.width().toString(), widthLabel.x, widthLabel.y);
    this.SizeLabelHeight.setLabel(this.Element.height().toString(), heightLabel.x, heightLabel.y);
  }

  drawElement = () => {
    /* is implemented in the Tools extending this class */
  }

  onFirstPointClicked = (event) => {
    [this.startX, this.startY] = getDrawingAreaCoordinates(event);
  
    this.drawElement();

    if(this.ToolName != 'Line'){
      this.Element.stroke({ color: '#444', width: 1, linecap: 'round', dasharray: '3, 3' });
    }
    
    setTimeout(() => {
      getElement("#drawing-area").addEventListener("mouseup", this.onSecondPointClicked);
    }, 100);

    getElement("#drawing-area").addEventListener("mousemove", this.onMouseMovement);
    getElement("#drawing-area").removeEventListener("mousedown", this.onFirstPointClicked);
  }
  
  listenForFistClick = () => {
    this.startX = null;
    this.startY = null;
    getElement("#drawing-area").addEventListener("mousedown", this.onFirstPointClicked);
  }
}

export { Tool };