import { SVGArea } from "./Main.js";

const SizeLabel = class {

  Label;
  text;
  x;
  y;

  setLabel(text, x, y){
    if(!this.Label){
      this.Label = SVGArea.getObject().text(text).move(x, y);
      this.Label.attr('class', 'size-label')
    }
    else {
      this.Label.text(text).move(x, y);
    }
  }
}

export { SizeLabel };