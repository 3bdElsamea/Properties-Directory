import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { AxiosWeb } from "../../../Axios";
const ChatComponent = ({ propertyId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    // Example initial messages
    { text: "Hello", sender: "customer", receiver: "bot" },
    { text: "Hi there!", sender: "bot", receiver: "customer" },
  ]);
  const [isChatHistoryLoaded, setIsChatHistoryLoaded] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const messagesEndRef = useRef(null);


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };


  const fetchChatHistory = async () => {
    try {
      const response = await AxiosWeb.post(
        `/chat/conversations/${propertyId}/start`
      );
      console.log(response.data);
      setMessages(response.data.messages);
      setConversationId(response.data.chat_id);
      setIsChatHistoryLoaded(true);
      scrollToBottom();

    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }
    try {
      console.log("hiii", conversationId);
      const response = await AxiosWeb.post(`/chat/messages`, {
        messageText: newMessage,
        conversationId: conversationId,
      });
      console.log(response);
      console.log(response.data);
      setMessages([...messages, response.data]);
      setNewMessage("");
      scrollToBottom();

    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    fetchChatHistory();
  }, [propertyId]);

  return (
    <div className="chat-component">
      {/* Chat icon */}
      <button className="chat-icon" onClick={toggleChat}>
        <i className="fas fa-comment fa-xl "></i>
      </button>

      {/* Chat dialog */}
      {isChatOpen && (
        <div className="chat-dialog">
          <div className="chat-header">
            <h4>Chat</h4>
            <button
              className="close-btn"
              onClick={() => toggleChat(false)}
            >
              <i className="fas fa-times fa-sm"></i>
            </button>
          </div>
          {isChatHistoryLoaded && (
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "customer" ? "sender" : "bot"
                  }`}
                >
                  {msg.sender === "customer" && (
                    <span>
                      {" "}
                      {msg.message_text}
                      <br />
                      <span>{new Date(msg.sent_at).toLocaleTimeString()}</span>
                    </span>
                  )}

                  {msg.sender === "employee" && (
                    <span>
                      {" "}
                      {msg.message_text}
                      <br />
                      <span>{new Date(msg.sent_at).toLocaleTimeString()}</span>
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleMessageChange}
            />
            <button className="send-btn" onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
