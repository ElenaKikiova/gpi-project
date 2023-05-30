import { getClientCursorXY, getElement, getOpacity } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { ColorPickerObject } from "../modules.js";
import { Shape } from "../Shapes/Shape.js";
import { Tool } from "./Tool.js";

const NewTool = class NewTool extends Tool {

  constructor(){
    super();
    this.ToolName = 'NewTool';
  }

  onMouseMovement = (event) => {
    this.startListeningForShiftHold();

    const [clientX, clientY] = getClientCursorXY(event);

    const calculatedWidth = clientX - this.startX;
    const calculatedHeight = clientY - this.startY;
    const elements = this.ShapeElement.Element.find('.child');

    const corners = {
      tl: {x: this.startX, y: this.startY },
      br: {x: this.startX + this.ShapeElement.width(), y: this.startY + this.ShapeElement.height()},
    }

    let widthLabel = {x: corners.br.x - this.SizeLabelWidth.width(), y: corners.br.y };
    let heightLabel = {x: corners.br.x, y: corners.br.y - this.SizeLabelHeight.height()};
    
    elements[0].width(Math.abs(calculatedWidth));
    elements[0].height(Math.abs(calculatedHeight));

    // elements[1].plot(elements[0].x(), elements[0].y(), elements[0].x() + calculatedWidth, elements[0].y() + calculatedHeight);
    elements[1].plot(elements[0].x() + elements[0].width() / 4, elements[0].y() + elements[0].height() / 4, elements[0].x() + calculatedWidth, elements[0].y() + calculatedHeight).center(elements[0].x() + elements[0].width() / 2, elements[0].y() + elements[0].height() / 2);
    elements[2].plot(elements[0].x() + calculatedWidth * 7 / 8, elements[0].y() + calculatedHeight / 8, elements[0].x() + calculatedWidth / 8, elements[0].y() + calculatedHeight * 7 / 8);

    if(calculatedWidth < 0){
      elements[0].x(this.startX - elements[0].width());
      widthLabel = {x: clientX, y: clientY};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY - this.SizeLabelHeight.height()};
      elements[1].dx(elements[0].width())
      elements[2].dx(elements[0].width())
    }
    if(calculatedHeight < 0){
      elements[0].y(clientY);
      widthLabel = {x: clientX - this.SizeLabelWidth.width(), y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX, y: clientY};
      elements[1].dy(elements[0].height())
      elements[2].dy(elements[0].height())
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: clientX, y: clientY - this.SizeLabelWidth.height()};
      heightLabel = {x: clientX - this.SizeLabelHeight.width(), y: clientY};
    }

    if(this.shiftHold){
      elements[0].height(elements[0].width());
      widthLabel = {x: this.startX + elements[0].width() - elements[0].width(), y: this.startY + elements[0].height()};
      heightLabel = {x: this.startX + elements[0].width(), y: this.startY + elements[0].height() - this.SizeLabelHeight.height()};
    }
    

    this.setSizeLabels(widthLabel, heightLabel);

  };

  drawElement = () => {
    let element =  SVGArea.getImage()
    .ellipse(1, 1)
    .move(this.startX, this.startY + 5)
    .fill(ColorPickerObject.getColor())
    .opacity(getOpacity()).attr('class', 'child');

    const radius = element.width() / 2;

    const centerXY = [element.width() / 2]

    let diag1 = SVGArea.getImage().line(0, 0, element.width(), element.height()).move(this.startX, this.startY)
    diag1.stroke({ color: '#333', width: 1}).attr('class', 'child');
    
    let diag2 = SVGArea.getImage().line(element.width(), 0, 0, element.height()).move(this.startX, this.startY)
    diag2.stroke({ color: '#333', width: 1}).attr('class', 'child');

    const group = SVGArea.getImage().group();
    group.add(element)
    group.add(diag1);
    group.add(diag2);

    this.ShapeElement = new Shape(group);
  }
  
}

export { NewTool };