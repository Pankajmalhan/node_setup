const { server, socket } = require('../util/imports');
const axios = require('axios');
import Rectangle from "./data";
function getData() {
    return axios.get('https://randomuser.me/api/')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log({ error });
            return {}
        });
}

/*Setup Socket.io  */
const io = socket(server);
io.on('connection', (socket) => {
    /*Emit starting data to client */

    socket.on('getData', (data) => {
        getData().then((data) => {
            io.emit('message', { data });
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
/*Setup Socket.io */
module.exports = io;