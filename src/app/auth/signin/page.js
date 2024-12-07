"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiLogIn, FiCode, FiServer } from 'react-icons/fi';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    signIn('credentials', {
      redirect: false,
      username,
      password
    }).then((result) => {
      if (result.ok) {
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      {/* Tech background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl"
        />
      </div>

      {/* Tech decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="grid grid-cols-8 grid-rows-8 gap-4 w-full h-full opacity-10">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="w-full h-full border border-cyan-500/20"
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4 relative z-10"
      >
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
          whileHover={{ boxShadow: "0 0 50px rgba(56, 189, 248, 0.1)" }}
        >
          <motion.div className="mb-8 text-center space-y-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 text-cyan-500"
            >
              <FiServer className="w-full h-full" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              System Access
            </h1>
            <p className="text-gray-400">Enter credentials to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-500">
                  <FiUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-100"
                  required
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-500">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-100"
                  required
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-medium shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Initialize</span>
                    <FiLogIn className="w-5 h-5" />
                  </>
                )}
              </div>
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;