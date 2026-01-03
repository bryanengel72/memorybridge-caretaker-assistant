import { GoogleGenAI, Type } from "@google/genai";
import { Activity } from "../types";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    throw new Error("Missing Gemini API Key");
  }
  return new GoogleGenAI({ apiKey });
};

export const getCareAdvice = async (query: string, context: string = ""): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Patient Clinical Context:
        ${context}
  
        User Query:
        ${query}
      `,
      config: {
        systemInstruction: "You are a specialized dementia and Alzheimer's care assistant. You have access to the patient's medical visit history and notes provided by the caretaker. Use this context to provide personalized, empathetic, and clinical-backed advice. If the information isn't in the records, use your general medical knowledge and web search. Always focus on safety and dignity.",
        tools: [{ googleSearch: {} }]
      },
    });
    return response.text || "I'm sorry, I couldn't generate advice at this time.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "AI insights unavailable (Check API Key).";
  }
};

export const generateDailyStimulation = async (patientStage: string): Promise<Activity[]> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 personalized stimulation activities for a person in the ${patientStage} stage of dementia. Return as a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              benefit: { type: Type.STRING },
              duration: { type: Type.STRING }
            },
            required: ["title", "description", "benefit", "duration"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse activities", e);
      return [];
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    return [];
  }
};
