module.exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('index', {
      user: req.userinfo
    });
  } else {
    res.send('Please <a href="/login">login</a>');
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
