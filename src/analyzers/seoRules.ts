import * as vscode from 'vscode';

export function validateSeoTags(content: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];

  const titleTagRegex = /<title>(.*?)<\/title>/;
  if (!titleTagRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <title> tag',
      vscode.DiagnosticSeverity.Error
    ));
  }

  const metaDescriptionRegex = /<meta[^>]+name=["']description["'][^>]*>/;
  if (!metaDescriptionRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <meta description> tag',
      vscode.DiagnosticSeverity.Warning
    ));
  }

  const imgTagsRegex = /<img[^>]*>/g;
  const imgTags = content.match(imgTagsRegex);
  if (imgTags) {
    imgTags.forEach((imgTag) => {
      if (!/<img[^>]*alt=["'][^"']*["'][^>]*>/g.test(imgTag)) {
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(0, 0, 0, 0),
          'Missing alt attribute in <img> tag',
          vscode.DiagnosticSeverity.Warning
        ));
      }
    });
  }

  return diagnostics;
}
