const secretEnv = process.env.JWT_SECRET_CODE;
const expiresIn: string = process.env.JWT_EXPIRE_TIME || '1d';

if (!secretEnv) {
  throw new Error('Missing required environment variable: JWT_SECRET_CODE');
}

const secret: string = secretEnv;

export { secret, expiresIn };
