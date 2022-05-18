const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');


app.set('port', 8000);
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("file");

app.post('/', (req, res) => {
  upload(req, res, err => {
      if(err) {
          return res.json({ success: false, err});
      }
      return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
  })

})

app.listen(8000, () => {
  console.log('백엔드 실행중');
})