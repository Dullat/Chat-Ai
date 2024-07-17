// AIzaSyCtQ7cs-6acWy4t_7G79wN5lTSsnuFBSeI
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const hulla = "AIzaSyCtQ7cs-6acWy4t_7G79wN5lTSsnuFBSeI";
const genAI = new GoogleGenerativeAI(hulla);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result);
  return result.response.text();
}

export default runChat;