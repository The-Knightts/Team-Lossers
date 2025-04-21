"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { Send, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatSession, processGeminiResponse } from "@/utils/AIModel";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// Type guard to check if something is an Error
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

interface Message {
  uniqueId: string;
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAITalkingEnabled, setIsAITalkingEnabled] = useState(false);
  const [siriVoice, setSiriVoice] = useState<SpeechSynthesisVoice | null>(null); // Store Siri-like voice
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const router = useRouter();

  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const updateCreditUsage = useContext(UpdateCreditUsageContext);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load available voices and select a female Siri-like voice
  useEffect(() => {
    if (!isMounted || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Look for a female US English voice resembling Siri
      const femaleSiriVoice = voices.find(
        (voice) =>
          voice.lang === "en-US" && // US English
          (voice.name === "Samantha" || // macOS Siri voice
          voice.name.toLowerCase().includes("female") || // Look for "female" in name
          voice.name === "Google US English" || // Google’s female US voice
          voice.name === "Microsoft Zira Desktop") // Windows female voice
      ) || voices.find((voice) => voice.lang === "en-US"); // Fallback to any US English voice

      setSiriVoice(femaleSiriVoice || null);
      console.log("Available voices:", voices); // Debug available voices
    };

    // Voices may not load immediately, so listen for changes
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Call immediately in case voices are already loaded

    return () => {
      window.speechSynthesis.onvoiceschanged = null; // Cleanup
    };
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && browserSupportsSpeechRecognition && transcript !== "") {
      setInputValue(transcript);
    }
  }, [transcript, isMounted, browserSupportsSpeechRecognition]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
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

  const handleStartListening = () => {
    if (isMounted && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleStopListening = () => {
    if (isMounted && browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
  };

  const speakText = (text: string) => {
    if (isAITalkingEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.volume = 1.0;
      utterance.rate = 1.1; // Slightly faster, Siri-like cadence
      utterance.pitch = 1.2; // Slightly higher pitch for a brighter tone

      // Use the selected Siri-like voice if available
      if (siriVoice) {
        utterance.voice = siriVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    if (totalUsage >= 10000 && !userSubscription) {
      router.push("/dashboard/billing");
      return;
    }

    const timestamp = new Date().toISOString();
    const userMessage: Message = {
      uniqueId: generateUniqueId(),
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(timestamp),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (isMounted && browserSupportsSpeechRecognition) resetTranscript();
    setIsLoading(true);

    try {
      try {
        const result = await chatSession.sendMessage(inputValue);
        console.log("Gemini API Result:", result);

        // Directly use the text response if processGeminiResponse isn't working
        const responseText = await result?.response.text();
        if (!responseText) {
          throw new Error("Empty response from Gemini API");
        }

        const aiMessageId = generateUniqueId();
        const aiMessage: Message = {
          uniqueId: aiMessageId,
          id: Date.now().toString(),
          content: "",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        let displayBuffer = "";
        for (const char of responseText) {
          displayBuffer += char;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.uniqueId === aiMessageId
                ? { ...msg, content: displayBuffer }
                : msg
            )
          );
          await new Promise((resolve) => setTimeout(resolve, 20));
        }

        speakText(displayBuffer);

        if (typeof updateCreditUsage === "function") {
          updateCreditUsage();
        } else {
          console.warn("updateCreditUsage is not a function");
        }
      } catch (apiError: unknown) {
        handleAPIError(apiError);
      }
    } catch (error: unknown) {
      handleGeneralError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAPIError = (apiError: unknown) => {
    console.error("Gemini API Error:", apiError);
    const errorMessage = isError(apiError)
      ? `⚠️ Error: ${apiError.message}`
      : "⚠️ An unknown error occurred with the AI service.";
    setMessages((prev) => [
      ...prev,
      {
        uniqueId: generateUniqueId(),
        id: Date.now().toString(),
        content: errorMessage,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    speakText(errorMessage);
  };

  const handleGeneralError = (error: unknown) => {
    console.error("Unexpected Error:", error);
    const errorMessage = isError(error)
      ? `⚠️ Error: ${error.message}`
      : "⚠️ An unexpected error occurred. Please try again later.";
    setMessages((prev) => [
      ...prev,
      {
        uniqueId: generateUniqueId(),
        id: Date.now().toString(),
        content: errorMessage,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    speakText(errorMessage);
  };

  const toggleAITalking = () => {
    setIsAITalkingEnabled((prev) => !prev);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] p-4 bg-[#121212] rounded-lg m-3">
      <div className="flex-1 overflow-y-auto mb-4 p-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-2xl font-bold mb-2">Welcome to VedaAI Chat</div>
            <p className="text-center mb-4">Start a conversation by typing a message below.</p>
            <p className="text-center">Mention @VedaAI for AI assistance.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.uniqueId}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="flex-shrink-0 mr-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        message.sender === "ai"
                          ? "/logo.png"
                          : isMounted && user?.imageUrl
                          ? user.imageUrl
                          : "https://github.com/shadcn.png"
                      }
                      alt={message.sender}
                    />
                    <AvatarFallback>
                      {message.sender === "ai"
                        ? "VA"
                        : isMounted && user?.firstName
                        ? user.firstName[0]
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-600 text-white mr-2"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs text-gray-300 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="relative">
          <textarea
            className="w-full p-3 pr-32 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Type a message..."
            rows={3}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            onClick={toggleAITalking}
            className="absolute bottom-3 right-24 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
            title={isAITalkingEnabled ? "Disable AI Voice" : "Enable AI Voice"}
          >
            {isAITalkingEnabled ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={listening ? handleStopListening : handleStartListening}
            className="absolute bottom-3 right-14 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
            disabled={!isMounted || !browserSupportsSpeechRecognition}
          >
            {listening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || inputValue.trim() === ""}
            className="absolute bottom-3 right-3 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;