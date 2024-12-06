"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import MessageList from './MessageList';
import { FiMessageSquare } from 'react-icons/fi';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvedMessages, setResolvedMessages] = useState(new Set());

  useEffect(() => {
    // Fetch messages from the database
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched messages:', data); // Log the fetched data
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch('/api/messages', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setMessages(messages.filter((msg) => msg._id !== id));
        } else {
          console.error('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                  <FiMessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto p-4">
              {messages.map((msg) => (
                <div key={msg._id} className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold">{msg.name}</h3>
                  <p className="text-sm text-gray-600">{msg.email}</p>
                  <p className="text-sm text-gray-600">{msg.mobile}</p>
                  <p className="text-sm text-gray-600">{msg.location}</p>
                  <p className="text-sm">{msg.message}</p>
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;