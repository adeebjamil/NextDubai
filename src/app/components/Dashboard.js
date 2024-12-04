// src/app/components/Dashboard.js
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import UserInsights from './UserInsights';
import MessageList from './MessageList';
import { FiMessageSquare } from 'react-icons/fi';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInsights, setUserInsights] = useState({
    frequentUsers: [],
    topLocations: [],
    repeatUsers: 0,
    newUsers: 0
  });
  const [resolvedMessages, setResolvedMessages] = useState(new Set());

  useEffect(() => {
    // Fetch messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
    setIsLoading(false);

    // Calculate user insights
    const userMessageCount = {};
    const locationCount = {};
    const userEmails = new Set();
    let repeatUsers = 0;
    let newUsers = 0;

    storedMessages.forEach(message => {
      // Track frequent users
      if (userMessageCount[message.email]) {
        userMessageCount[message.email].count += 1;
      } else {
        userMessageCount[message.email] = { name: message.name, count: 1 };
      }

      // Track locations (assuming message.location exists)
      if (message.location) {
        if (locationCount[message.location]) {
          locationCount[message.location] += 1;
        } else {
          locationCount[message.location] = 1;
        }
      }

      // Track repeat vs. new users
      if (userEmails.has(message.email)) {
        repeatUsers += 1;
      } else {
        userEmails.add(message.email);
        newUsers += 1;
      }
    });

    const frequentUsers = Object.values(userMessageCount).sort((a, b) => b.count - a.count);
    const topLocations = Object.entries(locationCount).sort((a, b) => b[1] - a[1]);

    setUserInsights({
      frequentUsers,
      topLocations,
      repeatUsers,
      newUsers
    });
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
          <DashboardHeader />
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
            <>
              <UserInsights userInsights={userInsights} />
              <MessageList 
                messages={messages} 
                resolvedMessages={resolvedMessages} 
                handleDeleteMessage={handleDeleteMessage} 
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
