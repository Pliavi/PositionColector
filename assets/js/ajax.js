let Axios = require('axios')

module.exports = {
  sendData: function(positions) {
    if(Object.keys(positions).length >= 15){
      Axios.post('php/savePosition.phpa', {
        positions: positions
      })
      .then(function (response) {   
        let image = document.getElementById('drag-bound')
        image.src = response.data.file_name
      })
      .catch(function (error) {
        let notification = document.getElementById('notification')
        console.log(error)
        notification.innerHTML = error
        notification.style.display = 'block'
        setTimeout(() => notification.style.display = 'none' , 2500)
      })
    } else {
      console.log('é necessário mover todos os pontos!');
    }
  },

  getActual: function() {
    Axios.post('php/getImage.php', { action: 'actual' })
      .then((response) => {
        document.getElementById('drag-bound').src = response.data.image
      })
      .catch((error) => console.log(error))
  }
}
