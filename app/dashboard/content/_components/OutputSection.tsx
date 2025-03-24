"use client";
import React, { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button } from "@/components/ui/button";
import { Copy, Loader2Icon } from "lucide-react";
import Image from "next/image";

// Dynamically import Toast UI Editor to disable SSR
const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), {
  ssr: false,
});

interface OutputSectionProps {
  aiOutput: string;
  loading: boolean;
}

const OutputSection: React.FC<OutputSectionProps> = ({ aiOutput, loading }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(aiOutput || "");
    }
  }, [aiOutput]);

  const handleCopy = useCallback(() => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard.writeText(markdown)
        .then(() => alert("✅ Content copied to clipboard!"))
        .catch((error) => console.error("Error copying content:", error));
    }
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg border border-gray-200 rounded-2xl relative max-w-3xl mx-auto transition-all duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-xl text-gray-900">Your AI Result</h2>
        <Button
          onClick={handleCopy}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          <Copy className="w-5 h-5" /> Copy
        </Button>
      </div>

      {/* Output Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <Image src="/logo.png" alt="Veda AI" width={90} height={90} className="mb-5 opacity-80" />
          <Loader2Icon className="animate-spin w-12 h-12 text-blue-500" />
          <p className="mt-4 text-gray-600 font-medium text-lg">Generating content...</p>
        </div>
      ) : (
        <div className="mt-4">
          <Editor
            ref={editorRef}
            initialValue="Your result will appear here."
            initialEditType="wysiwyg"
            height={aiOutput.includes("|") ? "650px" : "450px"}
            useCommandShortcut={true}
            className="rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default OutputSection;