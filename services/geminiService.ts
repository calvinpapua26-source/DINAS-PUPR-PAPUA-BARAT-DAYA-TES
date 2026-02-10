
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Dinas Pekerjaan Umum dan Penataan Ruang (PUPR) Provinsi Papua Barat Daya.
Your goal is to provide accurate, professional, and helpful information about:
1. Public infrastructure (roads, bridges, water systems).
2. Spatial planning (Tata Ruang).
3. Building permits (PBG/SLF).
4. Regional development in Southwest Papua (Sorong, Sorong Selatan, Maybrat, Tambrauw, Raja Ampat).
Always respond in Indonesian. If you don't know the specific answer regarding a project, advise the user to visit the official office in Sorong or contact the helpdesk.
Be polite and informative.
`;

export async function chatWithGemini(userMessage: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi gangguan pada sistem asisten AI. Silakan coba beberapa saat lagi.";
  }
}
