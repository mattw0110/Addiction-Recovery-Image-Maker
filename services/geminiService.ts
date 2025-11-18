import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, GeneratedImage } from "../types";

// Initialize the client with the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates the text content (Title, Caption, and Image Prompt) using Gemini Flash.
 */
export const generateBlogContent = async (
  topic: string,
  mood: string
): Promise<GeneratedContent> => {
  const model = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are a compassionate creative director for an addiction recovery blog. 
    Your goal is to generate content that is uplifting, hopeful, and celebrates sobriety and healthy living.
    
    1. Create a catchy, inspiring blog post title based on the user's topic.
    2. Write a short, warm paragraph (caption) suitable for a social media post or blog intro.
    3. Design a highly detailed image prompt for an AI image generator. 
       - The image should feature happy, diverse people engaged in healthy activities or moments of connection.
       - The lighting should be natural, cinematic, and warm (e.g., golden hour, soft morning light).
       - The style should be photorealistic and high quality.
       - Focus on the emotion of joy, relief, and connection.
       - Avoid stereotypical "sad recovery" imagery.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: `Topic: ${topic}. Mood: ${mood}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "An inspiring title for the blog post.",
          },
          caption: {
            type: Type.STRING,
            description: "A warm, encouraging paragraph describing the scene and the feeling of recovery.",
          },
          imagePrompt: {
            type: Type.STRING,
            description: "A detailed, photorealistic image generation prompt describing happy people.",
          },
        },
        required: ["title", "caption", "imagePrompt"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No text returned from Gemini.");
  }

  try {
    return JSON.parse(text) as GeneratedContent;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Failed to parse AI response.");
  }
};

/**
 * Generates an image using Imagen based on the prompt provided by the previous step.
 */
export const generateBlogImage = async (prompt: string): Promise<GeneratedImage> => {
  // Using Imagen 4.0 for high quality results as requested in prompt instructions
  const model = "imagen-4.0-generate-001";

  try {
    const response = await ai.models.generateImages({
      model,
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "16:9", // Cinematic/Blog header format
        outputMimeType: "image/jpeg",
      },
    });

    const generatedImage = response.generatedImages?.[0]?.image;

    if (!generatedImage || !generatedImage.imageBytes) {
      throw new Error("No image data returned from Imagen.");
    }

    return {
      url: `data:image/jpeg;base64,${generatedImage.imageBytes}`,
      mimeType: "image/jpeg",
    };
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};