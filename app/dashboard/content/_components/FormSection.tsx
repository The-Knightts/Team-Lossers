"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (data: any) => void;
  loading: boolean;
}

const FormSection: React.FC<PROPS> = ({
  selectedTemplate,
  userFormInput,
  loading,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="relative bg-[#23272f] rounded-lg overflow-hidden border border-gray-700/60 shadow-[0_2px_12px_0_rgba(30,35,41,0.10)] backdrop-blur-lg transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10 p-4 md:p-6 min-h-[575px] flex flex-col justify-start">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-purple-900/20 opacity-50" />
      <div className="relative p-6 z-10 space-y-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2 font-serif tracking-tight">
          {selectedTemplate?.name || "Content Generator"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {(selectedTemplate?.form || []).map((item, index) => (
            <div key={index} className="space-y-2 group">
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
                  className="bg-[#23272f] border border-gray-700/60 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-500 rounded-lg shadow-inner"
                />
              ) : item.field === "textarea" ? (
                <Textarea
                  name={item.name ?? ""}
                  required={item?.required ?? false}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${item.label.toLowerCase()}`}
                  className="bg-[#23272f] border border-gray-700/60 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-500 rounded-lg shadow-inner min-h-[180px] resize-y"
                />
              ) : item.field === "dropdown" ? (
                <Select
                  name={item.name}
                  required={item?.required ?? false}
                  onValueChange={(value) =>
                    handleSelectChange(value, item.name ?? "")
                  }
                >
                  <SelectTrigger className="bg-[#23272f] border border-gray-700/60 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:border-gray-500 rounded-lg shadow-inner">
                    <SelectValue
                      placeholder={`Select ${item.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#23272f] border border-gray-700/60 text-white">
                    {item.options?.map((option: string) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="hover:bg-blue-500/20"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </div>
          ))}
          <Button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
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
