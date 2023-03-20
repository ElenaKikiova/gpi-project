import { getElement } from "./helpers.js";

const ColorPicker = class {

  Color = "#f06f06";
  
  constructor(){
    getElement("#color-picker").value = this.Color;
    getElement("#color-picker").addEventListener("change", this.changeColor);
  }

  getColor = () => {
    return this.Color;
  }

  changeColor = (event) => {
    console.log(event, event.target.value);
    this.Color = event.target.value;
  }

}

export { ColorPicker };