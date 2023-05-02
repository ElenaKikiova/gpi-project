import { getClientCursorXY, getElement } from "../helpers.js";
import { AppToolbox } from "../Main.js";
import { AppShapes } from "./Shapes.js";

const Shape = class Shape {
  
  ID;
  Element;
  Title;
  Type;
  ShapeName;

  /* dragging */
  dragHoldX;
  dragHoldY;


  constructor(SVGElement){
    this.ID = AppShapes.generateShapeId(SVGElement);
    this.Element = SVGElement;
    this.Element.node.addEventListener("click", this.onSelected);
    this.Title = AppShapes.generateShapeName(SVGElement);
    this.Type = this.Element.type;
  }

  width = () => this.Element.width();
  width = (w) => this.Element.width(w);
  height = () => this.Element.height();
  height = (h) => this.Element.height(h);
  x = () => this.Element.x();
  x = (x) => this.Element.x(x);
  y = () => this.Element.y();
  y = (y) => this.Element.y(y);
  plot = (x1, y1, x2, y2) => this.Element.plot(x1, y1, x2, y2);
  array = () => this.Element.array();

  getNode = () => this.Element.node;

  addActiveBorder = () => {
    if(this.Element.type != 'line'){
      this.Element.stroke({ color: '#666', width: 2, linecap: 'round', dasharray: '5, 5' });
    }
  }

  removeActiveBorder = () => {
    if(this.Element.type != 'line'){
      this.Element.stroke({ color: 'transparent' });
    }
  }

  onKeyPress = (event) => {
    if(event.key === 'Backspace' || event.key === 'Delete'){
      this.Element.remove();
      AppShapes.removeShape(this);
    }
  }

  onSelected = () => {
    if(AppToolbox.currentTool === 'Select' || AppShapes.selectedShapeID === this.ID){
      this.addActiveBorder();
      
      AppShapes.selectShapeListItem(this.ID);

      AppToolbox.tools['Select'].select(this);

      document.addEventListener("keyup", this.onKeyPress);

      document.addEventListener("mousedown", this.beginDragging)
    }
  }

  beginDragging = (event) => {
    console.log('drag');
    document.addEventListener("mouseup", this.stopDragging)
    /* save dragging position - what position inside the shape does the user hold at (xy)? */
    let [dragX, dragY] = getClientCursorXY(event);
    [this.dragHoldX, this.dragHoldY] = [dragX - this.Element.x(), dragY - this.Element.y()];
    document.addEventListener("mousemove", this.dragElement)
  }

  dragElement = (event) => {
    console.log('drags', event, this.dragHoldX, this.dragHoldY);
    /* drag the shape, setting it's xy the client xy minus the position at which the user is holding the shape */
    const [x, y] = getClientCursorXY(event);
    this.Element.move(x - this.dragHoldX, y - this.dragHoldY)
  }

  stopDragging = () => {
    console.log('stop draggiing')
    document.removeEventListener("mousemove", this.dragElement)
    document.removeEventListener("mousedown", this.beginDragging)
    document.removeEventListener("mouseup", this.stopDragging)
  }

  onDeselected = () => {
    this.removeActiveBorder();
    AppShapes.deselectShapeListItem(this.ID);
    document.removeEventListener("keyup", this.onKeyPress);
  }

}

export { Shape }