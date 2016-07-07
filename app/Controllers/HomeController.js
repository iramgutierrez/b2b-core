import Q from 'q'

class HomeController
{
    constructor(){}
    
    index(req , res)
    {
        res.send('Home')
    }

}

export default new HomeController()
