"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import MessageList from './MessageList';
import { FiMessageSquare } from 'react-icons/fi';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedMessages, setResolvedMessages] = useState(new Set());

  useEffect(() => {
    // Fetch messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
    setIsLoading(false);
  }, []);

  const handleDeleteMessage = (messageIndex, email) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const newMessages = messages.filter((_, index) => index !== messageIndex);
      setMessages(newMessages);
      localStorage.setItem('messages', JSON.stringify(newMessages));
      
      // Update resolved messages
      const newResolved = new Set(resolvedMessages);
      newResolved.delete(email);
      setResolvedMessages(newResolved);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                  <FiMessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>
          ) : (
            <MessageList 
              messages={messages} 
              resolvedMessages={resolvedMessages} 
              handleDeleteMessage={handleDeleteMessage} 
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;