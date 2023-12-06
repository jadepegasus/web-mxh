import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import { MessageService } from './MessageService';

const ChatBox = ({ friendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await MessageService.getMessages(friendId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();

    const unsubscribeFromRealTimeUpdates = subscribeToRealTimeUpdates(); 
    return () => {
      unsubscribeFromRealTimeUpdates(); 
    };

  }, [friendId]);

  const fetchMessages = async () => {
    try {
      const response = await MessageService.getMessages(friendId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await MessageService.sendMessage({ receiver: friendId, content: newMessage });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const subscribeToRealTimeUpdates = () => {
    const Socket = new WebSocket(socket);

    Socket.addEventListener('message', (event) => {
      const updatedMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, updatedMessage]);
    });

    return () => {
      Socket.close();
    };
  };

  return (
    <div>
      <div style={{ height: '200px', overflowY: 'auto' }}>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.sender.username}:</strong> {message.content}
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Nhập tin nhắn của bạn..."
        style={{ width: '100%', marginTop: '10px' }}
      />
      <button onClick={sendMessage} style={{ marginTop: '10px' }}>
        Gửi
      </button>
    </div>
  );
};

export default ChatBox;
