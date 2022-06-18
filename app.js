import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
//import { db } from './db/database.js';
// import { sequelize } from './db/database.js';
import { connectDB } from './db/mongodb.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// // Sequelize사용
// sequelize.sync().then(() => {
//   /* Socket IO 설정 */ 
//   const server = app.listen(config.host.port);
//   initSocket(server);
// });

// MongoDB 사용
connectDB().then(db => {
  console.log('Init', db);
  
  /* Socket IO 설정 */ 
  const server = app.listen(config.host.port);
  initSocket(server);
})
.catch(console.error);

