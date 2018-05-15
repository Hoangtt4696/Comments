module.exports.comments = (req, res) => {
  res.render('index', {
    user: req.userinfo
  });
};