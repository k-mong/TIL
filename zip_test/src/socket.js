import http from 'http';


function Socket(app) {
    const io = new Server(server);
    
    const connectUsers = {};
    
    io.use((socket, next) => {
        const userId = socket.handshake.query.userId;
        if(userId) {
            socket.userId = userId;
            connectUsers[userId] = socket.id;
            return next();
        }

    })
    server.listen(app.get('port'), () => {
        console.log(`서벼연결 ${app.get('port')}`);
      });
}

export default Socket;