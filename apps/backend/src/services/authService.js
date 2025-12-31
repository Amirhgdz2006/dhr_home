const userRepository = require('../repositories/userRepository');
const { hashPassword, verifyPassword } = require('../utils/security');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

function createHttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

exports.register = async ({ username, password }) => {
  if (!username || !password) {
    throw createHttpError(400, 'username and password are required');
  }

  const existing = await userRepository.findByUsername(username);
  if (existing) {
    throw createHttpError(409, 'username already exists');
  }

  const hashed = await hashPassword(password);
  return userRepository.create({ username, password: hashed });
};

exports.login = async ({ username, password }) => {
  if (!username || !password) {
    throw createHttpError(400, 'username and password are required');
  }

  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id.toString(), username: user.username },
    secret,
    { expiresIn }
  );

  return {
    token,
    user: { id: user.id, username: user.username }
  };
};
