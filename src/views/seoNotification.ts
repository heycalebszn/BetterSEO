import * as vscode from 'vscode';

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
  if (suggestions) {
    vscode.window.showInformationMessage('SEO Suggestions: ' + suggestions);
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
