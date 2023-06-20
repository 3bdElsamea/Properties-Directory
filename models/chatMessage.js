import { DataTypes } from 'sequelize';
import sequelize from '../config/DBConnection.js';
import ChatConversation from './chatConversation.js';

const ChatMessage = sequelize.define(
  'chat_message',
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chat_conversations',
        key: 'id',
      },
    },
    sender: {
      type: DataTypes.ENUM('customer', 'employee'),
      allowNull: false,
    },
    message_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

ChatMessage.belongsTo(ChatConversation, { foreignKey: 'conversation_id' });

export default ChatMessage;
