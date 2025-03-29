"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

interface Message {
  uniqueId: string;
  id: string;
  content: string;
  sender: "user" | "team";
  timestamp: Date;
  isRead: boolean;
  senderName: string;
  senderAvatar?: string;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    // Debounce typing indicator
    const timer = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timer);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const generateUniqueId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessageId = generateUniqueId();
    const userMessage: Message = {
      uniqueId: userMessageId,
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      isRead: false,
      senderName: user?.fullName || "User",
      senderAvatar: user?.imageUrl,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate team member response
    setTimeout(() => {
      const teamMessage: Message = {
        uniqueId: generateUniqueId(),
        id: Date.now().toString(),
        content: "Thanks for your message! This is a demo response.",
        sender: "team",
        timestamp: new Date(),
        isRead: false,
        senderName: "Team Member",
        senderAvatar: "/team-avatar.png",
      };
      setMessages((prev) => [...prev, teamMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] p-4 bg-[#121212] rounded-lg m-3">
      <div className="flex-1 overflow-y-auto mb-4 p-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-2xl font-bold mb-2">Team Chat</div>
            <p className="text-center mb-4">Start a conversation with your team.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.uniqueId} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex-shrink-0 mr-2">
                  <Avatar>
                    <AvatarImage src={message.senderAvatar || "/team-avatar.png"} alt={message.senderName} />
                    <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div 
                  className={`p-3 rounded-lg ${message.sender === "user" ? "bg-green-600 text-white mr-2" : "bg-gray-800 text-white"}`}
                >
                  <div className="text-sm font-semibold mb-1">{message.senderName}</div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs text-gray-300">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.sender === "user" && (
                      <span className="text-xs text-gray-300">
                        {message.isRead ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex items-center text-gray-400 text-sm ml-4">
            <span className="animate-pulse">Someone is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="relative">
          <textarea
            className="w-full p-3 pr-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Type a message..."
            rows={3}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || inputValue.trim() === ""} 
            className="absolute bottom-3 right-3 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;