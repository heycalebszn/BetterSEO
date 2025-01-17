import * as vscode from 'vscode';
const { analyzeContent } = require('./analyzers/geminiAnalyzer');

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.workspace.onDidChangeTextDocument(async (event) => {
    const document = event.document;
    if (['html', 'vue', 'javascript', 'typescript', 'php'].includes(document.languageId)) {
      const content = document.getText();

      await analyzeContent(content, document);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
