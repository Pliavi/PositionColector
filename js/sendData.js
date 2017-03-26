let axios = require('axios')

function sendData(volunteer, positions, folder) { // eslint-disable-line
  axios.post('/savePosition', {
    data: {
      volunteer: this.volunteer,
      folder: this.folder,
      positions: this.positions,
      index: this.index,
    }
  })
  .then(function () {
    console.log('enviado!')
  })
  .catch(function (error) {
    console.log(error)
  })
}