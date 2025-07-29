import * as vscode from 'vscode';
import { getSeoSuggestions } from './geminiUtils';

// Re-export the getSeoSuggestions function from geminiUtils
export { getSeoSuggestions };

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

  return `Title: ${title}\nDescription: ${metaDescription}\nKeywords: ${metaKeywords}\n\nContent:\n${content}`;
}
