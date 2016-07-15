import express from 'express';
import IoC from './IoC';
var controller = IoC.createLayer('Controller','Product');
var resource = IoC.create('RouteResource');
var router = express.Router();

router = resource.create(router , controller);

export default router;
