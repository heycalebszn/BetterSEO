import * as vscode from 'vscode';
import { getSeoSuggestions } from '../utils/geminiUtils';
import { checkSeoViolations } from '../utils/seoUtils';

export async function analyzeContent(content: string, document: vscode.TextDocument): Promise<void> {
  try {
    const seoSuggestions = await getSeoSuggestions(content);
    vscode.window.showInformationMessage(seoSuggestions);

    const diagnostics = checkSeoViolations(content);
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('seo');
    diagnosticCollection.set(document.uri, diagnostics);

    if (diagnostics.length > 0) {
      vscode.window.showWarningMessage('SEO Violations Found!');
    } else {
      vscode.window.showInformationMessage('No SEO Violations Found!');
    }
  } catch (error) {
    console.error('Error analyzing SEO content:', error);
    vscode.window.showErrorMessage('Failed to analyze SEO content.');
  }
}
