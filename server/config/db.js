const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    const conn = mongoose.connection;

    conn.once('open', () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('images');

      /*
       *GridFsStream deprecated. Use instead.
       *
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
      });
      */
      console.log(`MongoDB connected.`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const getGfs = () => gfs;

module.exports = { connectDB, getGfs };
