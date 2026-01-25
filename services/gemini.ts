
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

let genAIInstance: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAIInstance!;
}

export async function getStyleAdvice(description: string, imageBase64?: string) {
  const ai = getGenAI();
  const model = 'gemini-3-pro-preview';
  
  const availableProducts = PRODUCTS.map(p => `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Category: ${p.category}`).join('; ');

  const prompt = `You are a professional master barber and stylist with 20 years of experience at "Iron & Steel" in Prague.
  Analyze the client's description (and photo, if provided) and give specific style recommendations for their haircut and beard.
  Description: ${description}.

  Here is our current stock of professional products: ${availableProducts}.
  
  Your task is not just to suggest a haircut, but to select the PERFECT care and styling routine from our range to help the client recreate this look at home in the Czech capital.
  
  Respond STRICTLY in JSON format:
  {
    "haircutRecommendation": "Haircut Name",
    "beardRecommendation": "Beard Advice",
    "reasoning": "In-depth analysis: why this style suits the face shape, hair structure, and description provided.",
    "careTips": ["Pro styling tip", "Skin/hair care advice", "Maintenance hack"],
    "productRecommendations": [
       { 
         "productId": "ID of the product from the list above", 
         "reason": "Specific reason: e.g., 'This matte clay will perfectly hold the texture of your new Crop' or 'This oil will soften the coarse stubble of your beard'." 
       }
    ]
  }
  
  The response must be valid JSON in English. Pick exactly 2 most suitable products.`;

  const contents = imageBase64 
    ? {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }
        ]
      }
    : { parts: [{ text: prompt }] };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function analyzeVideoContent(videoBase64: string, mimeType: string, prompt: string) {
  const ai = getGenAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: videoBase64, mimeType } }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Video Analysis Error:", error);
    return "Error analyzing video. Please check your file size and type.";
  }
}

export async function generateAiVideo(prompt: string, onProgress?: (msg: string) => void) {
  const ai = getGenAI();
  try {
    onProgress?.("Initializing Veo generation engine...");
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onProgress?.("Generating video frames... This may take a minute.");
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      onProgress?.("Processing video layers... " + (Math.random() > 0.5 ? "Enhancing quality..." : "Finalizing sequence..."));
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed.");
    
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
}
