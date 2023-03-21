import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const RectangleTool = class RectangleTool extends Tool {

  constructor(){
    super();
  }

  onMouseMovement = (event) => {
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    let widthLabel = {x: event.clientX - 100, y: event.clientY - 50};
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 90};

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

    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    this.Element = SVGArea.getObject().rect(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
  }
  
}

export { RectangleTool };