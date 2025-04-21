const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
generationConfig,
history: [],
});
export const processGeminiResponse = async (result: any) => {
  try {
    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }
    const text = await result.response.text();
    return text;
  } catch (error) {
    console.error("Error processing Gemini response:", error);
    throw error;
  }
};