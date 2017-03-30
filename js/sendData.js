let axios = require('axios')

function sendData(positions) { // eslint-disable-line
  var pos = positions
  axios.post('php/savePosition.php', {
    positions: pos
  })
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
}