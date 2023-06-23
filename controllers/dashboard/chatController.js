import ChatConversation from '../../models/chatConversation.js';
import ChatMessage from '../../models/chatMessage.js';
import catchAsync from '../../utils/catchAsync.js';
import pusher from '../../config/pusher.js';
import Customer from '../../models/Customer.js';

const getChatConversations = catchAsync(async (req, res) => {
  const conversations = await ChatConversation.findAll({
    where: {
      // employee_id: req.decodedData.employeeId
      employee_id: 1,
    },
    include: [
      {
        model: Customer,
        attributes: ['name', 'phone', 'image'],
      },
    ],
  });
  res.json(conversations);
});

const getChatMessages = catchAsync(async (req, res) => {
  const messages = await ChatMessage.findAll({
    where: { conversation_id: req.params.id },
  });
  res.json(messages);
});

const sendChatMessage = catchAsync(async (req, res) => {
  const { conversationId, messageText } = req.body;
  const message = await ChatMessage.create({
    conversation_id: conversationId,
    sender: 'employee',
    message_text: messageText,
  });
  // send pusher notification to customer
  await pusher.trigger(`chat-${conversationId}`, 'message_to_customer', {
    message: message.message_text,
  });
  res.json(message);
});

export { getChatConversations, getChatMessages, sendChatMessage };
