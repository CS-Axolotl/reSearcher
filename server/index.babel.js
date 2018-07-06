import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import './db';
import router from './routes/index';

const DIST_DIR = path.join(__dirname, '../dist');
const PORT = 8000;
const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOption));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.use('/', router);

app.listen(PORT);
