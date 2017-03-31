let axios = require('axios')

function sendData(positions) { // eslint-disable-line no-unused-vars
  var pos = positions
  axios.post('php/savePosition.php', {
    positions: pos
  })
  .then(function (response) {
    let image = document.getElementById('#drag-bound')
    image.src = response.file_name
  })
  .catch(function (error) {
    let notification = $('#notification')
    notification.text(error)
    
    notification.fadeIn()
    setTimeout(() => notification.fadeOut() , 2500)
  })
}