const express = require('express');
const app = express();
require('dotenv').config();

const uploadRouter = require('./upload');

app.set('port', 8000);

app.use('/file', uploadRouter);

app.listen(8000, () => {
  console.log('백엔드 실행중');
})
