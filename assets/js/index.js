var Store = require('./store')
let Draggable = require ('Draggable')
var Ajax = require('./ajax')

let dragbound = document.getElementById('drag-bound')
let elements = document.getElementsByClassName('draggable')

let optionsFactory = {
  limit: dragbound,  
  onDragStart: function(el){
    el.style.cursor = 'none'
  },
  onDragEnd: function (el, x, y) {
    el.style.cursor = 'initial'
    Store.positions[el.id] = [x, y]
    console.log(Store.positions)
  }
}

for(let i = 0; i < elements.length; i++){
  let element = elements[i]
  let options = optionsFactory
  Store.draggables[element.id] = new Draggable (element, options)
}

Ajax.getImage('actual')
let imageSize = dragbound.clientWidth
let p = (x) => imageSize*x/100

Store.draggables['head']           .set(p(50), p(10))
Store.draggables['neck']           .set(p(50), p(18))
Store.draggables['shoulder_left']  .set(p(56), p(20))
Store.draggables['shoulder_right'] .set(p(44), p(20))
Store.draggables['elbow_left']     .set(p(62), p(32.5))
Store.draggables['elbow_right']    .set(p(38), p(32.5))
Store.draggables['hand_left']      .set(p(60), p(46))
Store.draggables['hand_right']     .set(p(40), p(46))
Store.draggables['torso']          .set(p(50), p(35))
Store.draggables['hip_left']       .set(p(53), p(40))
Store.draggables['hip_right']      .set(p(47), p(40))
Store.draggables['knee_left']      .set(p(55), p(55))
Store.draggables['knee_right']     .set(p(45), p(55))
Store.draggables['foot_left']      .set(p(55), p(68))
Store.draggables['foot_right']     .set(p(45), p(68))

for(let i = 0; i < elements.length; i++){
  let element = elements[i]  
  Store.positions[element.id] = Store.draggables[element.id].get()
}

document.getElementById('next-button').addEventListener('click', () => Ajax.sendData(Store.positions, 'next'))
document.getElementById('last-button').addEventListener('click', () => Ajax.sendData(Store.positions, 'last'))