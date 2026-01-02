import * as userRepository from '../repositories/userRepository';
import { hashPassword, verifyPassword } from '../utils/security';
import jwt, { SignOptions } from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwt';

interface HttpError extends Error {
  status?: number;
}

function createHttpError(status: number, message: string): HttpError {
  const err = new Error(message) as HttpError;
  err.status = status;
  return err;
}

export const register = async ({ username, password }: { username: string; password: string }) => {
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

export const login = async ({ username, password }: { username: string; password: string }) => {
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
    { expiresIn } as SignOptions
  );

  return {
    token,
    user: { id: user.id, username: user.username }
  };
};

