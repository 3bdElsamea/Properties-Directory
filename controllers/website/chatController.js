import ChatConversation from '../../models/chatConversation.js';
import ChatMessage from '../../models/chatMessage.js';
import catchAsync from '../../utils/catchAsync.js';
import Employee from '../../models/Employee.js';
import Property from '../../models/Property.js';
import AppError from '../../utils/appError.js';
import pusher from '../../config/pusher.js';

const startChatConversations = catchAsync(async (req, res, next) => {
  const property = await Property.findByPk(req.params.id);
  if (!property) {
    return next(new AppError('Property not found', 404));
  }
  const conversationExists = await ChatConversation.findOne({
    where: {
      customer_id: req.decodedData.customerId,
      employee_id: property.employee_id,
    },
  });
  if (conversationExists) {
    return next(new AppError('Conversation already exists', 400));
  }
  const conversation = await ChatConversation.create({
    customer_id: req.decodedData.customerId,
    employee_id: property.employee_id,
  });
  res.json(conversation);
});

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
  });
  res.json(messages);
});

const sendChatMessage = catchAsync(async (req, res) => {
  const { conversationId, messageText } = req.body;
  const message = await ChatMessage.create({
    conversation_id: conversationId,
    sender: 'customer',
    message_text: messageText,
  });
  // send pusher notification to employee
  await pusher.trigger(`chat-${conversationId}`, 'message_to_employee', {
    message: message.message_text,
  });
  res.json(message);
});

export {
  startChatConversations,
  getChatConversations,
  getChatMessages,
  sendChatMessage,
};
