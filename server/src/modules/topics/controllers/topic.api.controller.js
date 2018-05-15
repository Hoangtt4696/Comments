const CommentModel = require('../../comments/models/comment.model');

module.exports.comments = async (req, res) => {
  const topicId = req.params.topicId;

  if (!topicId) {
    return res.json('Topic id invalid');
  }

  const comments = await CommentModel.find({ topicId: topicId, parentCommentId: null }).lean(true);

  res.json(comments || []);
};

module.exports.addComment = async (req, res) => {
  const topicId = req.params.topicId;
  const content = req.body.content;
  const user = req.userinfo;

  if (!topicId) {
    return res.json('Topic id invalid');
  }

  const newComment = new CommentModel({
    content,
    user,
    topicId
  });

  const savedComment = await newComment.save();

  return res.json(savedComment ? savedComment.toJSON() : {});
};
