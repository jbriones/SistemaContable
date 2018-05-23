
const mongoose = require('mongoose');

const dbURI = process.env.ConnectionDb;

const connect = () => {
  mongoose.connect(dbURI, (err) => {
    if (err) {
      console.log(`ERROR connecting to: ${dbURI}. ${err}`);
    } else {
      console.log(`Succeeded connected to: ${dbURI}`);
    }
  });

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${dbURI}`);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

exports.connect = connect;
