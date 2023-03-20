import { getElement } from "./helpers.js";

const ColorPicker = class {

  Color = "#f06f06";
  
  constructor(){
    getElement("#color-picker").value = this.Color;
    getElement("#color-picker").addEventListener("input", this.changeColor);
  }

  getColor = () => {
    return this.Color;
  }

  changeColor = (event) => {
    this.Color = event.target.value;
  }

}

export { ColorPicker };