const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: './configs/.env' });
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const ErrorHandler = require('./errors/errorHandler');

const PORT = process.env.PORT || 4999;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use('/', router);
app.all('*', (req, res, next) => {
  return next(ErrorHandler.notFound());
});
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`STARTED ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
