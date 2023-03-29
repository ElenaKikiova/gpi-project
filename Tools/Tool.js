import { SizeLabel } from "../SizeLabel.js";
import { getClientCursorXY, getElement, getLineLength } from "../helpers.js";
import { AppShapes } from "../Shapes/Shapes.js";

const Tool = class {
  ShapeElement;
  ToolName;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();
  DrawingArea;
  
  startX;
  startY;

  activeTool;
  cursor = 'crosshair';
  
  shiftHold = false;

  constructor(){
    this.activeTool = false;
  }

  onToolClicked = () => {
    /* is implemented in the Tools extending this class */
    this.internal_onToolClicked();
  }

  internal_onToolClicked = () => {
    this.activeTool = true;
    document.body.style.cursor = this.cursor;
    if(this.ToolName != 'Select'){
      this.listenForFistClick();
    }
  }
  
  keyDownListener = (event) => {
    this.shiftHold = (event.key == "Shift");
  }
  keyUpListener = (event) => {
    this.shiftHold = false;
  }

  startListeningForShiftHold = () => {
    document.addEventListener("keydown", this.keyDownListener);
    document.addEventListener("keyup", this.keyUpListener);
  }

  stopListeningForShiftHold = () => {
    this.shiftHold = false;
    document.removeEventListener("keydown", this.keyDownListener);
    document.removeEventListener("keyup", this.keyUpListener);
  }

  onToolChanged = () => {
    /* is implemented in the Tools extending this class */
    this.internal_onToolChanged();
  }

  internal_onToolChanged = () => {
    this.activeTool = false;
    this.destorySizeLabels();
    getElement("#drawing-area").removeEventListener("mousedown", this.onFirstPointClicked);
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    getElement("#drawing-area").removeEventListener("mouseup", this.onSecondPointClicked);
  }
  
  onSecondPointClicked = (event) => {
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    if(this.activeTool){
      this.listenForFistClick();
    }
    this.stopListeningForShiftHold();

    if(this.ToolName != 'Line'){
      this.ShapeElement.removeActiveBorder();
    }
  };

  onMouseMovement = (event) => {
    /* is implemented in the Tools extending this class */
  };

  setSizeLabels = (widthLabel, heightLabel) => {
    if(heightLabel){
      this.SizeLabelWidth.setLabel(this.ShapeElement.width().toString(), widthLabel.x, widthLabel.y);
      this.SizeLabelHeight.setLabel(this.ShapeElement.height().toString(), heightLabel.x, heightLabel.y);
    }
    else {
      let len = getLineLength(this.ShapeElement);
      this.SizeLabelWidth.setLabel(Math.round(len).toString(), widthLabel.x, widthLabel.y);
    }
  }

  destorySizeLabels = () => {
    this.SizeLabelWidth.destroyLabel();
    this.SizeLabelHeight.destroyLabel();
  }

  drawElement = () => {
    /* is implemented in the Tools extending this class */
  }

  onFirstPointClicked = (event) => {
    [this.startX, this.startY] = getClientCursorXY(event);
  
    this.drawElement();

    if(this.ToolName != 'Line'){
      this.ShapeElement.addActiveBorder();
    }
    
    AppShapes.addShape(this.ShapeElement);
    
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