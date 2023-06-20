import express from 'express';
import { chat, chats, chatById, updateChat, deleteChat } from '../../controllers/dashboard/chatController.js';

const router = express.Router();

router.get('/', chats);
router.post('/', chat);
router.get('/:id', chatById);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);

export default router;
