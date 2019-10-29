const { join } = require('path');
const express = require('express');

const { data } = require('./data');

const app = express();

app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(join(__dirname, 'static')));

app.get('/options', (req, res) => {
  res.send(data);
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('port 3000'));
