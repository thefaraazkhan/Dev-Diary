const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = { username: user.data.username };
      res.send("Congrats, sucessfully logged in");
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.logout = function () {};

exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send(user);
  }
};

exports.home = function (req, res) {
  if (req.session.user) {
    res.send("Welcome to the app");
  } else {
    res.render("home");
  }
};
