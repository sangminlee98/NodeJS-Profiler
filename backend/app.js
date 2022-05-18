const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
require('dotenv').config();

let db;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  db = client.db("JSProfiler");
  client.close();
  app.listen(8000, () => {
    console.log('백엔드 실행중');
  })
});

app.set('port', 8000);
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if(ext !== '.png' || ext !== '.jpg'){
          return cb(res.status(400).end('only png, jpg are allowed'), false);
      } 
      cb(null, true);
  }
});

const upload = multer({ storage: storage }).single("file");

app.post('/file', (req, res) => {
  upload(req, res, err => {
      if(err) {
          return res.json({ success: false, err});
      }
      
      return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
  })

})

