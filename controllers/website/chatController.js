import ChatConversation from '../../models/chatConversation.js';
import ChatMessage from '../../models/chatMessage.js';
import catchAsync from '../../utils/catchAsync.js';
import Employee from '../../models/Employee.js';
import Property from '../../models/Property.js';
import AppError from '../../utils/appError.js';
import pusher from '../../config/pusher.js';
import createNotification from '../../utils/createNotification.js';
import customer from '../../models/Customer.js';
import Customer from '../../models/Customer.js';

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
    req.params.id = conversationExists.id;
    console.log(
      'conversation exists....',
      req.params.id,
      conversationExists.id,
    );
    //   save the id and the chat messages in a object
    const obj = {
      chat_id: conversationExists.id,
      messages: await ChatMessage.findAll({
        where: { conversation_id: conversationExists.id },
      }),
    };
    return res.json(obj);
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
  // find conversation name\
  const conversation = await ChatConversation.findByPk(conversationId, {
    include: [
      {
        model: Employee,
        attributes: ['name'],
      },
      {
        model: Customer,
        attributes: ['name'],
      },
    ],
  });
  console.log(conversation);

  await createNotification(
    req.decodedData.customerId,
    'New message',
    `Message for ${conversation.Employee.name} from ${conversation.Customer.name}`,
  );
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
