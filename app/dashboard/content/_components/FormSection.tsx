"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (data: any) => void;
  loading: boolean;
}

const FormSection: React.FC<PROPS> = ({ 
  selectedTemplate, 
  userFormInput, 
  loading 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="relative bg-[#1E2329] h-full rounded-xl overflow-hidden border border-gray-700/50 shadow-xl backdrop-blur-lg transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20 opacity-50" />
      <div className="relative p-6 z-10">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-6">{selectedTemplate?.name || "Content Generator"}</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Dynamic Form Fields */}
          {(selectedTemplate?.form || []).map((item, index) => (
            <div key={index} className="space-y-3 group">
              <label className="block text-sm font-medium text-gray-200 transition-colors duration-200 group-hover:text-blue-400">
                {item.label}
                {item?.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {item.field === "input" ? (
                <Input
                  name={item.name ?? ""}
                  required={item?.required ?? false}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${item.label.toLowerCase()}`}
                  className="bg-[#2C3340] border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-500 rounded-xl backdrop-blur-sm shadow-inner"
                />
              ) : item.field === "textarea" ? (
                <Textarea
                  name={item.name ?? ""}
                  required={item?.required ?? false}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${item.label.toLowerCase()}`}
                  className="bg-[#2C3340] border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-500 rounded-xl backdrop-blur-sm shadow-inner min-h-[120px] resize-y"
                />
              ) : null}
            </div>
          ))}
          
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-medium py-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Generating...</span>
              </>
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormSection;