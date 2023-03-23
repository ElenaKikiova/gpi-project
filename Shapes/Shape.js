const Shape = class Shape {
  
  Element;
  Title;
  ShapeName;

  constructor(SVGElement){
    this.Element = SVGElement;
    console.log(SVGElement);
    this.Element.addEventListener("click", () => console.log('e'));
  }

  onSelected = (event) => {

  }

}

export { Shape }