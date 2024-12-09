'use client';

import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsTyping(true);

      const userId = localStorage.getItem('user_id');

      try {
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, user_id: userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chatbot response');
        }

        const data = await response.json();
        console.log(data);

        // Simulate a delay for the bot's response
        setTimeout(() => {
          const botMessage = { text: data.text, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setIsTyping(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Oops! Something went wrong. Please try again later.', sender: 'bot' },
        ]);
        setIsTyping(false);
      }
    }
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <div
        className=" bg-customRed flex my-2  font-semibold text-white gap-2 p-2 rounded-full shadow-lg cursor-pointer hover:bg-red-700"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <BsChatDots size={28} />
        Ask AI to Manage Meeting
      </div>

      {/* Chat Container */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-6 w-80 max-w-lg h-[600px] bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-red-600 p-4 text-white rounded-t-3xl shadow-md">
            <h1 className="text-xl font-semibold">AI Assistant</h1>
            <button
              className="text-white hover:text-gray-600 focus:outline-none"
              onClick={() => setIsChatOpen(false)}
            >
              <AiOutlineCloseCircle size={28} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 rounded-lg shadow-inner">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm break-words ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-pulse space-x-2 mt-2">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center p-4 bg-white border-t border-gray-200">
            <input
              type="text"
              className="flex-1 p-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:bg-customRed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button
              className="ml-2 p-3 bg-customRed text-white rounded-full hover:bg-red-600 focus:outline-none"
              onClick={handleSendMessage}
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
