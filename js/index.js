let Draggable = require ('Draggable')
let dragbound = document.getElementById('drag-bound')
let elements = document.getElementsByClassName('draggable')

var positions = {}

let optionsFactory = {
  limit: dragbound,  
  setCursor: true,
  onDragEnd: function (el, x, y) {
    positions[el.id] = [x, y]
  }
}

for(let i = 0; i < elements.length; i++){
  let element = elements[i]
  let options = optionsFactory
  new Draggable (element, options)
}

