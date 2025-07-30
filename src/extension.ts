import * as vscode from 'vscode';
import { analyzeContent } from './analyzers/geminiAnalyzer';

let debounceTimeout: NodeJS.Timeout | null = null;
let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  // Create a single diagnostic collection to avoid memory leaks
  diagnosticCollection = vscode.languages.createDiagnosticCollection('seo');
  context.subscriptions.push(diagnosticCollection);

  let analyzeSeoCommand = vscode.commands.registerCommand('extension.analyzeSeo', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const content = document.getText();
      await analyzeContent(content, document, diagnosticCollection);
    } else {
      vscode.window.showInformationMessage("No active editor found.");
    }
  });

  const disposable = vscode.workspace.onDidChangeTextDocument(async (event) => {
    const document = event.document;
    if (['html', 'vue', 'javascript', 'typescript', 'php'].includes(document.languageId)) {
      const content = document.getText();
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(async () => {
        try {
          await analyzeContent(content, document, diagnosticCollection);
        } catch (error) {
          console.error('Error during SEO analysis:', error);
        }
      }, 500); 
    }
  });

  context.subscriptions.push(analyzeSeoCommand, disposable);
}

export function deactivate() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
}
