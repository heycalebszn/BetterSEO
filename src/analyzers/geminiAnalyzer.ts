import * as vscode from 'vscode';
import { getSeoSuggestions, extractSeoContentFromFile } from '../utils/seoUtils';
import { validateSeoTags } from '../analyzers/seoRules';
import * as seoNotifications from '../views/seoNotification';

export async function analyzeContent(
  content: string, 
  document: vscode.TextDocument, 
  diagnosticCollection: vscode.DiagnosticCollection
): Promise<void> {
  try {
    const seoContent = extractSeoContentFromFile(document);

    // Only try AI analysis if we have a valid API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'placeholder_key_replace_with_real_key') {
      try {
        const seoSuggestions = await getSeoSuggestions(seoContent);
        seoNotifications.showSeoSuggestionsNotification(seoSuggestions);
      } catch (aiError) {
        console.error('AI analysis failed:', aiError);
        // Continue with basic analysis even if AI fails
      }
    }

    const diagnostics = validateSeoTags(content);
    diagnosticCollection.set(document.uri, diagnostics);

    if (diagnostics.length > 0) {
      seoNotifications.showSeoViolationNotification(diagnostics.length);
    } else {
      seoNotifications.showSeoViolationNotification(0);
    }
  } catch (error) {
    console.error('Error analyzing SEO content:', error);
    vscode.window.showErrorMessage('Failed to analyze SEO content: ' + (error as Error).message);
  }
}
