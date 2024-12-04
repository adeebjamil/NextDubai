// src/app/components/DashboardHeader.js
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const DashboardHeader = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between mb-12"
    >
      <h1 className="text-4xl font-bold text-gray-800">
        Message Dashboard
      </h1>
      <div className="flex items-center space-x-2 text-gray-600">
        <FiClock className="w-5 h-5" />
        <span>Last updated: {new Date().toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;