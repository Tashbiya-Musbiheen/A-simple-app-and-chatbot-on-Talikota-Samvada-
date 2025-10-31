import { GoogleGenAI } from "@google/genai";

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
