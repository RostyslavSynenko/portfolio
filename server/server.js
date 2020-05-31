const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const postsRoute = require('./routes/postsRoute');
const imageRoute = require('./routes/imageRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/posts', postsRoute);
app.use('/api/images', imageRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
