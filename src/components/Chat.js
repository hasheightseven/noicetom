// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
`;

const MessageList = styled.div`
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  padding: 10px;
  background: #f4f4f4;
  margin-bottom: 5px;
  border-radius: 4px;
`;

const MessageInput = styled.input`
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [username, setUsername] = useState('User1');

  const handleMessageSend = async () => {
    if (messageText.trim()) {
      const messageData = {
        sender: username,
        text: messageText,
      };

      // Send message to serverless function (API route)
      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (response.ok) {
          console.log('Message sent');
        } else {
          console.error('Error sending message');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessageText('');
    }
  };

  return (
    <ChatWrapper>
      <h2>Chat Room</h2>
      <MessageList>
        {messages.map((msg, index) => (
          <MessageItem key={index}>
            <strong>{msg.sender}: </strong>{msg.text}
          </MessageItem>
        ))}
      </MessageList>
      <MessageInput
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
      />
      <button onClick={handleMessageSend}>Send</button>
    </ChatWrapper>
  );
}

export default Chat;
