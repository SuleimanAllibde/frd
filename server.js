const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.static('.')); // يقدّم ملف index.html
app.use(express.json());      // يفك JSON الجاي من المتصفح

app.post('/save', (req, res) => {
  const word = req.body.word;
  fs.appendFile(__dirname + '/words.txt', word + '\n', (err) => {
    if (err) {
      res.status(500).send('خطأ في الحفظ');
    } else {
      // أرسل الكلمة الجديدة مباشرة لكل المتصلين
      io.emit('newWord', word);
      res.send('تم دفّ الكلمة: ' + word);
    }
  });
});

app.get('/words', (req, res) => {
  fs.readFile(__dirname + '/words.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('خطأ في القراءة');
    } else {
      const words = data.trim().split('\n').filter(Boolean);
      res.json(words);
    }
  });
});

server.listen(port, () => {
  console.log(`السيرفر شغّال على http://localhost:${port}`);
});
