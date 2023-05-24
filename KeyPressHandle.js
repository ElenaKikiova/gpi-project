import { AppToolbox } from "./Main.js";
import { AppShapes } from "./Shapes/Shapes.js";
import { existsFocusedInput, getElement } from "./helpers.js";

const KeyPressHandle = class {

  history = [];

  constructor(){
    document.addEventListener("keyup", this.onKeyPress);
  }

  onKeyPress = (event) => {
    this.history.unshift(event.key);
    if(this.history.length > 5) this.history = this.history.splice(0, 4);

    this.selectToolKeyCombinations();
  };

  selectToolKeyCombinations = () => {

    console.log(existsFocusedInput());

    // hanlde delete shape
    if((this.history[0] === 'Backspace' || this.history[0] === 'Delete') && !existsFocusedInput()){
      if(AppShapes.getSelectedShape()) AppShapes.getSelectedShape().deleteShape();
    }

    // handle rename shape
    if(getElement('#newName') && this.history[0] === 'Enter'){
      AppShapes.getSelectedShape().renameShape(getElement('#newName').value);
    }

    if(AppToolbox.currentTool === 'Select' && !existsFocusedInput()){
      // copy
      if((this.history[0] === 'c' && this.history[1] === 'Control') || (this.history[1] === 'c' && this.history[0] === 'Control')){
        AppToolbox.tools['Select'].copy();
        this.history = [];
      }
      // paste
      if((this.history[0] === 'v' && this.history[1] === 'Control') || (this.history[1] === 'v' && this.history[0] === 'Control')){
        AppToolbox.tools['Select'].paste();
        this.history = [];
      }
    }
  }

}

export {KeyPressHandle};