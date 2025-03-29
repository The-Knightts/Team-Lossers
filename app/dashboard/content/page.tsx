"use client";

import { useState } from "react";
import OutputSection from "./_components/OutputSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ContentPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState("");

  const handleGenerate = async (prompt: string) => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt
        }),
      });

      const data = await response.json();
      setAiOutput(data.content);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Content Generator</h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto h-full flex flex-col gap-6">


          <div className="flex-1 bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30">
            <OutputSection
              aiOutput={aiOutput}
              loading={loading}
              onSubmit={handleGenerate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;