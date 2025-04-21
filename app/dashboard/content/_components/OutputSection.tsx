"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button } from "@/components/ui/button";
import { Copy, Loader2Icon, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

// Dynamically import Toast UI Editor to disable SSR
const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), {
  ssr: false,
});

interface OutputSectionProps {
  aiOutput: string;
  loading: boolean;
  prompt?: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ aiOutput, loading, prompt }) => {
  const editorRef = useRef<any>(null);
  const [streamedOutput, setStreamedOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAITalkingEnabled, setIsAITalkingEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [siriVoice, setSiriVoice] = useState<SpeechSynthesisVoice | null>(null); // Store Siri-like voice

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load available voices and select a Siri-like voice
  useEffect(() => {
    if (!isMounted || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Look for a voice resembling Siri (e.g., female, US English)
      const siriLikeVoice = voices.find(
        (voice) =>
          voice.lang === "en-US" && // US English
          voice.name.toLowerCase().includes("female") || // Look for "female" in name
          voice.name === "Samantha" || // macOS default Siri-like voice
          voice.name === "Alex" // Another natural US voice (male, but close in quality)
      ) || voices.find((voice) => voice.lang === "en-US"); // Fallback to any US English voice

      setSiriVoice(siriLikeVoice || null);
      console.log("Available voices:", voices); // Debug available voices
    };

    // Voices may not be loaded immediately, so listen for changes
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Call immediately in case voices are already loaded

    return () => {
      window.speechSynthesis.onvoiceschanged = null; // Cleanup
    };
  }, [isMounted]);

  // Function to parse and format AI response into Markdown
  const formatAIResponse = (response: string): string => {
    try {
      const parsedData = JSON.parse(response);
      let markdown = "";
      if (typeof parsedData === "object" && parsedData !== null) {
        if (parsedData.title) markdown += `# ${parsedData.title}\n\n`;
        if (Array.isArray(parsedData.items)) {
          markdown += "## Items\n";
          parsedData.items.forEach((item: string, index: number) => {
            markdown += `${index + 1}. ${item}\n`;
          });
          markdown += "\n";
        }
        if (parsedData.details && typeof parsedData.details === "object") {
          markdown += "## Details\n";
          markdown += "| Key | Value |\n| --- | ----- |\n";
          Object.entries(parsedData.details).forEach(([key, value]) => {
            markdown += `| ${key} | ${value} |\n`;
          });
          markdown += "\n";
        }
        if (parsedData.text || parsedData.content) {
          markdown += `${parsedData.text || parsedData.content}\n`;
        }
        return markdown.trim() || JSON.stringify(parsedData, null, 2);
      }
      return response;
    } catch (error) {
      return response;
    }
  };

  // Streaming effect for AI output
  useEffect(() => {
    if (isMounted && !loading && aiOutput && !isStreaming) {
      setIsStreaming(true);
      const formattedOutput = formatAIResponse(aiOutput);
      setStreamedOutput("");
      let index = 0;
      const outputChunks = formattedOutput.split(/(?<=\s)/);

      const streamInterval = setInterval(() => {
        if (index < outputChunks.length) {
          setStreamedOutput((prev) => prev + outputChunks[index]);
          index++;
        } else {
          clearInterval(streamInterval);
          setIsStreaming(false);
        }
      }, 30);

      return () => {
        clearInterval(streamInterval);
        setIsStreaming(false);
      };
    }
  }, [isMounted, loading, aiOutput]);

  // Update editor with streamed markdown content
  useEffect(() => {
    if (isMounted && editorRef.current && streamedOutput) {
      const editorInstance = editorRef.current.getInstance();
      if (editorInstance) {
        editorInstance.setMarkdown(streamedOutput);
      } else {
        console.error("Editor instance not available");
      }
    }
  }, [isMounted, streamedOutput]);

  // Speak the output when streaming is complete
  useEffect(() => {
    if (isMounted && !isStreaming && streamedOutput && isAITalkingEnabled) {
      const cleanText = streamedOutput
        .replace(/[#|*_-]+/g, "")
        .replace(/\s+/g, " ")
        .trim();
      speakText(cleanText);
    }
  }, [isMounted, isStreaming, streamedOutput, isAITalkingEnabled]);

  // Function to make the AI "talk" with Siri-like voice
  const speakText = (text: string) => {
    if (window.speechSynthesis) {
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

  const handleCopy = useCallback(() => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard
        .writeText(markdown)
        .then(() => alert("✅ Content copied to clipboard!"))
        .catch((error) => console.error("Error copying content:", error));
    }
  }, []);

  const handleClear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown("");
      setStreamedOutput("");
    }
  }, []);

  const toggleAITalking = () => {
    setIsAITalkingEnabled((prev) => !prev);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  // Debug editor ref and voices
  useEffect(() => {
    if (isMounted) {
      console.log("Editor ref:", editorRef.current);
      console.log("Selected Siri-like voice:", siriVoice?.name);
    }
  }, [isMounted, siriVoice]);

  if (!isMounted) {
    return null; // Prevent rendering until mounted on client
  }

  return (
    <div className="bg-[#23272f] p-6 shadow-[0_2px_16px_0_rgba(30,35,41,0.12)] border border-gray-700/60 rounded-xl relative max-w-4xl mx-auto transition-all duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700/60">
        <h2 className="font-semibold text-2xl font-serif text-gray-100 tracking-tight">Your AI Result</h2>
        <div className="flex gap-2">
          <Button
            onClick={toggleAITalking}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200"
            title={isAITalkingEnabled ? "Disable AI Voice" : "Enable AI Voice"}
          >
            {isAITalkingEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
          <Button
            onClick={handleClear}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200"
          >
            Clear
          </Button>
          <Button
            onClick={handleCopy}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200"
          >
            <Copy className="w-5 h-5" /> Copy
          </Button>
        </div>
      </div>

      {/* Output Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
          <Image src="/veda-logo.svg" alt="Veda AI" width={100} height={100} className="mb-6 opacity-90" />
          <Loader2Icon className="animate-spin w-14 h-14 text-blue-600" />
          <p className="mt-5 text-gray-300 font-medium text-xl">Generating content...</p>
        </div>
      ) : (
        <div className="mt-6">
          <Editor
            ref={editorRef}
            initialValue="Loading editor..."
            initialEditType="wysiwyg"
            height="450px"
            useCommandShortcut={true}
            className="rounded-lg border border-gray-700 shadow-md transition-all duration-300 bg-[#1E2329]"
            theme="dark"
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default OutputSection;