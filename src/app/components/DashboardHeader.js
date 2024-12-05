"use client";

import { motion } from 'framer-motion';
import { FiClock, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const DashboardHeader = ({ stats }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/auth/signin');
    } else {
      alert('Failed to log out');
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative rounded-2xl p-8 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold text-white"
          >
            Dashboard Overview
          </motion.h1>
          <motion.div 
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex items-center space-x-2 text-white/80"
          >
            <FiClock className="w-5 h-5" />
            <span>Last updated: {new Date().toLocaleString()}</span>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
        {/* Rest of your component */}
      </div>
    </motion.div>
  );
};

export default DashboardHeader;