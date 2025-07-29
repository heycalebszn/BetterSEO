import * as vscode from 'vscode';

export function validateSeoTags(content: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  const lines = content.split('\n');

  // Check for title tag
  const titleTagRegex = /<title>(.*?)<\/title>/i;
  const titleMatch = titleTagRegex.exec(content);
  if (!titleMatch) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <title> tag. Add a descriptive title for better SEO.',
      vscode.DiagnosticSeverity.Error
    ));
  } else {
    const title = titleMatch[1].trim();
    if (title.length === 0) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        'Empty <title> tag. Add a descriptive title.',
        vscode.DiagnosticSeverity.Error
      ));
    } else if (title.length > 60) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        `Title tag is too long (${title.length} characters). Keep it under 60 characters for optimal SEO.`,
        vscode.DiagnosticSeverity.Warning
      ));
    }
  }

  // Check for meta description
  const metaDescriptionRegex = /<meta[^>]+name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i;
  const metaDescriptionMatch = metaDescriptionRegex.exec(content);
  if (!metaDescriptionMatch) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <meta name="description"> tag. Add a meta description for better SEO.',
      vscode.DiagnosticSeverity.Warning
    ));
  } else {
    const description = metaDescriptionMatch[1].trim();
    if (description.length === 0) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        'Empty meta description. Add a descriptive meta description.',
        vscode.DiagnosticSeverity.Warning
      ));
    } else if (description.length > 160) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 0),
        `Meta description is too long (${description.length} characters). Keep it under 160 characters.`,
        vscode.DiagnosticSeverity.Warning
      ));
    }
  }

  // Check for meta viewport (important for mobile SEO)
  const metaViewportRegex = /<meta[^>]+name=["']viewport["'][^>]*>/i;
  if (!metaViewportRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <meta name="viewport"> tag. Add viewport meta tag for mobile optimization.',
      vscode.DiagnosticSeverity.Information
    ));
  }

  // Check for h1 tags
  const h1TagRegex = /<h1[^>]*>(.*?)<\/h1>/gi;
  const h1Matches = content.match(h1TagRegex);
  if (!h1Matches) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing <h1> tag. Add a main heading for better content structure.',
      vscode.DiagnosticSeverity.Information
    ));
  } else if (h1Matches.length > 1) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      `Multiple <h1> tags found (${h1Matches.length}). Use only one <h1> tag per page.`,
      vscode.DiagnosticSeverity.Warning
    ));
  }

  // Check for img tags without alt attributes
  const imgTagsRegex = /<img[^>]*>/gi;
  const imgTags = content.match(imgTagsRegex);
  if (imgTags) {
    imgTags.forEach((imgTag, index) => {
      if (!/<img[^>]*alt=["'][^"']*["'][^>]*>/i.test(imgTag)) {
        // Try to find the line number for better diagnostics
        let lineNumber = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(imgTag.substring(0, 20))) {
            lineNumber = i;
            break;
          }
        }
        
        diagnostics.push(new vscode.Diagnostic(
          new vscode.Range(lineNumber, 0, lineNumber, lines[lineNumber]?.length || 0),
          'Missing alt attribute in <img> tag. Add descriptive alt text for accessibility and SEO.',
          vscode.DiagnosticSeverity.Warning
        ));
      } else {
        // Check for empty alt attributes
        const altMatch = /<img[^>]*alt=["']([^"']*)["'][^>]*>/i.exec(imgTag);
        if (altMatch && altMatch[1].trim().length === 0) {
          let lineNumber = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(imgTag.substring(0, 20))) {
              lineNumber = i;
              break;
            }
          }
          
          diagnostics.push(new vscode.Diagnostic(
            new vscode.Range(lineNumber, 0, lineNumber, lines[lineNumber]?.length || 0),
            'Empty alt attribute in <img> tag. Add descriptive alt text.',
            vscode.DiagnosticSeverity.Information
          ));
        }
      }
    });
  }

  // Check for canonical link
  const canonicalRegex = /<link[^>]+rel=["']canonical["'][^>]*>/i;
  if (!canonicalRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Consider adding a canonical link to prevent duplicate content issues.',
      vscode.DiagnosticSeverity.Information
    ));
  }

  // Check for Open Graph meta tags
  const ogTitleRegex = /<meta[^>]+property=["']og:title["'][^>]*>/i;
  const ogDescriptionRegex = /<meta[^>]+property=["']og:description["'][^>]*>/i;
  if (!ogTitleRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing Open Graph title meta tag. Add og:title for better social media sharing.',
      vscode.DiagnosticSeverity.Information
    ));
  }
  if (!ogDescriptionRegex.test(content)) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      'Missing Open Graph description meta tag. Add og:description for better social media sharing.',
      vscode.DiagnosticSeverity.Information
    ));
  }

  return diagnostics;
}
