var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3008;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/foodbot'
} else if (env === 'test') {
  process.env.PORT = 3008;
  process.env.MMONGODB_URI = 'mongodb://localhost:27017/foodbot-test'
}

