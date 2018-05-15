const CommentModel = require('../models/comment.model');

module.exports.addReply = async (req, res) => {
  const comment = req.model;
  const user = req.userinfo;
  const topicId = req.body.topicId;
  const content = req.body.content;

  if (!topicId) {
    return res.json('Topic id invalid');
  }

  if (!content) {
    return res.json('Content id invalid');
  }

  const newReply = new CommentModel({
    content: content,
    topicId: topicId,
    user: user,
    parentCommentId: comment._id
  });

  const savedComment = await newReply.save();

  return res.json(savedComment ? savedComment.toJSON() : {});
};

module.exports.replies = async (req, res) => {
  const parentCommentId = req.model._id;

  const replies = await CommentModel.find({ parentCommentId }).lean(true);

  res.json(replies || []);
};

module.exports.read = (req, res) => {
  res.json(req.model ? req.model.toJSON() : null);
};

module.exports.update = async (req, res) => {
  const content = req.body.content;
  const comment = req.model;
  const user = req.userinfo;

  if (comment.user.sub !== user.sub) {
    return res.json('Can\'t update comment from others user');
  }

  comment.content = content;
  comment.user = user;

  const savedComment = await comment.save();

  return res.json(savedComment ? savedComment.toJSON() : {});
};

module.exports.delete = async (req, res) => {
  const comment = req.model;
  const user = req.userinfo;

  if (comment.user.sub !== user.sub) {
    return res.json('Can\'t remove comment from others user');
  }

  const result = await comment.remove();

  res.json(result);
};

module.exports.loadById = async (req, res, next, commentId) => {
  if (!commentId) {
    return res.json('Id invalid');
  }

  const foundComment = await CommentModel.findById(commentId);

  if (!foundComment) {
    return res.json('Comment not found');
  }

  req.model = foundComment;

  next();
};