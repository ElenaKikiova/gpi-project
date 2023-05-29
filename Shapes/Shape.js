import { getClientCursorXY, getElement, removeParamEventListeners, listenForResizing, listenForOpacityChange, listenForRotation } from "../helpers.js";
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
    this.Type = this.Element.type === 'G' ? 'Shape' : this.Element.type;
  }

  width = () => this.Element.width();
  width = (w) => this.Element.width(w);
  height = () => this.Element.height();
  height = (h) => this.Element.height(h);
  opacity = () => this.Element.opacity();
  opacity = (opacity) => this.Element.opacity(opacity);
  color = () => this.Element.fill();
  color = (color) => this.Element.fill(color);
  x = () => this.Element.x();
  x = (x) => this.Element.x(x);
  y = () => this.Element.y();
  y = (y) => this.Element.y(y);
  getRotationAngle = () => Math.round(this.Element.transform().rotate);
  rotationAngle = (angle) => this.Element.transform({ rotate: angle });
  plot = (x1, y1, x2, y2) => this.Element.plot(x1, y1, x2, y2);
  array = () => this.Element.array();

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

  deleteShape = () => {
    this.Element.remove();
    this.onDeselected();
    AppShapes.removeShape(this);
  }

  onSelected = () => {
    if(AppToolbox.currentTool === 'Select' || AppShapes.selectedShapeID === this.ID){
      this.addActiveBorder();

      AppShapes.selectedShapeID = this.ID;
      
      AppShapes.selectShapeListItem(this.ID);

      AppToolbox.tools['Select'].select(this);

      listenForOpacityChange();
      listenForResizing();
      listenForRotation();
      getElement("#opacity").value = this.opacity();
      getElement("#width").value = this.width();
      getElement("#height").value = this.height();
      getElement("#rotationAngle").value = this.getRotationAngle();

      this.Element.node.addEventListener("mousedown", this.beginDragging)
    }
  }

  beginDragging = (event) => {
    document.addEventListener("mouseup", this.stopDragging)
    /* save dragging position - what position inside the shape does the user hold at (xy)? */
    let [dragX, dragY] = getClientCursorXY(event);
    [this.dragHoldX, this.dragHoldY] = [dragX - this.x(), dragY - this.y()];
    document.addEventListener("mousemove", this.dragElement)
  }

  dragElement = (event) => {
    /* drag the shape, setting it's xy the client xy minus the position at which the user is holding the shape */
    const [x, y] = getClientCursorXY(event);
    this.Element.x(x - this.dragHoldX);
    this.Element.y(y - this.dragHoldY);
  }

  stopDragging = () => {
    document.removeEventListener("mousemove", this.dragElement)
    this.Element.node.removeEventListener("mousedown", this.beginDragging)
    document.removeEventListener("mouseup", this.stopDragging)
  }

  onDeselected = () => {
    this.removeActiveBorder();
    AppShapes.selectedShapeID = this.ID;
    AppShapes.deselectShapeListItem(this.ID);
    removeParamEventListeners();
  }

  renameShape = (name) => {
    this.Title = name;
    AppShapes.finishRenaming(this);
  }

}

export { Shape }