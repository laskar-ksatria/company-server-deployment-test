const express = require('express');
const Router = express.Router();
const companyController = require('../controllers/companyController');

Router.get('/', companyController.readAll);
Router.post('/', companyController.create);
Router.post('/login', companyController.login);


module.exports = Router;