let Draggable = require ('Draggable')
let dragbound = document.getElementById('drag-bound')
let elements = document.getElementsByClassName('draggable')

var positions = {}

let optionsFactory = {
  limit: dragbound,  
  onDragStart: function(el){
    el.style.cursor = 'none'
  },
  onDragEnd: function (el, x, y) {
    el.style.cursor = 'initial'
    positions[el.id] = [x, y]
    console.log(positions)
  }
}

for(let i = 0; i < elements.length; i++){
  let element = elements[i]
  let options = optionsFactory
  new Draggable (element, options)
}

