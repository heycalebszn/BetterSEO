import * as vscode from 'vscode';
import { analyzeContent } from './analyzers/geminiAnalyzer';

let debounceTimeout: NodeJS.Timeout | null = null;

export function activate(context: vscode.ExtensionContext) {
  let analyzeSeoCommand = vscode.commands.registerCommand('extension.analyzeSeo', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const content = document.getText();
      await analyzeContent(content, document);
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
        await analyzeContent(content, document);
      }, 500); 
    }
  });

  context.subscriptions.push(analyzeSeoCommand, disposable);
}

export function deactivate() {}
