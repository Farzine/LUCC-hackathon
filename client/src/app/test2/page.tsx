'use client'
import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add the user message to the state before making the API call
      const userMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        // Send the user's message to the backend API and get the chatbot's response
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chatbot response');
        }

        const data = await response.json();
        console.log(data);

        // Simulate a delay for the bot's response
        setTimeout(() => {
          const botMessage = { text: data.text, sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botMessage]);
          setIsTyping(false);
        }, 1500);

      } catch (error) {
        console.error('Error fetching chatbot response:', error);

        // Handle error with a fallback message
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Oops! Something went wrong. Please try again later.', sender: 'bot' },
        ]);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg h-full ml-96 bg-white shadow-2xl rounded-3xl overflow-hidden">
      {/* Header with Close Button */}
      <div className="flex justify-between items-center bg-indigo-700 p-4 text-white rounded-t-3xl shadow-md">
        <h1 className="text-2xl font-semibold">Chat with Assistant</h1>
        <button className="text-white hover:text-gray-600 focus:outline-none">
          <AiOutlineCloseCircle size={28} />
        </button>
      </div>

      {/* Chatbox - Message Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm text-white break-words ${msg.sender === 'user' ? 'bg-indigo-600' : 'bg-gray-800 text-gray-800'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-pulse space-x-2">
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Message Input Area */}
      <div className="flex items-center p-4 bg-white border-t border-gray-200 rounded-b-3xl">
        <input
          type="text"
          className="flex-1 p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="ml-4 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none"
          onClick={handleSendMessage}
        >
          <MdSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
