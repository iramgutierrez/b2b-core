import express from 'express'
import controller from './Controllers/ProductController'
import resource from './Helpers/RouteResource'

var router = express.Router()

router = resource.create(router , controller)

export default router;
