import socket from 'socket.io'
import server from './server'
import SocketController from './modules/Login/SocketController'

class IO {
    constructor(socket , server , SocketController)
    {
        this.io = socket(server)
        this.controller = SocketController

    }
    initialize()
    {
        this.io.on('connection', (socket) => {
            /*this.controller.connection(socket)
            socket.on('login', (params) => this.controller.login(socket , params))*/
        })
    }
}

export default new IO(socket, server, SocketController)
