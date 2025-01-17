import { GoogleGenerativeAI } from "@google/generative-ai";
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key is missing. Add it to the .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// generating SEO suggestions
export async function getSeoSuggestions(content: string): Promise<string> {
  const prompt = `Analyze the following content for SEO best practices, including meta tags, alt attributes, title tags, and general content optimization:\n\n${content}`;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating SEO suggestions:', error);
    throw new Error('Failed to analyze content with Gemini.');
  }
}
