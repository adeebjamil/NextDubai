// src/app/components/MessageList.js
import React from 'react';

const MessageList = ({ messages, resolvedMessages, handleDeleteMessage }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={message._id} className="message-item">
          <h2>{message.name}</h2>
          <p>{message.email}</p>
          <p>{message.phone}</p>
          <p>{message.location}</p>
          <p>{message.message}</p>
          <button onClick={() => handleDeleteMessage(index, message._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MessageList;