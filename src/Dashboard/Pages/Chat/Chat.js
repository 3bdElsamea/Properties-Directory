import React, { useEffect, useState } from "react";
import { AxiosDashboard } from "../../../Axios";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";
import Pusher from "pusher-js";

const Chat = () => {
  const [customerList, setCustomerList] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        conversationId: currentConversationId,
        messageText: message,
      };
      try {
        await AxiosDashboard.post("/chat/messages", newMessage);
        setChat([...chat, { message_text: message, sender: "employee" }]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await AxiosDashboard.get("/chat/conversations");
        const customers = response.data;
        setCustomerList(customers);
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }
    };

    fetchCustomerList();
  }, []);

  //useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosDashboard.get(
          `/chat/conversations/${currentConversationId}/messages`
        );
        const messages = response.data.messages;
        setChat(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentConversationId) {
      fetchMessages();
    }
  //}, [currentConversationId]);

  useEffect(() => {
    const pusher = new Pusher("fb1c526a7f07ebcc0179", {
      cluster: "eu",
    });

    const channel = pusher.subscribe(`chat-${currentConversationId}`);
    console.log(`chat-${currentConversationId}`);

    fetchMessages();
    channel.bind("message_to_employee", function (data) {
      console.log("data", data);
      //setMessage( data.message);
    });
    return () => {
      pusher.unsubscribe(`chat-${currentConversationId}`);
      pusher.disconnect();
    };
  }, [currentConversationId]);

  return (
    <>
      <Container className="chat-page">
        <Row>
          <Col md="4">
            <div className="user-list shadow">
              <ListGroup>
                {customerList.map((customer, index) => {
                  const conversationMessages = chat?.filter(
                    (message) => message.conversationId === customer.id
                  );

                  const lastMessage = conversationMessages.reduce(
                    (prev, current) =>
                      prev.message_id > current.message_id ? prev : current,
                    {}
                  );
                  return (
                    <ListGroupItem
                      className="messageItem pt-4"
                      key={index}
                      onClick={() => setCurrentConversationId(customer.id)}
                    >
                      <img
                        className="rounded-circle mb-4 mr-3"
                        src={
                          customer.image ||
                          "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
                        }
                        alt="User Avatar"
                      />
                      <div className="user-info">
                        <h5>{customer.Customer.name}</h5>
                        <p
                          style={{
                            maxWidth: "80%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lastMessage
                            ? lastMessage?.message_text?.length > 40
                              ? `${lastMessage.message_text.slice(0, 40)}...`
                              : lastMessage.message_text
                            : "Loading..."}
                        </p>{" "}
                      </div>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </div>
          </Col>
          <Col md="8" className="chatCol shadow">
            {!currentConversationId && (
              <p style={{ margin: "2%" }}>
                Choose a conversation to show its messages...
              </p>
            )}{" "}
            <div className="chat-screen">
              {chat?.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "customer"
                      ? "customerSender"
                      : "empSender"
                  }`}
                >
                  {message.message_text}
                </div>
              ))}
              {currentConversationId && (
                <div className="message-input">
                  <InputGroup>
                    <Input
                      type="text"
                      value={message}
                      onChange={handleMessageChange}
                      placeholder="Type your message..."
                      onKeyDown={handleKeyDown}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={handleSendMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              )}{" "}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
