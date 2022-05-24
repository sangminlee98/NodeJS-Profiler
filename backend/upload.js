const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

let db;

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  db = client.db("JSProfiler");
});


const router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
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

// 배열 나누는 함수
const division = (arr, n) => {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i <= divide; i++) {
    newArray.push(arr.splice(0, n)); 
  }

  return newArray;
}

router.post('/', (req, res) => {
  upload(req, res, err => {
    if(err) {
        return res.json({ success: false, err});
    }
    fs.readFile('uploads/inputFile.txt', 'utf8', (err, data) => {
      if (err) {
          console.error(err)
          return
      }
      let arr = data.split(/\s+/);
      arr.shift();
      arr.pop();
      for (let i = arr.length - 1; i >= 0; i--) {
        if (isNaN(Number(arr[i]))) {
          arr.splice(i, 1);
        }
      }
      let finalArr = [];
      const newArr = division(arr, 25);
      for(let i=0; i<newArr.length; i++) {
        finalArr.push(division(newArr[i], 5));
      };
      for(let i=0; i<finalArr.length; i++) {
        finalArr[i].pop();
      }
      finalArr.pop();

      db.collection('task1').insertOne({
        core1: [...finalArr.map((data) => data[0][0])],
        core2: [...finalArr.map((data) => data[1][0])],
        core3: [...finalArr.map((data) => data[2][0])],
        core4: [...finalArr.map((data) => data[3][0])],
        core5: [...finalArr.map((data) => data[4][0])],
      })
      .then(
      db.collection('task2').insertOne({
        core1: [...finalArr.map((data) => data[0][1])],
        core2: [...finalArr.map((data) => data[1][1])],
        core3: [...finalArr.map((data) => data[2][1])],
        core4: [...finalArr.map((data) => data[3][1])],
        core5: [...finalArr.map((data) => data[4][1])],
      })
      )
      .then(
        db.collection('task3').insertOne({
          core1: [...finalArr.map((data) => data[0][2])],
          core2: [...finalArr.map((data) => data[1][2])],
          core3: [...finalArr.map((data) => data[2][2])],
          core4: [...finalArr.map((data) => data[3][2])],
          core5: [...finalArr.map((data) => data[4][2])],
        })
      )
      .then(
        db.collection('task4').insertOne({
          core1: [...finalArr.map((data) => data[0][3])],
          core2: [...finalArr.map((data) => data[1][3])],
          core3: [...finalArr.map((data) => data[2][3])],
          core4: [...finalArr.map((data) => data[3][3])],
          core5: [...finalArr.map((data) => data[4][3])],
        })
      )
      .then(
        db.collection('task5').insertOne({
          core1: [...finalArr.map((data) => data[0][4])],
          core2: [...finalArr.map((data) => data[1][4])],
          core3: [...finalArr.map((data) => data[2][4])],
          core4: [...finalArr.map((data) => data[3][4])],
          core5: [...finalArr.map((data) => data[4][4])],
        })
      )
      .then(
        db.collection('core1').insertOne({
          task1: [...finalArr.map((data) => data[0][0])],
          task2: [...finalArr.map((data) => data[0][1])],
          task3: [...finalArr.map((data) => data[0][2])],
          task4: [...finalArr.map((data) => data[0][3])],
          task5: [...finalArr.map((data) => data[0][4])],
        })
      )
      .then(
        db.collection('core2').insertOne({
          task1: [...finalArr.map((data) => data[1][0])],
          task2: [...finalArr.map((data) => data[1][1])],
          task3: [...finalArr.map((data) => data[1][2])],
          task4: [...finalArr.map((data) => data[1][3])],
          task5: [...finalArr.map((data) => data[1][4])],
        })
      )
      .then(
        db.collection('core3').insertOne({
          task1: [...finalArr.map((data) => data[1][0])],
          task2: [...finalArr.map((data) => data[2][1])],
          task3: [...finalArr.map((data) => data[2][2])],
          task4: [...finalArr.map((data) => data[2][3])],
          task5: [...finalArr.map((data) => data[2][4])],
        })
      )
      .then(
        db.collection('core4').insertOne({
          task1: [...finalArr.map((data) => data[3][0])],
          task2: [...finalArr.map((data) => data[3][1])],
          task3: [...finalArr.map((data) => data[3][2])],
          task4: [...finalArr.map((data) => data[3][3])],
          task5: [...finalArr.map((data) => data[3][4])],
        })
      )
      .then(
        db.collection('core5').insertOne({
          task1: [...finalArr.map((data) => data[4][0])],
          task2: [...finalArr.map((data) => data[4][1])],
          task3: [...finalArr.map((data) => data[4][2])],
          task4: [...finalArr.map((data) => data[4][3])],
          task5: [...finalArr.map((data) => data[4][4])],
        })
      ).then(res => console.log(res));
      
    });
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
  })

});

module.exports = router;