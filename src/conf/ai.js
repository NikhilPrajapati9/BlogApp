import { GoogleGenerativeAI } from "@google/generative-ai";
import conf from "./conf";

const genAI = new GoogleGenerativeAI(conf.gemini_api_key); // Store your API key in an environment variable
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or "gemini-pro-vision" for multimodal inputs


const generateText = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error generating text:", error);
        return null;
    }
};

export { generateText }