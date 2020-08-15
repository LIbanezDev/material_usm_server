const {io} = require('../app')
/*try {
    const {Proximity, Board, Led} = require("johnny-five");
    const board = new Board();
    board.on('ready', () => {
        const led = new Led(13)
        const proximity = new Proximity({
            controller: "HCSR04",
            pin: 12
        });
        proximity.on('change', () => {
            const {centimeters, inches} = proximity;
            if (centimeters >= 10) {
                led.on()
                io.emit('alerta', {
                    variant: 'success',
                    msg: `El sensor está a ${centimeters} centimetros`
                });
            } else {
                led.off()
                io.emit('alerta', {
                    variant: 'error',
                    msg: `El sensor está a ${centimeters} centimetros`
                });
            }
        })
    })
}catch (e) {
    console.log('Placa no conectada')
}*/

io.on('connection',socket => {
    socket.broadcast.emit('alerta', {
        variant: 'success',
        msg: 'Un usuario se ha conectado!'
    })
    socket.on('msg', msg => {
        socket.broadcast.emit('alerta', {
            variant: 'warning',
            msg
        });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('alerta', {
            variant: 'error',
            msg: 'Un usuario se ha pirado!'
        })
    })
});

