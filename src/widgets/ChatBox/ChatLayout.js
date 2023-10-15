import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import BotIco from "../../assets/bot.ico";
import PersonIco from "../../assets/person.ico"


export default function ChatLayout() {
  const [messages, setMessages] = useState([
    {
        message: "Hello, I can answer any queries you may have!",
        sentTime: "just now",
        sender: "Bot",
    }
  ]);

  const handleSend = (newMessage) => {
    setMessages(prevMessages => {
      return [...prevMessages, {
        message: newMessage,
        sentTime: "just now",
        sender: "User",
        direction: "outgoing",
      }]
    })
  }

  return (
    <div style={{ position: "relative", height: "60vh", width: "40vw" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map(msg => { 
              return <Message model={msg}>
                {msg.sender === "Bot" ? <Avatar src={BotIco} name="Bot" /> : <Avatar src={PersonIco} name="User" />}
              </Message> 
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
