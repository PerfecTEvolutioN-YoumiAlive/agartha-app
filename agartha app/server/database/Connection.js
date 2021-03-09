const mongoose = require('mongoose');

async function Connection () {
  const connection_url = 'mongodb+srv://multiverse:multiverse0123456@agartha.urlvq.mongodb.net/multiverse?retryWrites=true&w=majority';

  mongoose.connect(
    process.env.MONGODB_URI || connection_url, 
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log('Database Connected!')
  );
}

module.exports = Connection;
