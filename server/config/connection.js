// import dependency
const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Gitbook',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

module.exports = mongoose.connection;