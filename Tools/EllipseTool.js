import { getElement } from "../helpers.js";
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
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    const calculatedX = event.clientX - this.Element.width() - 60;
    const calculatedY = event.clientY - this.Element.height() - 60;

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