export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_ROOT_USER: process.env.MONGO_ROOT_USER,
  MONGO_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_TTL: process.env.REDIS_TTL,
});
