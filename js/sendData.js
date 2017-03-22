let axios = require('axios');


function sendData(volunteer, positions, folder){
    axios.post('/savePosition', {
        volunteer: this.volunteer,
        positions: this.positions,
        folder: this.folder
    })
    .then(function (response) {
        console.log("enviado!");
    })
    .catch(function (error) {
        console.log("Algo deu errado!");
    });
}