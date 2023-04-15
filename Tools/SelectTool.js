import { getElement } from "../helpers.js";
import { SVGArea } from "../Main.js";
import { Shape } from "../Shapes/Shape.js";
import { AppShapes } from "../Shapes/Shapes.js";
import { Tool } from "./Tool.js";

const SelectTool = class SelectTool extends Tool {

  selectedElements = [];
  pasteCount = 0;

  constructor(){
    super();
    this.ToolName = 'Select';
    this.cursor = 'pointer';
  }

  onToolClicked = () => {
    getElement("#drawing-area").addEventListener("click", this.selectClick)
    this.internal_onToolClicked();
  }

  onToolChanged = () => {
    getElement("#drawing-area").removeEventListener("click", this.selectClick);
    this.selectedElements = [];
    AppShapes.deselectAllShapes();
    this.internal_onToolChanged();
  }

  selectClick = (event) => {
    // if click is outside any element, deselect them all
    if(event.target.nodeName === 'svg'){
      AppShapes.deselectAllShapes();
      this.pasteCount = 0;
      this.selectedElements = [];
    }
  }

  select = (shape) => {
    console.log('select', shape)
    if(this.selectedElements.indexOf(shape) == -1) this.selectedElements.push(shape);
  }

  copy = () => {
    console.log('copy', this.selectedElements);
  }

  paste = () => {
    if(this.selectedElements){
      this.pasteCount++;
      console.log('paste', this.selectedElements, SVGArea.getNode());

      this.selectedElements.forEach((el) => {
        const cloneSVG = SVG(el.Element.node.cloneNode());
        const cloneShape = new Shape(cloneSVG);
        AppShapes.addShape(cloneShape);
        cloneSVG.move(cloneSVG.x() + 20*this.pasteCount, cloneSVG.y() + 20 * this.pasteCount);
        SVGArea.getObject().add(cloneSVG);
      })
    }
  }
}

export { SelectTool };