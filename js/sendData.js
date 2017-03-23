let axios = require('axios');

function sendData(volunteer, positions, folder){
    axios.post('/savePosition', {
        data:{
            volunteer: this.volunteer,
            folder: this.folder,
            positions: this.positions,
            index: this.index,
        }
    })
    .then(function (response) {
        console.log("enviado!");
    })
    .catch(function (error) {
        console.log("Algo deu errado!");
    });
}