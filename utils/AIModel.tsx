import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Type guard to check if something is an Error
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// Define the system instructions for VedaAI assistant
const systemInstructions = "You are a helpful AI assistant focused on general knowledge. Provide friendly and concise responses about general knowledge topics, historical events, science, culture, and current affairs. Do not provide code examples or technical implementation details. Avoid discussing specific programming concepts or development-related topics. Always maintain a professional yet conversational tone. For any technical or code-related questions, politely redirect users to use the appropriate template tools instead.";

// Enhanced utility function for processing Gemini API responses
export const processGeminiResponse = async (result: any): Promise<string> => {
  try {
    console.log('Raw API Result:', result);

    // Different methods to extract text based on response structure
    if (result && result.response) {
      // Method 1: Try text() method
      const responseText = await result.response.text();
      if (responseText) return responseText;

      // Method 2: Try accessing candidates
      if (result.response.candidates && result.response.candidates.length > 0) {
        return result.response.candidates[0]?.content?.parts[0]?.text || '';
      }
    }

    // Fallback parsing methods
    if (typeof result === 'string') return result;
    
    if (result && typeof result === 'object') {
      const textProperties = ['response', 'text', 'content', 'message'];
      for (const prop of textProperties) {
        if (typeof result[prop] === 'string') return result[prop];
      }
      return JSON.stringify(result);
    }

    return String(result);
  } catch (error: unknown) {
    // Properly handle error logging
    if (isError(error)) {
      console.error('Error processing Gemini response:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    } else {
      console.error('An unknown error occurred during response processing', error);
    }
    
    return isError(error) 
      ? `Sorry, I encountered an error: ${error.message}` 
      : 'Sorry, I encountered an unexpected error processing the response.';
  }
};

// Chat session creation with system instructions
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: "System: " + systemInstructions }]
    },
    {
      role: "model",
      parts: [{ text: "I understand. I'll act as a helpful AI assistant." }]
    }
  ],
});

// Function to create a new chat session with custom history
export const createChatSession = (history = []) => {
  return model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: "System: " + systemInstructions }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. I'll act as a helpful AI assistant." }]
      },
      ...history
    ],
  });
};

// Enhanced function to save chat history with robust error handling
export const saveChatHistory = async (db: any, userId: string, messages: any[]) => {
  try {
    console.log('Saving chat history for user:', userId);
    console.log('Number of messages:', messages.length);
    
    // Placeholder for actual database saving logic
    // Replace with your specific database implementation
    // await db.collection('chats').add({
    //   userId: userId,
    //   messages: messages,
    //   timestamp: new Date()
    // });
  } catch (error: unknown) {
    // Comprehensive error logging
    if (isError(error)) {
      console.error('Detailed Error in saveChatHistory:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        userId: userId,
        messageCount: messages.length
      });
    } else {
      console.error('An unknown error occurred while saving chat history', error);
    }
    
    // Optionally rethrow or handle the error as needed
    throw error;
  }
};