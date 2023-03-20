import { SizeLabel } from "./SizeLabel.js";
import { getElement } from "./helpers.js";
import { SVGArea } from "./Main.js";
import { ColorPickerObject } from "./modules.js";

const Ellipse = class {
  Elip;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();
  DrawingArea;
  
  startX;
  startY;

  constructor(){
    document.body.style.cursor = 'crosshair';
    this.listenForFistClick();
  }
  
  onSecondPointClicked = () => {
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    this.listenForFistClick();
  };

  onMouseMovement = (event) => {
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    const calculatedX = event.clientX - this.Elip.width() - 60;
    const calculatedY = event.clientY - this.Elip.height() - 60;

    let widthLabel = {x: event.clientX - 100, y: event.clientY - 50};
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 90};

    this.Elip.x(calculatedX);
    this.Elip.y(calculatedY);

    this.Elip.width(Math.abs(calculatedWidth));
    this.Elip.height(Math.abs(calculatedHeight));


    if(calculatedWidth < 0){
      this.Elip.x(event.clientX - 60);
      widthLabel = {x: event.clientX - 60, y: event.clientY - 50};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 90};
    }
    if(calculatedHeight < 0){
      this.Elip.y(event.clientY - 60);
      widthLabel = {x: event.clientX - 100, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 50, y: event.clientY - 50};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: event.clientX - 50, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 50};
    }

    this.SizeLabelWidth.setLabel(this.Elip.width().toString(), widthLabel.x, widthLabel.y);
    this.SizeLabelHeight.setLabel(this.Elip.height().toString(), heightLabel.x, heightLabel.y);
  };

  onFirstPointClicked = (event) => {
    this.startX = event.clientX - 60;
    this.startY = event.clientY - 60;
  
    this.Elip = SVGArea.getObject().ellipse(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
    
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

export { Ellipse };