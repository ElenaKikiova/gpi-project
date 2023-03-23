import { AppToolbox } from "../Main.js";

const Shape = class Shape {
  
  Element;
  Title;
  ShapeName;

  constructor(SVGElement){
    this.Element = SVGElement;
    console.log(SVGElement);
    this.Element.node.addEventListener("click", this.onSelected);
  }

  onSelected = (event) => {
    console.log(event);
    console.log(AppToolbox.currentTool);
  }

}

export { Shape }