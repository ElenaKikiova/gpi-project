import { getDrawingAreaCoordinates } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const RectangleTool = class RectangleTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Rectangle';
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getDrawingAreaCoordinates(event);

    const calculatedWidth = clientX - this.startX;
    const calculatedHeight = clientY - this.startY;

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.Element.width(), y: this.startY + this.Element.height()},
    }

    let widthLabel = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };
    let heightLabel = {x: corners.br.x, y: corners.br.y - this.SizeLabelHeight.height()};

    this.Element.width(Math.abs(calculatedWidth));
    this.Element.height(Math.abs(calculatedHeight));

    
    if(calculatedWidth < 0){
      this.Element.x(this.startX - this.Element.width());
      widthLabel = {x: clientX, y: clientY};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY - this.SizeLabelHeight.height()};
    }
    if(calculatedHeight < 0){
      this.Element.y(clientY);
      widthLabel = {x: clientX - this.SizeLabelWidth.width(), y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX, y: clientY};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: clientX, y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY};
    }

    if(this.shiftHold){
      this.Element.height(this.Element.width());
      widthLabel = {x: this.startX + this.Element.width() - this.SizeLabelWidth.width(), y: this.startY + this.Element.height()};
      heightLabel = {x: this.startX + this.Element.width(), y: this.startY + this.Element.height() - this.SizeLabelHeight.height()};
    }
    
    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    this.Element = SVGArea.getObject().rect(1, 1).move(this.startX, this.startY + 5).fill(ColorPickerObject.getColor());
  }
  
}

export { RectangleTool };