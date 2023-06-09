import { SVGArea } from "./Main.js";

const SizeLabel = class {

  Label;
  LabelGroup;
  LabelBox;
  text;
  x;
  y;

  initialised;

  calculateLabelWidth = (text) => {
    return 10 + text.length * 8;
  }

  setLabel = (text, x, y) => {
    if(!this.initialised){
      this.initialised = true;
      const object = SVGArea.getObject();
      this.LabelGroup = object.group();
      this.LabelBox = object.rect(10, 19).radius(5).x(5).y(5);
      this.Label = object.text(text).x(10).y(7);
      this.LabelGroup.add(this.LabelPadding);
      this.LabelGroup.add(this.LabelBox);
      this.LabelGroup.add(this.Label);
      this.Label.attr('class', 'size-label');
      this.LabelBox.attr('class', 'size-label-box');
    }
    this.Label.text(text);
    this.LabelBox.width(this.calculateLabelWidth(text));
    this.LabelGroup.move(x + 5, y + 10);
  }

  destroyLabel = () => {
    if(this.initialised) {
      this.initialised = false;
      this.LabelGroup.remove();
      this.LabelBox.remove();
      this.Label.remove();
    }
  }

  width = () => this.LabelBox?.width() + 10;
  height = () => this.LabelBox?.height() + 15;
}

export { SizeLabel };