import { getClientCursorXY, getElement, getLineWidth, getOpacity } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Shape } from "../Shapes/Shape.js";
import { Tool } from "./Tool.js";

const LineTool = class LineTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Line';
  }

  onToolClicked = () => {
    getElement("#lineWidthInput").style.visibility = "visible";
    this.internal_onToolClicked();
  }

  onToolChanged = () => {
    getElement("#lineWidthInput").style.visibility = "hidden";
    this.internal_onToolChanged();
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getClientCursorXY(event);

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.ShapeElement.width(), y: this.startY + this.ShapeElement.height()},
    }

    const differenceX = clientX - this.startX;
    const differenceY = clientY - this.startY;

    let label = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };

    this.ShapeElement.plot(this.startX, this.startY, clientX, clientY);
    
    if(differenceX < 0){
      label = {x: clientX, y: clientY};
    }
    if(differenceY < 0){
      label = {x: clientX - this.SizeLabelWidth.width(), y: clientY - this.SizeLabelWidth.height()};
    }

    if(differenceX < 0 && differenceY < 0){
      label = {x: clientX, y: clientY - this.SizeLabelWidth.height()};
    }

    if(this.shiftHold){
      if(Math.abs(differenceX) < Math.abs(differenceY)){
        this.ShapeElement.plot(this.startX, this.startY, this.startX, clientY);
        label = {x: this.ShapeElement.x(), y: clientY - this.SizeLabelWidth.height()};
      }
      else {
        this.ShapeElement.plot(this.startX, this.startY, clientX, this.startY);
        label = {x: clientX - this.SizeLabelWidth.width(), y: this.ShapeElement.y()};
      }
    }

    this.setSizeLabels(label);

  };

  drawElement = () => {
    let element = SVGArea.getImage()
      .line(1, 1, 0, 0)
      .move(this.startX, this.startY)
      .stroke({ color: ColorPickerObject.getColor(), width: getLineWidth(), linecap: 'round' })
      .opacity(getOpacity());

      this.ShapeElement = new Shape(element);
  }
  
}

export { LineTool };