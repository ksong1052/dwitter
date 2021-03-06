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

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
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

// MongoDB 사용
connectDB()
  .then(() => {  
  console.log('MongoDB connected successfully !');

  /* Socket IO 설정 */ 
  const server = app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
  });
  initSocket(server);
})
.catch(console.error);

