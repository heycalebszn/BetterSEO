import * as vscode from 'vscode';
import { getSeoSuggestions, extractSeoContentFromFile } from '../utils/seoUtils';
import { validateSeoTags } from '../analyzers/seoRules';
import * as seoNotifications from '../views/seoNotification';

export async function analyzeContent(content: string, document: vscode.TextDocument): Promise<void> {
  try {
    const seoContent = extractSeoContentFromFile(document);

    const seoSuggestions = await getSeoSuggestions(seoContent);
    seoNotifications.showSeoSuggestionsNotification(seoSuggestions);

    const diagnostics = validateSeoTags(content);
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('seo');
    diagnosticCollection.set(document.uri, diagnostics);

    if (diagnostics.length > 0) {
      seoNotifications.showSeoViolationNotification(diagnostics.length);
    } else {
      seoNotifications.showSeoViolationNotification(0);
    }
  } catch (error) {
    console.error('Error analyzing SEO content:', error);
    vscode.window.showErrorMessage('Failed to analyze SEO content.');
  }
}
