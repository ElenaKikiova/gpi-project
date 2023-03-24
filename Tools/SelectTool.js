import { SVGArea } from "../Main.js";
import { Tool } from "./Tool.js";

const SelectTool = class SelectTool extends Tool {

  selectedElements = [];
  pasteCount = 0;

  constructor(){
    super();
    this.ToolName = 'Select';
    this.cursor = 'pointer';
  }

  select = (element) => {
    if(this.selectedElements.indexOf(element) == -1) this.selectedElements.push(element);
  }

  copy = () => {
    console.log('copy', this.selectedElements);
  }

  paste = () => {
    this.pasteCount++;
    console.log('paste', this.selectedElements, SVGArea.getNode());

    this.selectedElements.forEach((el) => {
      const cloneSVG = SVG(el.node.cloneNode());
      cloneSVG.move(cloneSVG.x() + 20*this.pasteCount, cloneSVG.y() + 20 * this.pasteCount);
      SVGArea.getObject().add(cloneSVG)
    })

  }
}

export { SelectTool };