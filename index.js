const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req,res) => {
  res.send('Travelling In Bangladesh Server in running');
});

app.listen(port, () => {
  console.log('Travelling server running at port: ', port);
})