import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import BotIco from "../../assets/bot.ico";
import PersonIco from "../../assets/person.ico";

export default function ChatLayout() {
  const [isQuerying, setIsQuerying] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I can answer any queries you may have!",
      sentTime: "just now",
      sender: "Bot",
    },
  ]);

  const handleSend = async (newMessage) => {
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          message: newMessage,
          sentTime: "just now",
          sender: "User",
          direction: "outgoing",
        },
      ];
    });

    setIsQuerying(true);

    const response = await fetch("http://127.0.0.1:5000/query_llm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: newMessage }),
    });

    const botReply = await response.text();

    setIsQuerying(false);

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          message: botReply,
          sentTime: "just now",
          sender: "Bot",
          direction: "incoming",
        },
      ];
    });
  };

  return (
    <div style={{ position: "relative", height: "60vh", width: "40vw" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={
              isQuerying && <TypingIndicator content="Querying" />
            }
          >
            {messages.map((msg) => {
              return (
                <Message model={msg}>
                  {msg.sender === "Bot" ? (
                    <Avatar src={BotIco} name="Bot" />
                  ) : (
                    <Avatar src={PersonIco} name="User" />
                  )}
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            attachButton={false}
            placeholder="Enter query here"
            onSend={(value) => handleSend(value)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
