"use client";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_component/TemplateListSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AIModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { NextRouter, useRouter } from "next/router";

function CreateNewContent({ params }: { params: Promise<{ "template-slug": string }> }) {
  const [selectedTemplate, setSelectedTemplate] = useState<TEMPLATE | undefined>();
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const [router, setRouter] = useState<null | NextRouter>(null); // Use state to store router

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  // Ensure router is set after client-side rendering
  useEffect(() => {
    setRouter(useRouter()); // Set the router on client-side
  }, []);

  useEffect(() => {
    const fetchTemplate = async () => {
      const resolvedParams = await params;
      const templateSlug = resolvedParams["template-slug"];
      const template = Templates.find((item) => item.slug === templateSlug);
      if (template) {
        setSelectedTemplate(template);
      } else {
        console.error("Template not found");
      }
    };

    fetchTemplate();
  }, [params]);

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      console.log("Please Upgrade");
      if (router) {
        router.push("/dashboard/billing"); // Navigate to billing page
      }
      return;
    }

    if (!selectedTemplate) {
      console.error("Template not selected");
      return;
    }

    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + " , " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponse = result?.response.text();
      setAiOutput(aiResponse);
      await SaveInDb(formData, selectedTemplate?.slug, aiResponse);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiOutput("Error generating content, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "default@domain.com",
        createdAt: moment().format("DD/MM/YYYY"),
      });
      console.log(result);
    } catch (error) {
      console.error("Error saving data to the database:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
