import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const RectangleTool = class RectangleTool extends Tool {

  constructor(){
    super();
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    let widthLabel = {x: event.clientX - 60 - this.SizeLabelWidth.width(), y: event.clientY - 60 };
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 60 - this.SizeLabelHeight.height()};

    this.Element.width(Math.abs(calculatedWidth));
    this.Element.height(Math.abs(calculatedHeight));

    if(calculatedWidth < 0){
      this.Element.x(event.clientX - 60);
      widthLabel = {x: event.clientX - 60, y: event.clientY - 60};
      heightLabel = {x: event.clientX - 60 - this.SizeLabelHeight.width(), y: event.clientY - 60 - this.SizeLabelHeight.height()};
    }
    if(calculatedHeight < 0){
      this.Element.y(event.clientY - 60);
      widthLabel = {x: event.clientX - 60 - this.SizeLabelWidth.width(), y: event.clientY - 60 - this.SizeLabelWidth.height()};
      heightLabel = {x: event.clientX - 60, y: event.clientY - 60};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: event.clientX - 60, y: event.clientY - 60 - this.SizeLabelWidth.height()};
      heightLabel = {x: event.clientX - 60 - this.SizeLabelHeight.width(), y: event.clientY - 60};
    }

    if(this.keepRatio){
      this.Element.height(this.Element.width());
      widthLabel = {x: this.startX + this.Element.width() - 50, y: this.startY + this.Element.height()};
      heightLabel = {x: this.startX + this.Element.width(), y: this.startY + this.Element.height() - 20};
    }
    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    this.Element = SVGArea.getObject().rect(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
  }
  
}

export { RectangleTool };