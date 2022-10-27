import express from 'express';
import cors from 'cors';
import api from './routes/apis';

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', api);

app.listen(process.env.APP_PORT, () => {
  console.log(`server running at ${process.env.APP_PORT}`);
});
