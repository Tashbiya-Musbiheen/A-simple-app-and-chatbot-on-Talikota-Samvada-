import { GoogleGenAI, Type } from "@google/genai";
import { Language, Message } from "../types";

// FIX: Initialize GoogleGenAI with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMonumentImage(prompt: string): Promise<string | null> {
  try {
    // FIX: Use ai.models.generateImages with the 'imagen-4.0-generate-001' model to generate a high-quality image.
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

export async function translateChatHistory(messages: Message[], targetLanguage: Language): Promise<Message[] | null> {
  if (!messages || messages.length === 0) return [];

  try {
    const historyString = JSON.stringify(messages);
    const prompt = `Translate the 'text' field of each object in the following JSON array of chat messages to ${targetLanguage}. Maintain the original JSON structure and the 'role' for each message. Only output the translated JSON array. \n\n ${historyString}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              text: { type: Type.STRING },
            },
            required: ['role', 'text'],
          },
        },
      },
    });
    
    const translatedMessages = JSON.parse(response.text);
    return translatedMessages;
  } catch (error) {
    console.error('Error translating chat history:', error);
    return null; // Return null on error
  }
}