let Draggable = require ('Draggable')
var Ajax = require('./ajax')

let dragbound = document.getElementById('drag-bound')
let elements = document.getElementsByClassName('draggable')
let draggables = {};
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
  draggables[element.id] = new Draggable (element, options)
}

Ajax.getActual()
let imageSize = dragbound.clientWidth
let p = (x) => imageSize*x/100

draggables['head']           .set(p(50), p(10))
draggables['neck']           .set(p(50), p(18))
draggables['shoulder_left']  .set(p(56), p(20))
draggables['shoulder_right'] .set(p(44), p(20))
draggables['elbow_left']     .set(p(62), p(32.5))
draggables['elbow_right']    .set(p(38), p(32.5))
draggables['hand_left']      .set(p(60), p(46))
draggables['hand_right']     .set(p(40), p(46))
draggables['torso']          .set(p(50), p(35))
draggables['hip_left']       .set(p(53), p(40))
draggables['hip_right']      .set(p(47), p(40))
draggables['knee_left']      .set(p(55), p(55))
draggables['knee_right']     .set(p(45), p(55))
draggables['foot_left']      .set(p(55), p(68))
draggables['foot_right']     .set(p(45), p(68))

for(let i = 0; i < elements.length; i++){
  let element = elements[i]  
  positions[element.id] = draggables[element.id].get();
}
console.log(positions)

document.getElementById('next-button').addEventListener('click', () => Ajax.sendData(positions));