export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
  MONGO_DSN: process.env.MONGO_DSN,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_TTL: process.env.REDIS_TTL,
});
