import express from 'express';
import mongoose from 'mongoose';
import authRouter from './auth/authRouter.js';
import usersRouter from './users/usersRouter.js';
import postsRouter from './posts/postsRouter.js';
import cors from 'cors';
import fileUploader from 'express-fileupload';

// const corsOptions = {
//   origin: 'http://127.0.0.1:5500',
//   optionsSuccessStatus: 200,
// }

const PORT = process.env.PORT || 5000;
const mongoUrl = `mongodb+srv://pvl:1qaz@cluster0.twgyg.mongodb.net/insta-clone?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(fileUploader({}));
app.use(cors());
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

const start = async () => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();

