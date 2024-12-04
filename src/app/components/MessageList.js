// src/app/components/MessageList.js
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiUser, FiMessageSquare, FiClock, FiCheck, FiTrash2, FiX } from 'react-icons/fi';
import { useState } from 'react';

const MessageDetail = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {message.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{message.name}</h3>
                <div className="flex items-center text-white/80 text-sm mt-1">
                  <FiClock className="w-4 h-4 mr-1" />
                  <span>{new Date(message.date).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <FiMail className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{message.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FiPhone className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{message.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FiMapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{message.location || 'No location provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Message</h4>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {message.message}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MessageList = ({ messages, resolvedMessages, handleDeleteMessage }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Messages</h2>
        </div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {message.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{message.name}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <FiClock className="w-4 h-4 mr-1" />
                        <span>{new Date(message.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {resolvedMessages.has(message.email) && (
                    <span className="bg-green-500/20 text-white px-2 py-1 rounded-full text-sm flex items-center">
                      <FiCheck className="w-4 h-4 mr-1" /> Resolved
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{message.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{message.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{message.location || 'No location provided'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start space-x-2">
                    <FiMessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                    <p className="text-gray-700 text-sm line-clamp-3">{message.message}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMessage(message)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteMessage(index, message.email)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                  >
                    <FiTrash2 className="w-4 h-4 mr-1" /> Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <MessageDetail
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MessageList;