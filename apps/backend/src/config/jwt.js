const secret = process.env.JWT_SECRET_CODE;
const expiresIn = process.env.JWT_EXPIRE_TIME || '1d';

if (!secret) {
  throw new Error('Missing required environment variable: JWT_SECRET_CODE');
}

module.exports = { secret, expiresIn };
