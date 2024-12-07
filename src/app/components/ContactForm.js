"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message, mobile, location };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
        setMobile('');
        setLocation('');

        // Send email using emailjs
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

        emailjs.send(serviceID, templateID, formData, userID)
          .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
          })
          .catch((error) => {
            console.error('Failed to send email:', error.text);
          });
      } else {
        console.error('Failed to submit message');
        setErrorMessage('Failed to submit message');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      setErrorMessage('Error submitting message');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-100"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-101 bg-white/80 backdrop-blur-sm"
            required
          />
        </div>
        <div className="group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-101 bg-white/80 backdrop-blur-sm"
            required
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-101 bg-white/80 backdrop-blur-sm"
            required
          />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-101 bg-white/80 backdrop-blur-sm"
            required
          />
        </div>
        <div className="group">
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out transform hover:scale-101 bg-white/80 backdrop-blur-sm min-h-[120px] resize-none"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold tracking-wide hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:translate-y-[-2px] shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm"
        >
          <p className="text-green-600 font-medium text-center">{successMessage}</p>
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm"
        >
          <p className="text-red-600 font-medium text-center">{errorMessage}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactForm;