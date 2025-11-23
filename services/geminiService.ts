import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return client;
};

export const streamGeminiResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  onChunk: (text: string) => void
) => {
  const ai = getClient();
  const model = 'gemini-2.5-flash';

  try {
    const chat = ai.chats.create({
      model,
      history: history,
      config: {
        systemInstruction: "你是一个运行在Web模拟操作系统中的智能助手，名字叫HyperAI。请用中文简体回答，保持回答简洁、专业且幽默。",
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });

    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n[系统错误: 无法连接至神经网络。请检查 API 密钥。]");
  }
};