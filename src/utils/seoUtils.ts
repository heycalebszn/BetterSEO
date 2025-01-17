import { GoogleGenerativeAI } from '@google/generative-ai';
import * as vscode from 'vscode';

const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function getSeoSuggestions(content: string): Promise<string> {
  try {
    const prompt = `Analyze the following content for SEO improvement suggestions:\n\n${content}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error getting SEO suggestions from Gemini:', error);
    throw new Error('Failed to get SEO suggestions');
  }
}

export function extractSeoContentFromFile(document: vscode.TextDocument): string {
  const content = document.getText();

  const titleTagRegex = /<title>(.*?)<\/title>/;
  const titleMatch = titleTagRegex.exec(content);
  const title = titleMatch ? titleMatch[1] : '';
  const metaDescriptionRegex = /<meta[^>]+name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/;
  const metaDescriptionMatch = metaDescriptionRegex.exec(content);
  const metaDescription = metaDescriptionMatch ? metaDescriptionMatch[1] : '';
  const metaKeywordsRegex = /<meta[^>]+name=["']keywords["'][^>]*content=["'](.*?)["'][^>]*>/;
  const metaKeywordsMatch = metaKeywordsRegex.exec(content);
  const metaKeywords = metaKeywordsMatch ? metaKeywordsMatch[1] : '';

  return `${title}\n${metaDescription}\n${metaKeywords}\n${content}`;
}
