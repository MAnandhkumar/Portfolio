// src/components/Chatbox/Chatbox.tsx
import { useState, useRef, useEffect } from "react";
import { User, Bot, MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  sender: "user" | "ai";
  message: string;
}

const FAQ_OPTIONS = [
  {
    id: "summary",
    question: "What is your professional summary?",
    answer:
      "I am a results-driven Software Engineer with 3.5+ years of experience in building scalable, high-performance web applications using React.js, Next.js, TypeScript, and Node.js. I have expertise in NestJS, PostgreSQL, Redis, and integrating AI services.",
  },
  {
    id: "skills",
    question: "What are your core skills?",
    answer:
      "My core stack includes:\n- **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, Redux\n- **Backend:** Node.js, NestJS, REST APIs, Redis\n- **Database:** PostgreSQL, MySQL\n- **Other:** OpenAI integrations, Git, Agile methodologies",
  },
  {
    id: "contact",
    question: "How can I contact you?",
    answer:
      "You can reach me via email at infinitianandh@gmail.com, or call me at +91-944433145. I am currently based in Chennai, India.",
  },
  {
    id: "other",
    question: "I have another question (Email me)",
    answer: "Redirecting you to email...",
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      message: "Hello! I am Anandhkumar's virtual assistant. How can I help you today?",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option: (typeof FAQ_OPTIONS)[0]) => {
    setMessages((prev) => [...prev, { sender: "user", message: option.question }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", message: option.answer }]);

      if (option.id === "other") {
        setTimeout(() => {
          window.location.href = "mailto:infinitianandh@gmail.com";
        }, 1000);
      }
    }, 600);
  };

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-gradient-to-tr from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,59,124,0.5)] z-[60] focus:outline-none border-2 border-white/20 dark:border-gray-800 backdrop-blur-md"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 250, damping: 20 }}
            className="fixed bottom-28 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[400px] shadow-2xl"
          >
            <div className="relative h-[600px] max-h-[75vh] bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl flex flex-col overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              {/* Premium Header */}
              <div className="bg-gradient-to-r from-[#a200ff]/10 via-[#ff3b7c]/10 to-[#ff9a44]/10 dark:from-[#a200ff]/20 dark:via-[#ff3b7c]/20 dark:to-[#ff9a44]/20 border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a200ff] to-[#ff3b7c] flex items-center justify-center text-white shadow-lg">
                      <Sparkles size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      Virtual Assistant
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Online • Ask me anything
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleDrawer}
                  className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all shadow-sm"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      key={index}
                      className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-2 max-w-[90%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                            msg.sender === "user"
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                              : "bg-gradient-to-br from-[#a200ff] to-[#ff3b7c] text-white"
                          }`}
                        >
                          {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                        </div>
                        <div
                          className={`px-4 py-2.5 rounded-2xl whitespace-pre-wrap text-[13px] leading-relaxed shadow-sm backdrop-blur-sm ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-[#a200ff]/10 to-[#ff3b7c]/10 dark:from-[#a200ff]/20 dark:to-[#ff3b7c]/20 text-gray-900 dark:text-white rounded-tr-none border border-[#ff3b7c]/20"
                              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-2 max-w-[90%] flex-row items-end">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#a200ff] to-[#ff3b7c] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Bot size={12} />
                        </div>
                        <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center gap-1 shadow-sm">
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-1" />
              </div>

              {/* Options Area */}
              <div className="p-3 md:p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest pl-1">
                  Suggested Questions
                </p>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 pl-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {FAQ_OPTIONS.map((option) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="group flex-shrink-0 flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-gray-800 dark:hover:to-gray-700 border border-gray-200 dark:border-gray-700 hover:border-[#ff3b7c]/40 dark:hover:border-[#ff3b7c]/40 rounded-full transition-all shadow-sm hover:shadow-md"
                    >
                      <span className="text-[12px] whitespace-nowrap font-medium text-gray-700 dark:text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#a200ff] group-hover:to-[#ff3b7c] transition-colors">
                        {option.question}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
