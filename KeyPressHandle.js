import { AppToolbox } from "./Main.js";

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
    if(AppToolbox.currentTool === 'Select'){
      // copy
      if((this.history[0] === 'c' && this.history[1] === 'Control') || (this.history[1] === 'c' && this.history[0] === 'Control')){
        AppToolbox.tools['Select'].copy();
        this.history = [];
      }
      // paste
      if((this.history[0] === 'v' && this.history[1] === 'Control') || (this.history[1] === 'v' && this.history[0] === 'Control')){
        console.log('PASTE')
        console.log(this.history);
        AppToolbox.tools['Select'].paste();
        this.history = [];
      }
    }
  }

}

export {KeyPressHandle};