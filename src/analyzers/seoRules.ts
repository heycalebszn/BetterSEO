import * as vscode from 'vscode';

export function checkSeoViolations(content: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];

// missing img tag
  const imgRegex = /<img[^>]*>/g;
  const imgTags = content.match(imgRegex);
  imgTags?.forEach((imgTag) => {
    if (!/<img[^>]*alt=["'][^"']*["'][^>]*>/g.test(imgTag)) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0), 
        'Missing alt attribute in <img> tag',
        vscode.DiagnosticSeverity.Warning
      ));
    }
  });

  // check for missing meta description
  const metaDescRegex = /<meta[^>]+name=["']description["'][^>]*>/g;
  if (!metaDescRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0), 
      'Missing <meta description> tag',
      vscode.DiagnosticSeverity.Warning
    ));
  }
  return diagnostics;
}
