"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { FiMessageSquare, FiMail, FiPhone, FiMapPin, FiTrash2, FiLogOut, FiClock, FiCalendar, FiHexagon, FiEye, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvedMessages, setResolvedMessages] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Add time update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-30"/>
      <div className="absolute inset-0 cyber-grid"/>
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50">
          {/* Add Clock and Calendar Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-6 bg-gray-900/50 p-4 rounded-2xl border border-cyan-500/20 glow"
            >
              <div className="flex items-center space-x-2">
                <FiClock className="w-5 h-5 text-cyan-400" />
                <span className="text-2xl font-mono text-cyan-400">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-medium text-purple-400">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-500 p-3 rounded-2xl"
              >
                <FiMessageSquare className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Message Dashboard
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg._id}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/20 hover:glow transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-cyan-400">{msg.name}</h3>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedMessage(msg)}
                          className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-full"
                        >
                          <FiEye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-full"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <FiMail className="w-4 h-4 text-cyan-400" />
                        <p className="text-sm">{msg.email}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <FiPhone className="w-4 h-4 text-cyan-400" />
                        <p className="text-sm">{msg.mobile}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <FiMapPin className="w-4 h-4 text-cyan-400" />
                        <p className="text-sm">{msg.location}</p>
                      </div>
                      <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                        <p className="text-sm text-gray-300">{msg.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-800/90 rounded-3xl p-8 border border-cyan-500/20 max-w-2xl w-full mx-4 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Message Details</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-gray-400 hover:text-gray-300"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <FiMessageSquare className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">From</p>
                    <p className="font-semibold">{selectedMessage.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiMail className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p>{selectedMessage.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiPhone className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Mobile</p>
                      <p>{selectedMessage.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-300">
                    <FiMapPin className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p>{selectedMessage.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <p className="text-gray-300">{selectedMessage.message}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;