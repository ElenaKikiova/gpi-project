import { AppToolbox } from "../Main.js";

const Shape = class Shape {
  
  Element;
  Title;
  ShapeName;

  constructor(SVGElement){
    console.log(SVGElement);
    this.Element = SVGElement;
    this.Element.node.addEventListener("click", this.onSelected);
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
    this.Element.stroke({ color: '#666', width: 2, linecap: 'round', dasharray: '5, 5' });
  }

  removeActiveBorder = () => {
    this.Element.stroke({ color: 'transparent' });
  }

  onSelected = (event) => {
    if(AppToolbox.currentTool === 'Select'){
      console.log(event);

      this.addActiveBorder();
    }
  }

}

export { Shape }