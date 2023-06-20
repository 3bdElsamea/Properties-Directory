import express from 'express';
import {
  startChatConversations,
  getChatConversations,
  getChatMessages,
  sendChatMessage,
} from '../../controllers/website/chatController.js';

const router = express.Router();

router.post('/conversations/:id/start', startChatConversations);
router.get('/conversations', getChatConversations);
router.get('/conversations/:id/messages', getChatMessages);
router.post('/messages', sendChatMessage);

export default router;
