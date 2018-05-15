const express = require('express');

const oidc  = require('../../../utils/oidc.util');

const TopicController = require('../controllers/topic.controller');

const routes = express.Router();

routes.use(oidc.ensureAuthenticated());

routes.route('/topics/:topicId')
    .get(TopicController.comments);

module.exports = routes;