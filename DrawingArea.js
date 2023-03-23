import { getElement } from "./helpers.js";

const DrawingArea = class {

  Object;
  width;
  height;

  gridSize = 50;

  constructor(){
    this.width = getElement("#drawing-area").clientWidth;
    this.height = getElement("#drawing-area").clientHeight;
    this.Object = SVG().addTo('#drawing-area').size(this.width, this.height);
  }

  drawGrid(){
    const gridGroup = this.Object.group();
    for(let x = this.gridSize; x < this.width; x++){
      let line = this.Object.line(0, this.height, 0, 0).move(x, 0);
      line.stroke({ color: '#333', width: 0.1, linecap: 'round' });
      gridGroup.add(line);
      x += (this.gridSize - 1);
    }

    for(let y = this.gridSize; y < this.height; y++){
      let line = this.Object.line(this.width, 0, 0, 0).move(0, y);
      line.stroke({ color: '#333', width: 0.1, linecap: 'round' })
      gridGroup.add(line);
      y += (this.gridSize - 1);
    }

    gridGroup.move(0, 0);

  }

  getObject(){
    return this.Object;
  }

}

export { DrawingArea }