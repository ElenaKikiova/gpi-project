const getElement = (selector) => document.querySelector(selector);

  const drawingAreaWidth = getElement("#drawing-area").clientWidth;
  const drawingAreaHeight = getElement("#drawing-area").clientHeight;

  console.log(drawingAreaHeight, drawingAreaWidth)
  const draw = SVG().addTo('#drawing-area').size(drawingAreaWidth, drawingAreaHeight);


  const onRectangleToolClick = () => {
    console.log('e');
    document.body.style.cursor = 'crosshair';

    let Rect;

    let startX;
    let startY;

    const onSecondPointClicked = (event) => {
      console.log(event, event.clientX, event.clientY);

      getElement("#drawing-area").removeEventListener("mousemove", onMouseMovement);

    };

    const onMouseMovement = (event) => {
      console.log(event, startX);

      Rect.width(event.clientX - startX - 60);
      Rect.height(event.clientY - startY - 60);
    };

    const onFirstPointClicked = (event) => {
      console.log(event, event.clientX, event.clientY);

      startX = event.clientX - 60;
      startY = event.clientY - 60;
      
      Rect = draw.rect(10, 10).move(startX, startY).fill('#f06');
      console.log(Rect);
      
      setTimeout(() => {
        getElement("#drawing-area").addEventListener("mouseup", onSecondPointClicked);
      }, 100);

      getElement("#drawing-area").addEventListener("mousemove", onMouseMovement);

      getElement("#drawing-area").removeEventListener("mousedown", onFirstPointClicked);
    }

    getElement("#drawing-area").addEventListener("mousedown", onFirstPointClicked);
    
    
  }
