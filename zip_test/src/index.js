import express, { Router } from "express";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import helmet from 'helmet';
import { fileURLToPath } from "url";
import { dirname } from "path";
import database from '../database.js';
import cors from 'cors';

dotenv.config();

import WebSocket from "./socket.js";

import pageRouter from "./routes/page.js";
import authRouter from "./routes/auth.js";
import boardRouter from "./routes/board.js";
import userRouter from "./routes/user.js";
import passportConfig from "./passport/index.js";

const app = express();

passportConfig();
app.set('port', process.env.PORT || 8000);

database();

let sessionOption = {};

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
      }),
    );
    app.use(hpp());
} else {
    app.use(morgan('dev'));
};

app.use(cors({
  origin: true,
  credentials: false,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/img', express.static(path.join(__dirname, '../','uploads')));  // '/img'로 시작하는 URL에 대한 요청이 발생하면 현재 디렉토리에 있는 'upload' 폴더로
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
      httpOnly: true,
      secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}


app.use('/page', pageRouter);
app.use('/auth', authRouter);
app.use('/board', boardRouter);
app.use('/user', userRouter);

// 라우터가 없는 요청이 오면 error메세지
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});


// 서버에서 오류가 나면 error.html 을 보내줌
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {},
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
