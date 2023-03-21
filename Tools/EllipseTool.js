import { getClientCursorXY, getElement } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Tool } from "./Tool.js";

const EllipseTool = class EllipseTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'Ellipse';
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getClientCursorXY(event);

    const calculatedWidth = clientX - this.startX;
    const calculatedHeight = clientY - this.startY;

    const calculatedX = clientX - this.Element.width();
    const calculatedY = clientY - this.Element.height();

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.Element.width(), y: this.startY + this.Element.height()},
    }

    let widthLabel = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };
    let heightLabel = {x: corners.br.x, y: corners.br.y - this.SizeLabelHeight.height()};

    this.Element.x(calculatedX);
    this.Element.y(calculatedY);

    this.Element.width(Math.abs(calculatedWidth));
    this.Element.height(Math.abs(calculatedHeight));

    if(calculatedWidth < 0){
      this.Element.x(clientX);
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
    this.Element = SVGArea.getObject()
      .ellipse(1, 1)
      .move(this.startX, this.startY + 5)
      .fill(ColorPickerObject.getColor())
      .opacity(getElement("#opacity").value);
  }

}

export { EllipseTool };