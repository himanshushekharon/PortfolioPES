import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Terminal, User, Code, Briefcase, Mail, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi 👋, want to know about Himanshu Shekhar?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Optional: Auto-open after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutomaticallyOpened) {
        setIsOpen(true);
        setHasAutomaticallyOpened(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasAutomaticallyOpened]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    // 1. Add User's message
    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    
    // 2. Show "typing..." animation
    setIsTyping(true);
    
    // 3. Fetch Bot's response from API
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      
      const data = await response.json();
      
      const botMsg = { id: Date.now() + 1, text: data.reply || "I can help you with information about Himanshu Shekhar 😊", sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat API error:", error);
      // Fallback message if backend is unreachable
      const fallbackMsg = { id: Date.now() + 1, text: "I can help you with information about Himanshu Shekhar 😊 (Backend offline)", sender: "bot" };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option) => {
    sendMessage(option.label);
  };

  const quickOptions = [
    { id: 'about', label: 'About Me', icon: <User size={14} />, response: "I'm a B.Tech CSE student specializing in scalable web apps using the MERN stack. I have a strong foundation in Data Structures & Algorithms. 🚀" },
    { id: 'skills', label: 'Skills', icon: <Code size={14} />, response: "My technical arsenal includes React, Node.js, Express, MongoDB, Tailwind CSS, and C++/Java for DSA! 💻" },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={14} />, response: "I've built a modern Language Translator, an interactive Dashboard, and this SaaS-style Portfolio! See the Projects section for more. 🔥" },
    { id: 'contact', label: 'Contact', icon: <Mail size={14} />, response: "You can reach me via the Contact form above or connect with me on LinkedIn and GitHub! 📧" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 w-[320px] sm:w-[350px] bg-white/80 dark:bg-[#0a111a]/85 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1C8F65] to-[#20A274] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                  <Terminal size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-[800] text-[15px] leading-tight">HS Assistant</h3>
                  <p className="text-white/70 text-[11px] font-bold tracking-wider uppercase">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-[300px] overflow-y-auto flex flex-col gap-3 scrollbar-hide bg-gray-50/50 dark:bg-[#070e17]/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div 
                    className={`px-4 py-2.5 rounded-2xl text-[14px] font-medium leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#20A274] text-white rounded-br-sm' 
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#2A3B4C] dark:text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="self-start bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-[#20A274] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#20A274] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#20A274] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Wrapper */}
            <div className="flex flex-col border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a111a]">
              {/* Quick Replies */}
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-[#070e17]/30 border-b border-gray-100 dark:border-white/5">
                <p className="text-[10px] font-[800] text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest pl-1">Suggested</p>
                <div className="flex flex-wrap gap-2">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt)}
                      disabled={isTyping}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800/80 hover:bg-[#E9F7F2] dark:hover:bg-[#20A274]/20 border border-gray-200 dark:border-gray-700 hover:border-[#20A274]/30 rounded-full text-[12px] font-bold text-[#556987] dark:text-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <span className="text-[#20A274]">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 flex items-center gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  placeholder="Ask me about Himanshu..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800/80 text-[#2A3B4C] dark:text-gray-200 text-[13.5px] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#20A274]/50 transition-all font-medium placeholder-gray-400 dark:placeholder-gray-500"
                  disabled={isTyping}
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-[#1C8F65] to-[#20A274] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasAutomaticallyOpened(true); // Don't auto-open if user already interacted
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#1C8F65] to-[#3BAFDA] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(32,162,116,0.4)] hover:shadow-[0_15px_35px_rgba(32,162,116,0.6)] transition-shadow relative group z-50"
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1C8F65] to-[#3BAFDA] blur-md opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
      </motion.button>
    </div>
  );
};

export default Chatbot;
