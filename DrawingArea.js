import { Shape } from "./Shapes/Shape.js";
import { AppShapes } from "./Shapes/Shapes.js";
import { getElement } from "./helpers.js";

const DrawingArea = class {

  // Object: holds the groups for grid and labels
  Object;
  // Image: contains only the drawn shapes
  Image;

  width;
  height;

  gridSize = 50;

  constructor(){
    this.width = getElement("#drawing-area").clientWidth;
    this.height = getElement("#drawing-area").clientHeight;
    this.Object = SVG().addTo('#drawing-area').size(this.width, this.height);
    this.Image = this.Object.group().attr('id', 'image');
  }

  drawGrid(){
    const gridGroup = this.Object.group().attr('id', 'grid')
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

  getObject = () => {
    return this.Object;
  }

  getImage = () => {
    return this.Image;
  }

  downloadImage = () => {
    
    // remove selection border on shapes
    AppShapes.deselectAllShapes();

    // get only the Image group of the drawing area, which contains only the shapes
    var svgData = this.Image.node.innerHTML;
    // put the shapes in a svg element
    svgData = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs">${svgData}</svg>`;
    var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    // create a link which will be automatically clicked and start downloading the svg
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "ExportedImage.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  openImage = (e) => {
    if(e.target.files[0]){
      const file = e.target.files[0];
      console.log(file);
      var reader = new FileReader();
      const that = this;
      reader.onload = function(event){
          var img = new Image();
          img.src = event.target.result;
          
          const imageGroup = that.Image.group();
          imageGroup.image(img.src, (event) => {

            console.log(event.target.naturalHeight, event.target.naturalWidth)
            
            imageGroup.rect(event.target.naturalWidth, event.target.naturalHeight).attr('class', 'image-rect').fill('transparent');
            const shapeElement = new Shape(imageGroup);
            AppShapes.addShape(shapeElement);
            console.log('added img')
          });

      }
      reader.readAsDataURL(e.target.files[0]); 
    }
  };
}

export { DrawingArea }