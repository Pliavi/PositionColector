var Store = require('./store')
let Axios = require('axios')

var _this = module.exports = {
  sendData: function(positions, action) {
    Axios.post('php/savePosition.php', {
      positions: positions
    })
    .then(function (response) {
      _this.getImage(action)
    })
    .catch(function (error) {
      let notification = document.getElementById('notification')
      notification.innerHTML = error.response.data
      notification.style.display = 'block'
      setTimeout(() => notification.style.display = 'none' , 4000)
    })
  },

  getImage: function(action) {
    Axios.post('php/getImage.php', { action: action })
      .then((image) => {
        console.log(image)
        document.getElementById('drag-bound').src = image.data.image
      })
      .catch((error) => {
        let notification = document.getElementById('notification')
        notification.innerHTML = error.response.data
        notification.style.display = 'block'
        setTimeout(() => notification.style.display = 'none' , 4000)
      })
  },

  setPosition: function() {
    Store.positions = {}
  }
}
