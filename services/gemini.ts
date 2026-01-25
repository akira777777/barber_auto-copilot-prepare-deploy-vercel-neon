
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStyleAdvice(description: string, media?: { mimeType: string, data: string }) {
  const model = 'gemini-3-pro-preview';
  
  const availableProducts = PRODUCTS.map(p => `ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Category: ${p.category}`).join('; ');

  const mediaType = media?.mimeType.startsWith('video') ? 'video' : 'photo';
  const prompt = `You are a professional master barber and stylist with 20 years of experience at "Iron & Steel" in Prague.
  Analyze the client's description${media ? ` and the provided ${mediaType}` : ''} to give specific style recommendations for their haircut and beard.
  
  User Description: ${description}.

  Here is our current stock of professional products: ${availableProducts}.
  
  Your task:
  1. Analyze face shape, hair texture, and growth patterns from the ${mediaType} (if provided).
  2. Suggest a specific haircut and beard style.
  3. Select the PERFECT care and styling routine from our range to help the client recreate this look at home.
  
  Respond STRICTLY in JSON format:
  {
    "haircutRecommendation": "Haircut Name",
    "beardRecommendation": "Beard Advice",
    "reasoning": "In-depth analysis: why this style suits the face shape and hair structure observed in the ${mediaType}.",
    "careTips": ["Pro styling tip", "Skin/hair care advice", "Maintenance hack"],
    "productRecommendations": [
       { 
         "productId": "ID of the product from the list above", 
         "reason": "Specific reason: e.g., 'This matte clay will perfectly hold the texture of your new Crop'." 
       }
    ]
  }
  
  The response must be valid JSON in English. Pick exactly 2 most suitable products.`;

  const contents = media 
    ? {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: media.mimeType, data: media.data } }
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
