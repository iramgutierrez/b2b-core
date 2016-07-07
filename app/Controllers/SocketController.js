import LoginManager from './Managers/LoginManager'

class SocketController
{
    constructor(LoginManager)
    {
        this.login_manager = LoginManager
    }
    connection(socket)
    {
        console.log(socket.id)
    }
    login(socket , params)
    {
        return this
                    .login_manager
                    .handle(params)
                    .then(user => user)
                    .catch(err => console.log(err))
    }

}

export default new SocketController(LoginManager)
