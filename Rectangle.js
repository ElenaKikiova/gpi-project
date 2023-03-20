import { SizeLabel } from "./SizeLabel.js";
import { getElement } from "./helpers.js";
import { SVGArea } from "./Main.js";
import { ColorPickerObject } from "./modules.js";

const Rectangle = class {
  Rect;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();
  DrawingArea;

  startX;
  startY;

  constructor(){
    document.body.style.cursor = 'crosshair';
    // this.Color = Color;
    this.listenForFistClick();
  }

  
  onSecondPointClicked = () => {
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    this.listenForFistClick();
  };

  onMouseMovement = (event) => {
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    let widthLabel = {x: event.clientX - 100, y: event.clientY - 50};
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 90};

    this.Rect.width(Math.abs(calculatedWidth));
    this.Rect.height(Math.abs(calculatedHeight));


    if(calculatedWidth < 0){
      this.Rect.x(event.clientX - 60);
      widthLabel = {x: event.clientX - 60, y: event.clientY - 50};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 90};
    }
    if(calculatedHeight < 0){
      this.Rect.y(event.clientY - 60);
      widthLabel = {x: event.clientX - 100, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 50, y: event.clientY - 50};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: event.clientX - 50, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 50};
    }

    this.SizeLabelWidth.setLabel(this.Rect.width().toString(), widthLabel.x, widthLabel.y);
    this.SizeLabelHeight.setLabel(this.Rect.height().toString(), heightLabel.x, heightLabel.y);
  };

  onFirstPointClicked = (event) => {
    this.startX = event.clientX - 60;
    this.startY = event.clientY - 60;
  
    this.Rect = SVGArea.getObject().rect(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
    
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

export { Rectangle };