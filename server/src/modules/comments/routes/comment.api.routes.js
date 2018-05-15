const express = require('express');

const oidc  = require('../../../utils/oidc.util');

const CommentController = require('../controllers/comment.api.controller');

const routes = express.Router();

routes.use(oidc.ensureAuthenticated());

routes.route('/comments/:commentId')
  .put(CommentController.update)
  .delete(CommentController.delete);

routes.route('/comments/:commentId/replies')
  .get(CommentController.replies)
  .post(CommentController.addReply);

routes.param('commentId', CommentController.loadById);

module.exports = routes;