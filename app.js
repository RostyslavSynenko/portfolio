const express = require('express');
const path = require('path');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const projectRoute = require('./routes/projectRoute');
const imageRoute = require('./routes/imageRoute');
const getHealth = require('./routes/healthCheckRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/projects', projectRoute);
app.use('/api/images', imageRoute);
app.use('/api/health', getHealth);

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

module.exports = { app };
