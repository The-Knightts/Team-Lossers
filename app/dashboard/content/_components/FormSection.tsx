"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select"; // Ensure this path is correct or update it to the correct path

interface PROPS {
  options: any
  id?: number;
  selectedTemplate?: TEMPLATE;
  userFormInput: (data: any) => void;
  loading: boolean;
}

const FormSection: React.FC<PROPS> = ({ selectedTemplate, userFormInput, loading }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      {/* Image (if exists) */}
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt="icon" width={70} height={70} />
      )}

      {/* Template Name & Description */}
      <h2 className="font-bold text-2xl mb-2 text-primary">{selectedTemplate?.name}</h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      {/* Form */}
      <form className="mt-6" onSubmit={onSubmit}>
        {(selectedTemplate?.form || []).map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name ?? ""}
                required={item?.required ?? false}
                onChange={handleInputChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name ?? ""}
                required={item?.required ?? false}
                onChange={handleInputChange}
              />
            ) : item.field === "select" ? (
              <Select
                name={item.name ?? ""}
                required={item?.required ?? false}
                onValueChange={(value) => handleInputChange({ target: { name: item.name, value } } as any)}
              >
                {item.options?.map((option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ) : null}
          </div>
        ))}
        
        {/* Submit Button */}
        <Button type="submit" className="w-full py-6" disabled={loading}>
          {loading ? <Loader2Icon className="animate-spin" /> : "Generate content"}
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
