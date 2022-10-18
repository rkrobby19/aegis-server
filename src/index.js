import express from 'express';

const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.APP_PORT, () => console.log(`Server is running at ${process.env.APP_PORT}`));
