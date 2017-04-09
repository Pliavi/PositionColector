var Axios = require('axios')
var Draggable = require ('Draggable')
var draggables = {}
var positions = {}
var dragbound = document.getElementById('drag-bound')
var elements = document.getElementsByClassName('draggable')

// Ajax
function sendData(pos, action) {
  Axios.post('php/savePosition.php', {
    positions: pos
  })
  .then(function () {
    getImage(action)
  })
  .catch(function (error) {
    let notification = document.getElementById('notification')
    notification.innerHTML = error.response.data
    notification.style.display = 'block'
    setTimeout(() => notification.style.display = 'none' , 4000)
  })
}

var getImage = function(action) {
  Axios.post('php/getImage.php', { action: action })
    .then((image) => {
      if(image.data.limit != undefined){
        if(image.data.limit == '<') {
          // document.getElementById('last-button').style.display = 'none'
        } else if(image.data.limit == '>') {
          // document.getElementById('next-button').style.display = 'none'
          showNotification('Chegou ao fim! Muito obrigado!')
        }
      } else {
        document.getElementById('drag-bound').src = image.data.image
        // document.getElementById('next-button').style.display = 'inline-block'
        // document.getElementById('last-button').style.display = 'inline-block'
        if(image.data.positions.length > 0){
          setPositions(image.data.positions)
        }
      }
    })
    .catch((error) => {
      showNotification(error)
    })
}

function showNotification(msg){
  let notification = document.getElementById('notification')
  notification.innerHTML = msg
  notification.style.display = 'block'
  setTimeout(() => notification.style.display = 'none' , 4000)
}

// Position
function start() {
  let optionsFactory = {
    limit: dragbound,  
    onDragStart: function(el){
      el.style.cursor = 'none'
    },
    onDragEnd: function (el) {
      el.style.cursor = 'initial'
      positions[el.id] = draggables[el.id].get()
    }
  }

  for(let i = 0; i < elements.length; i++){
    let element = elements[i]
    let options = optionsFactory
    draggables[element.id] = new Draggable (element, options)
  }

  let imageWidth = dragbound.clientWidth
  let imageHeight = dragbound.clientHeight
  let px = (x) => imageWidth*x/100
  let py = (y) => imageHeight*y/100

  draggables['head']           .set(px(97), py(6))
  draggables['neck']           .set(px(97), py(12))
  draggables['shoulder_left']  .set(px(97), py(18))
  draggables['shoulder_right'] .set(px(97), py(24))
  draggables['elbow_left']     .set(px(97), py(30))
  draggables['elbow_right']    .set(px(97), py(36))
  draggables['hand_left']      .set(px(97), py(42))
  draggables['hand_right']     .set(px(97), py(48))
  draggables['torso']          .set(px(97), py(54))
  draggables['hip_left']       .set(px(97), py(60))
  draggables['hip_right']      .set(px(97), py(66))
  draggables['knee_left']      .set(px(97), py(72))
  draggables['knee_right']     .set(px(97), py(78))
  draggables['foot_left']      .set(px(97), py(84))
  draggables['foot_right']     .set(px(97), py(90))

  for(let i = 0; i < elements.length; i++){
    let element = elements[i]  
    positions[element.id] = draggables[element.id].get()
  }
}

function setPositions(pos){
  pos = JSON.parse(pos)

  for(let i = 0; i < elements.length; i++){
    let element = elements[i]
    draggables[element.id].set(pos[element.id].x, pos[element.id].y)
    positions[element.id] = draggables[element.id].get()
  }
}

start()
getImage('actual')
document.getElementById('next-button').addEventListener('click', () => sendData(positions, 'next'))
document.getElementById('last-button').addEventListener('click', () => sendData(positions, 'last'))

