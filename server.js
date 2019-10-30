const { join } = require('path');
const express = require('express');

const { data } = require('./data');

const app = express();

app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(join(__dirname, 'static')));

app.get('/options', (req, res) => {
  const { match } = req.query;
  let fullMatchedDataIndex = null;
  const matchedData = data.filter(item => item.country.toLowerCase().indexOf(match.toLowerCase()) === 0);
  for (let i = 0; i < matchedData.length; i++)
    if (matchedData[i].country.toLowerCase() === match.toLowerCase()) {
      fullMatchedDataIndex = i;
      break;
    }
  res.send({ matchedData, fullMatchedDataIndex });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('port 3000'));
