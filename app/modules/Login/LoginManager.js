import q from 'q'

class LoginManager {

    constructor(q)
    {
        this.q = q
    }
    handle(params)
    {
        return this.q.resolve(true)
    }
}

export default new LoginManager(q)
