const Shapes = class {

  all;

  constructor(){
    this.all = [];
  }

  addShape = (shape) => {
    this.all.push(shape);
  }

  removeShape = (shape) => {
    const index = this.all.indexOf(shape);
    this.all.splice(index, 1);
  }

  deselectAllShapes = () => {
    this.all.forEach((shape) => {
      shape.onDeselected();
    })
  }

}

const AppShapes = new Shapes();

export { AppShapes };