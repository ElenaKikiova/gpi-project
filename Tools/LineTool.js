import { getDrawingAreaCoordinates } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const LineTool = class LineTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Line';
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getDrawingAreaCoordinates(event);

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.Element.width(), y: this.startY + this.Element.height()},
    }

    const differenceX = clientX - this.startX;
    const differenceY = clientY - this.startY;

    let label = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };

    this.Element.plot(this.startX, this.startY, clientX, clientY);
    
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
        this.Element.plot(this.startX, this.startY, this.startX, clientY);
        label = {x: this.Element.x(), y: clientY - this.SizeLabelWidth.height()};
      }
      else {
        this.Element.plot(this.startX, this.startY, clientX, this.startY);
        label = {x: clientX - this.SizeLabelWidth.width(), y: this.Element.y()};
      }
    }

    this.setSizeLabels(label);

  };

  drawElement = () => {
    this.Element = SVGArea.getObject().line(1, 1, 0, 0).move(this.startX, this.startY + 5).stroke({ color: ColorPickerObject.getColor(), width: 1,  linecap: 'round' });
  }
  
}

export { LineTool };