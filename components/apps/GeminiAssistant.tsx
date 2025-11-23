import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { streamGeminiResponse } from '../../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '你好！我是 HyperAI。有什么可以帮你的吗？' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    let currentResponse = '';
    
    // Prepare history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    await streamGeminiResponse(userMsg, history, (chunk) => {
        currentResponse += chunk;
        setMessages(prev => {
            const newHistory = [...prev];
            if (newHistory[newHistory.length - 1].role === 'model' && newHistory.length > messages.length + 1) {
                // Update existing model message
                newHistory[newHistory.length - 1].text = currentResponse;
                return newHistory;
            } else {
                // Add new model message
                return [...prev, { role: 'model', text: currentResponse }];
            }
        });
    });
    
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#111] text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3 backdrop-blur-xl bg-white/5 sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
        </div>
        <div>
            <h2 className="font-semibold">HyperAI</h2>
            <p className="text-xs text-blue-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                在线
            </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-[#2c2c2e] text-gray-100 rounded-bl-none border border-white/5'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-[#2c2c2e] rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#1c1c1e] border-t border-white/10">
        <div className="flex items-center gap-2 bg-[#2c2c2e] rounded-full px-4 py-2 border border-white/10 focus-within:border-blue-500/50 transition-colors">
          <input 
            type="text" 
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 py-2"
            placeholder="随便问点什么..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;