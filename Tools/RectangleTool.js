import { getClientCursorXY, getElement } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Shape } from "../Shapes/Shape.js";
import { Tool } from "./Tool.js";

const RectangleTool = class RectangleTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Rectangle';
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getClientCursorXY(event);

    const calculatedWidth = clientX - this.startX;
    const calculatedHeight = clientY - this.startY;

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.ShapeElement.width(), y: this.startY + this.ShapeElement.height()},
    }

    let widthLabel = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };
    let heightLabel = {x: corners.br.x, y: corners.br.y - this.SizeLabelHeight.height()};

    this.ShapeElement.width(Math.abs(calculatedWidth));
    this.ShapeElement.height(Math.abs(calculatedHeight));

    
    if(calculatedWidth < 0){
      this.ShapeElement.x(this.startX - this.ShapeElement.width());
      widthLabel = {x: clientX, y: clientY};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY - this.SizeLabelHeight.height()};
    }
    if(calculatedHeight < 0){
      this.ShapeElement.y(clientY);
      widthLabel = {x: clientX - this.SizeLabelWidth.width(), y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX, y: clientY};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: clientX, y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY};
    }

    if(this.shiftHold){
      this.ShapeElement.height(this.ShapeElement.width());
      widthLabel = {x: this.startX + this.ShapeElement.width() - this.SizeLabelWidth.width(), y: this.startY + this.ShapeElement.height()};
      heightLabel = {x: this.startX + this.ShapeElement.width(), y: this.startY + this.ShapeElement.height() - this.SizeLabelHeight.height()};
    }
    
    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    let element = SVGArea.getImage()
      .rect(1, 1).move(this.startX, this.startY + 5)
      .fill(ColorPickerObject.getColor())
      .opacity(getElement("#opacity").value);

      this.ShapeElement = new Shape(element);
  }
  
}

export { RectangleTool };