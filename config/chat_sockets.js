module.exports.chatSockets = (socketServer) => {

    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection recieved', socket.id);
    })

}