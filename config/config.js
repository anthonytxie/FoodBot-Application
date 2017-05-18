var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3005;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/toni'
} else if (env === 'test') {
  process.env.PORT = 3005;
  process.env.MMONGODB_URI = 'mongodb://localhost:27017/toni-test'

}

