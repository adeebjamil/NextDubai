// src/app/components/UserInsights.js
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiMapPin, FiMail, FiTrendingUp, FiUserPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const StatCard = ({ icon: Icon, title, value, gradient }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
    className={`rounded-xl p-6 ${gradient} text-white`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div className="p-3 bg-white/20 rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-xs px-2 py-1 bg-white/20 rounded-full"
      >
        Live
      </motion.span>
    </div>
    <h3 className="mt-4 text-lg font-medium opacity-90">{title}</h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-3xl font-bold mt-2"
    >
      {value}
    </motion.p>
  </motion.div>
);

const UserInsights = ({ userInsights }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={FiUsers}
              title="Total Users"
              value={userInsights.frequentUsers.length}
              gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              icon={FiUserPlus}
              title="New Users"
              value={userInsights.newUsers}
              gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
            />
            <StatCard
              icon={FiTrendingUp}
              title="Repeat Users"
              value={userInsights.repeatUsers}
              gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <StatCard
              icon={FiMapPin}
              title="Locations"
              value={userInsights.topLocations.length}
              gradient="bg-gradient-to-br from-pink-500 to-pink-600"
            />
          </div>

          {/* Detailed Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Frequent Users */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiUsers className="mr-2" /> Frequent Users
              </h3>
              <div className="space-y-3">
                {userInsights.frequentUsers.slice(0, 5).map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-700">{user.name}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                      {user.count} messages
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Locations */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiMapPin className="mr-2" /> Top Locations
              </h3>
              <div className="space-y-4">
                {userInsights.topLocations.slice(0, 5).map(([location, count], index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">{location}</span>
                      <span className="text-gray-500">{count} messages</span>
                    </div>
                    <motion.div
                      className="h-2 bg-gray-100 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / Math.max(...userInsights.topLocations.map(([_, c]) => c))) * 100}%` }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserInsights;