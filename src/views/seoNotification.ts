import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel | undefined;

function getOutputChannel(): vscode.OutputChannel {
  if (!outputChannel) {
    outputChannel = vscode.window.createOutputChannel('SEO Analyzer');
  }
  return outputChannel;
}

export function showSeoViolationNotification(violationsCount: number): void {
  if (violationsCount > 0) {
    vscode.window.showWarningMessage(`${violationsCount} SEO Violations Found!`, 'View Problems', 'Dismiss')
      .then((selection) => {
        if (selection === 'View Problems') {
          vscode.commands.executeCommand('workbench.actions.view.problems');
        }
      });
  } else {
    vscode.window.showInformationMessage('No SEO Violations Found!');
  }
}

export function showSeoSuggestionsNotification(suggestions: string): void {
  if (suggestions && suggestions.trim().length > 0) {
    const channel = getOutputChannel();
    channel.clear();
    channel.appendLine('=== SEO AI Suggestions ===');
    channel.appendLine(new Date().toLocaleString());
    channel.appendLine('');
    channel.appendLine(suggestions);
    channel.appendLine('');
    channel.appendLine('=========================');
    
    // Show a short notification with option to view full suggestions
    vscode.window.showInformationMessage('AI SEO suggestions ready!', 'View Suggestions', 'Dismiss')
      .then((selection) => {
        if (selection === 'View Suggestions') {
          channel.show();
        }
      });
  }
}

export function notifyMissingAltAttribute(): void {
  vscode.window.showWarningMessage('Missing alt attribute in one or more <img> tags!');
}

export function notifyMissingMetaDescription(): void {
  vscode.window.showWarningMessage('Missing <meta description> tag!');
}

export function notifyMissingTitleTag(): void {
  vscode.window.showWarningMessage('Missing <title> tag!');
}
