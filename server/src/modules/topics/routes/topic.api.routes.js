const express = require('express');

const oidc  = require('../../../utils/oidc.util');

const TopicController = require('../controllers/topic.api.controller');

const routes = express.Router();

routes.use(oidc.ensureAuthenticated());

routes.route('/topics/:topicId/comments')
  .get(TopicController.comments)
  .post(TopicController.addComment);

module.exports = routes;