import server from './server'
import db from './DB'
import io from './IO'
import routes from './Routes'

db.initialize()
routes.initialize()
io.initialize()

server.listen(3000 , () => console.log('Server listen on port 3000') )
