import express from 'express';
import bcrypt from 'bcrypt';
import { findByEmail, create } from '../repositories/users.js';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (await findByEmail(email)) return res.status(400).json({ error: '帳號已存在' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await create({ email, passwordHash, role: 'student' });
  res.status(201).json({ message: '註冊成功' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: '帳號或密碼錯誤' });
  }
  const token = generateToken(user);
  res.json({ token, user: { email: user.email, role: user.role } });
});

export default router;