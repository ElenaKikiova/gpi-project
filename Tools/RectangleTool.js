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

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.Element.width(), y: this.startY + this.Element.height()},
    }

    let widthLabel = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };
    let heightLabel = {x: corners.br.x, y: corners.br.y - this.SizeLabelHeight.height()};

    this.Element.width(Math.abs(calculatedWidth));
    this.Element.height(Math.abs(calculatedHeight));

    if(calculatedWidth < 0){
      this.Element.x(event.clientX - 60);
      widthLabel.x = this.Element.x();
      heightLabel.x = this.Element.x() - this.SizeLabelHeight.width();
    }

    if(calculatedHeight < 0){
      this.Element.y(event.clientY - 60);
      widthLabel.y = this.Element.y() - this.SizeLabelHeight.height();
      heightLabel.y = this.Element.y();
    }

    if(this.keepRatio){
      this.Element.height(this.Element.width());
    }
    
    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    this.Element = SVGArea.getObject().rect(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
  }
  
}

export { RectangleTool };