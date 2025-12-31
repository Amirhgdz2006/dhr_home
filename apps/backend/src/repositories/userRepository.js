const User = require('../models/User');

exports.findByUsername = (username) => {
  return User.findOne({ username });
};

exports.create = (data) => {
  const user = new User(data);
  return user.save();
};
