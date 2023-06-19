import ChatConversation from '../../models/chatConversation.js';
import ChatMessage from '../../models/chatMessage.js';
import catchAsync from '../../utils/catchAsync.js';
import Employee from '../../models/Employee.js';

const getChatConversations = catchAsync(async (req, res) => {
  const conversations = await ChatConversation.findAll({
    where: { customer_id: req.decodedData.customerId },
    include: [
      {
        model: Employee,
        attributes: ['name', 'image'],
      },
    ],
  });
  res.json(conversations);
});

const getChatMessages = catchAsync(async (req, res) => {
  const messages = await ChatMessage.findAll({
    where: { conversation_id: req.params.id },
    include: [
      {
        model: Customer,
        attributes: ['name', 'phone', 'image'],
      },
      {
        model: ChatMessage,
        include: [
          {
            model: Customer,
            attributes: ['name', 'phone', 'image'],
          },
        ],
      },
    ],
  });
  res.json(messages);
});

const sendChatMessage = catchAsync(async (req, res) => {
  const { conversationId, senderId, messageText } = req.body;
  const message = await ChatMessage.create({
    conversation_id: conversationId,
    sender_id: senderId,
    message_text: messageText,
  });
  res.json(message);
});

export {
  getChatConversations,
  getChatMessages,
  sendChatMessage,
};
