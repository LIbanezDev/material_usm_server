const io = require('../app')

io.on('connection', socket => {
    socket.broadcast.emit('AlertaUsuario', {
        variant: 'success',
        msg: 'Un usuario se ha conectado!'
    })
    socket.on('msg', msg => {
        socket.broadcast.emit('AlertaUsuario', {
            variant: 'warning',
            msg
        });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('AlertaUsuario', {
            variant: 'error',
            msg: 'Un usuario se ha pirado!'
        })
    })
});

