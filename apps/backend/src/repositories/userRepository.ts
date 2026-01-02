import User from '../models/User';

export const findByUsername = (username: string) => {
  return User.findOne({ username });
};

export const create = (data: { username: string; password: string }) => {
  const user = new User(data);
  return user.save();
};

