module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('New websocket connection')

        socket.on('disconnect', () => {
            console.log('disconnected user')
        })
    })
}