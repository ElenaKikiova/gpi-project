import { SizeLabel } from "../SizeLabel.js";
import { getElement } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";

const Tool = class {
  Element;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();
  DrawingArea;
  
  startX;
  startY;

  activeTool;

  constructor(){
    this.activeTool = false;
  }

  onToolClicked = () => {
    this.activeTool = true;
    document.body.style.cursor = 'crosshair';
    this.listenForFistClick();
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
    this.startX = event.clientX - 60;
    this.startY = event.clientY - 60;
  
    this.drawElement();
    
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