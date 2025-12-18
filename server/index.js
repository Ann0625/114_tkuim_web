import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import signupRouter from './routes/signup.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api/signup', signupRouter);

app.listen(3001, () => console.log(' Server 成功啟動：http://localhost:3001'));