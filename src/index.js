import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import api from './routes/apis';
import { port } from './configs';

const app = express();
app.use(cookieParser());

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', api);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
