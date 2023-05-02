import { getElement, toSentenceCase } from "../helpers.js";

const Shapes = class {

  all;
  counter;
  selectedShapeID;

  constructor(){
    this.all = [];
    this.counter = {'rect': 0, 'ellipse': 0, 'line': 0};
  }

  getShapeByID = (shapeId) => {
    return this.all.find((s) => s.ID === shapeId);
  }

  getSelectedShape = () => {
    return this.getShapeByID(this.selectedShapeID);
  }

  addShape = (shape) => {
    this.all.push(shape);
    this.counter[shape.Type] = this.counter[shape.Type] + 1;
    const listItem = this.generateShapesListItem(shape);
    listItem.addEventListener('click', () => this.listItemSelected(shape));
    getElement('#shapes-list').appendChild(listItem);
  }

  removeShape = (shape) => {
    const index = this.all.indexOf(shape);
    this.counter[shape.Type] = this.counter[shape.Type] - 1;
    getElement('#shapes-list').removeChild(getElement(`#${shape.ID}`));
    this.all.splice(index, 1);
    this.selectedShapeID = null;
  }

  deselectAllShapes = () => {
    this.all.forEach((shape) => {
      shape.onDeselected();
    })
  }

  selectShapeListItem = (shapeId) => {
    getElement(`.list-shape-item#${shapeId}`).classList.add('selected');
  }

  deselectShapeListItem = (shapeId) => {
    getElement(`.list-shape-item#${shapeId}`).classList.remove('selected');
  }

  generateShapeId = (shape) => {
    return shape.type + '_' + (this.all.length > 0 ? Number(this.all[this.all.length - 1].ID.split('_')[1]) + 1 : 0);
  }

  generateShapeName = (shape) => {
    return toSentenceCase(shape.type) + ' ' + Number(this.counter[shape.type] + 1);
  }
  
  listItemSelected = (shape) => {
    if(this.selectedShapeID){
      this.getShapeByID(this.selectedShapeID).onDeselected();
    }
    this.selectedShapeID = shape.ID;
    shape.onSelected();
  }

  generateShapesListItem = (shape) => {
    let shapeItem = document.createElement('template');
    shapeItem.innerHTML = `<div class="list-shape-item" id='${shape.ID}'> 
      <div class="title">${shape.Title}</div>
    </div>`;
    return shapeItem.content.firstChild;
  }


  renderShapesList = () => {
    const list = getElement('#shapes-list');
    
    this.all.forEach((shape) => {
      let shapeItem = this.generateShapesListItem(shape);
      list.appendChild(shapeItem)
    })
  }

  deleteActionClicked = () => {
    const shape = this.getShapeByID(this.selectedShapeID);
    shape.deleteShape();
    this.selectedShapeID = null;
  }

  renameActionClicked = () => {
    const shape = this.getShapeByID(this.selectedShapeID);
    getElement(`.list-shape-item#${shape.ID}`).innerHTML = `<input type="text" id="newName" value="${shape.Title}" autofocus>`;
  }

  finishRenaming = (shape) => {
    getElement(`.list-shape-item#${shape.ID}`).innerHTML = `<div class="title">${shape.Title}</div>`
  }

}

const AppShapes = new Shapes();

export { AppShapes };