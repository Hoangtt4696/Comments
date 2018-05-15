const express = require('express');

const IndexController = require('../controllers/index.controller');

const routes = express.Router();

routes.route('/')
  .get(IndexController.index);

routes.route('/logout')
  .get(IndexController.logout);

module.exports = routes;
