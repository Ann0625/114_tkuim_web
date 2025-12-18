import express from 'express';
import { findAll, findByOwner, findById, create, deleteOne } from '../repositories/participants.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const data = req.user.role === 'admin' ? await findAll() : await findByOwner(req.user.id);
  res.json(data);
});

router.post('/', async (req, res) => {
  const newData = { ...req.body, ownerId: req.user.id };
  const result = await create(newData);
  res.status(201).json(result);
});

router.delete('/:id', async (req, res) => {
  const item = await findById(req.params.id);
  if (!item) return res.status(404).json({ error: '找不到資料' });
  if (item.ownerId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: '權限不足' });
  }
  await deleteOne(req.params.id);
  res.json({ message: '刪除成功' });
});

export default router;