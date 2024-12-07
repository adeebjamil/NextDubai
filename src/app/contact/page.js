"use client";

import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const contactInfo = [
    { icon: <FiPhone />, text: "+1 234 567 890", label: "Call us" },
    { icon: <FiMail />, text: "contact@nextdubai.com", label: "Email us" },
    { icon: <FiMapPin />, text: "Dubai, UAE", label: "Visit us" },
    { icon: <FiClock />, text: "24/7 Available", label: "Working hours" },
  ];

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FiInstagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FiLinkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Please fill out the form below or reach out using our contact information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-blue-50"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{info.label}</p>
                    <p className="text-base font-semibold text-gray-800">{info.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-700 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;