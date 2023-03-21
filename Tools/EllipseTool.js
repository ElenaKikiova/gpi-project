import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const EllipseTool = class EllipseTool extends Tool {

  constructor(){
    super();
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    const calculatedX = event.clientX - this.Element.width() - 60;
    const calculatedY = event.clientY - this.Element.height() - 60;

    let widthLabel = {x: event.clientX - 100, y: event.clientY - 50};
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 90};

    this.Element.x(calculatedX);
    this.Element.y(calculatedY);

    this.Element.width(Math.abs(calculatedWidth));
    this.Element.height(Math.abs(calculatedHeight));


    if(calculatedWidth < 0){
      this.Element.x(event.clientX - 60);
      widthLabel = {x: event.clientX - 60, y: event.clientY - 50};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 90};
    }
    if(calculatedHeight < 0){
      this.Element.y(event.clientY - 60);
      widthLabel = {x: event.clientX - 100, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 50, y: event.clientY - 50};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: event.clientX - 50, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 50};
    }

    if(this.keepRatio){
      this.Element.height(this.Element.width());
      widthLabel = {x: this.startX + this.Element.width() - 50, y: this.startY + this.Element.height()};
      heightLabel = {x: this.startX + this.Element.width(), y: this.startY + this.Element.height() - 20};
    }
    
    this.setSizeLabels(widthLabel, heightLabel);
  };

  drawElement = () => {
    this.Element = SVGArea.getObject().ellipse(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
  }

}

export { EllipseTool };