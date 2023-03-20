const getElement = (selector) => document.querySelector(selector);

const drawingAreaWidth = getElement("#drawing-area").clientWidth;
const drawingAreaHeight = getElement("#drawing-area").clientHeight;

console.log(drawingAreaHeight, drawingAreaWidth)
const draw = SVG().addTo('#drawing-area').size(drawingAreaWidth, drawingAreaHeight);

let step = 50;
for(let x = step; x < drawingAreaWidth; x++){
  let line = draw.line(0, drawingAreaHeight, 0, 0).move(x, 0);
  line.stroke({ color: '#333', width: 0.1, linecap: 'round' })
  x += step;
}

for(let y = step; y < drawingAreaWidth; y++){
  let line = draw.line(drawingAreaWidth, 0, 0, 0).move(0, y);
  line.stroke({ color: '#333', width: 0.1, linecap: 'round' })
  y += step;
}


const onRectangleToolClick = () => {
  console.log('e');

  const RectMode = new DrawRectangleMode();
}

const SizeLabel = class {
  Label;
  text;
  x;
  y;

  setLabel(text, x, y){
    if(!this.Label){
      this.Label = draw.text(text).move(x, y);
      this.Label.attr('class', 'size-label')
    }
    else {
      this.Label.text(text).move(x, y);
    }
  }
}


const DrawRectangleMode = class {
  Rect;
  SizeLabelWidth = new SizeLabel();
  SizeLabelHeight = new SizeLabel();

  startX;
  startY;

  constructor(){
    document.body.style.cursor = 'crosshair';
    this.listenForFistClick();
  }

  
  onSecondPointClicked = () => {
    getElement("#drawing-area").removeEventListener("mousemove", this.onMouseMovement);
    this.listenForFistClick();
  };

  onMouseMovement = (event) => {
    const calculatedWidth = event.clientX - this.startX - 60;
    const calculatedHeight = event.clientY - this.startY - 60;

    let widthLabel = {x: event.clientX - 100, y: event.clientY - 50};
    let heightLabel = {x: event.clientX - 60, y: event.clientY - 90};

    this.Rect.width(Math.abs(calculatedWidth));
    this.Rect.height(Math.abs(calculatedHeight));


    if(calculatedWidth < 0){
      this.Rect.x(event.clientX - 60);
      widthLabel = {x: event.clientX - 60, y: event.clientY - 50};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 90};
    }
    if(calculatedHeight < 0){
      this.Rect.y(event.clientY - 60);
      widthLabel = {x: event.clientX - 100, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 50, y: event.clientY - 50};
    }

    if(calculatedHeight < 0 && calculatedWidth < 0){
      widthLabel = {x: event.clientX - 50, y: event.clientY - 80};
      heightLabel = {x: event.clientX - 90, y: event.clientY - 50};
    }

    this.SizeLabelWidth.setLabel(this.Rect.width().toString(), widthLabel.x, widthLabel.y);
    this.SizeLabelHeight.setLabel(this.Rect.height().toString(), heightLabel.x, heightLabel.y);
  };

  onFirstPointClicked = (event) => {
    this.startX = event.clientX - 60;
    this.startY = event.clientY - 60;
  
    this.Rect = draw.rect(1, 1).move(this.startX, this.startY + 5).fill('#f06');
    
    setTimeout(() => {
      getElement("#drawing-area").addEventListener("mouseup", this.onSecondPointClicked);
    }, 100);

    getElement("#drawing-area").addEventListener("mousemove", this.onMouseMovement);
    getElement("#drawing-area").removeEventListener("mousedown", this.onFirstPointClicked);
  }
  
  listenForFistClick = () => {
    this.startX = null;
    this.startY = null;
    getElement("#drawing-area").addEventListener("mousedown", this.onFirstPointClicked);
  }
}