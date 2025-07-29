import * as assert from 'assert';
import * as vscode from 'vscode';
import { validateSeoTags } from '../analyzers/seoRules';
import { extractSeoContentFromFile } from '../utils/seoUtils';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	suite('SEO Rules Tests', () => {
		test('Should detect missing title tag', () => {
			const content = '<html><head></head><body><h1>Test</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const titleError = diagnostics.find(d => d.message.includes('Missing <title> tag'));
			assert.ok(titleError, 'Should detect missing title tag');
			assert.strictEqual(titleError?.severity, vscode.DiagnosticSeverity.Error);
		});

		test('Should detect empty title tag', () => {
			const content = '<html><head><title></title></head><body><h1>Test</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const titleError = diagnostics.find(d => d.message.includes('Empty <title> tag'));
			assert.ok(titleError, 'Should detect empty title tag');
			assert.strictEqual(titleError?.severity, vscode.DiagnosticSeverity.Error);
		});

		test('Should detect title tag too long', () => {
			const longTitle = 'A'.repeat(70);
			const content = `<html><head><title>${longTitle}</title></head><body><h1>Test</h1></body></html>`;
			const diagnostics = validateSeoTags(content);
			
			const titleWarning = diagnostics.find(d => d.message.includes('Title tag is too long'));
			assert.ok(titleWarning, 'Should detect title tag too long');
			assert.strictEqual(titleWarning?.severity, vscode.DiagnosticSeverity.Warning);
		});

		test('Should detect missing meta description', () => {
			const content = '<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const metaError = diagnostics.find(d => d.message.includes('Missing <meta name="description">'));
			assert.ok(metaError, 'Should detect missing meta description');
			assert.strictEqual(metaError?.severity, vscode.DiagnosticSeverity.Warning);
		});

		test('Should detect meta description too long', () => {
			const longDescription = 'A'.repeat(170);
			const content = `<html><head><title>Test</title><meta name="description" content="${longDescription}"></head><body><h1>Test</h1></body></html>`;
			const diagnostics = validateSeoTags(content);
			
			const metaWarning = diagnostics.find(d => d.message.includes('Meta description is too long'));
			assert.ok(metaWarning, 'Should detect meta description too long');
			assert.strictEqual(metaWarning?.severity, vscode.DiagnosticSeverity.Warning);
		});

		test('Should detect missing alt attribute in img tag', () => {
			const content = '<html><head><title>Test</title></head><body><h1>Test</h1><img src="test.jpg"></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const imgWarning = diagnostics.find(d => d.message.includes('Missing alt attribute in <img> tag'));
			assert.ok(imgWarning, 'Should detect missing alt attribute');
			assert.strictEqual(imgWarning?.severity, vscode.DiagnosticSeverity.Warning);
		});

		test('Should detect empty alt attribute in img tag', () => {
			const content = '<html><head><title>Test</title></head><body><h1>Test</h1><img src="test.jpg" alt=""></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const imgInfo = diagnostics.find(d => d.message.includes('Empty alt attribute in <img> tag'));
			assert.ok(imgInfo, 'Should detect empty alt attribute');
			assert.strictEqual(imgInfo?.severity, vscode.DiagnosticSeverity.Information);
		});

		test('Should detect missing H1 tag', () => {
			const content = '<html><head><title>Test</title></head><body><h2>Subtitle</h2></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const h1Info = diagnostics.find(d => d.message.includes('Missing <h1> tag'));
			assert.ok(h1Info, 'Should detect missing H1 tag');
			assert.strictEqual(h1Info?.severity, vscode.DiagnosticSeverity.Information);
		});

		test('Should detect multiple H1 tags', () => {
			const content = '<html><head><title>Test</title></head><body><h1>First</h1><h1>Second</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const h1Warning = diagnostics.find(d => d.message.includes('Multiple <h1> tags found'));
			assert.ok(h1Warning, 'Should detect multiple H1 tags');
			assert.strictEqual(h1Warning?.severity, vscode.DiagnosticSeverity.Warning);
		});

		test('Should detect missing viewport meta tag', () => {
			const content = '<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const viewportInfo = diagnostics.find(d => d.message.includes('Missing <meta name="viewport"> tag'));
			assert.ok(viewportInfo, 'Should detect missing viewport meta tag');
			assert.strictEqual(viewportInfo?.severity, vscode.DiagnosticSeverity.Information);
		});

		test('Should detect missing Open Graph tags', () => {
			const content = '<html><head><title>Test</title></head><body><h1>Test</h1></body></html>';
			const diagnostics = validateSeoTags(content);
			
			const ogTitleInfo = diagnostics.find(d => d.message.includes('Missing Open Graph title meta tag'));
			const ogDescInfo = diagnostics.find(d => d.message.includes('Missing Open Graph description meta tag'));
			
			assert.ok(ogTitleInfo, 'Should detect missing og:title');
			assert.ok(ogDescInfo, 'Should detect missing og:description');
			assert.strictEqual(ogTitleInfo?.severity, vscode.DiagnosticSeverity.Information);
			assert.strictEqual(ogDescInfo?.severity, vscode.DiagnosticSeverity.Information);
		});

		test('Should pass with valid SEO content', () => {
			const content = `
				<html>
				<head>
					<title>Perfect SEO Title</title>
					<meta name="description" content="A perfect meta description for SEO testing">
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<meta property="og:title" content="Perfect SEO Title">
					<meta property="og:description" content="A perfect meta description">
					<link rel="canonical" href="https://example.com">
				</head>
				<body>
					<h1>Main Heading</h1>
					<img src="test.jpg" alt="Descriptive alt text">
				</body>
				</html>
			`;
			const diagnostics = validateSeoTags(content);
			
			// Should only have canonical link suggestion as it's optional
			const errors = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error);
			const warnings = diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Warning);
			
			assert.strictEqual(errors.length, 0, 'Should have no errors');
			assert.strictEqual(warnings.length, 0, 'Should have no warnings');
		});
	});

	suite('SEO Content Extraction Tests', () => {
		function createMockDocument(content: string): vscode.TextDocument {
			const lines = content.split('\n');
			const mockLineAt = (lineOrPosition: number | vscode.Position): vscode.TextLine => {
				const lineNumber = typeof lineOrPosition === 'number' ? lineOrPosition : lineOrPosition.line;
				return {
					lineNumber: lineNumber,
					text: lines[lineNumber] || '',
					range: new vscode.Range(lineNumber, 0, lineNumber, (lines[lineNumber] || '').length),
					rangeIncludingLineBreak: new vscode.Range(lineNumber, 0, lineNumber + 1, 0),
					firstNonWhitespaceCharacterIndex: 0,
					isEmptyOrWhitespace: (lines[lineNumber] || '').trim().length === 0
				};
			};

			return {
				uri: vscode.Uri.file('/test.html'),
				fileName: '/test.html',
				isUntitled: false,
				languageId: 'html',
				version: 1,
				isDirty: false,
				isClosed: false,
				save: async () => true,
				eol: vscode.EndOfLine.LF,
				lineCount: lines.length,
				lineAt: mockLineAt,
				offsetAt: (position: vscode.Position) => 0,
				positionAt: (offset: number) => new vscode.Position(0, 0),
				getText: (range?: vscode.Range) => content,
				getWordRangeAtPosition: (position: vscode.Position) => undefined,
				validateRange: (range: vscode.Range) => range,
				validatePosition: (position: vscode.Position) => position
			};
		}

		test('Should extract title, description, and keywords', () => {
			const content = `
				<html>
				<head>
					<title>Test Title</title>
					<meta name="description" content="Test description">
					<meta name="keywords" content="test, keywords">
				</head>
				<body>Content here</body>
				</html>
			`;
			
			const mockDocument = createMockDocument(content);
			const extracted = extractSeoContentFromFile(mockDocument);
			
			assert.ok(extracted.includes('Title: Test Title'), 'Should extract title');
			assert.ok(extracted.includes('Description: Test description'), 'Should extract description');
			assert.ok(extracted.includes('Keywords: test, keywords'), 'Should extract keywords');
			assert.ok(extracted.includes('Content:'), 'Should include content section');
		});

		test('Should handle missing SEO tags gracefully', () => {
			const content = '<html><head></head><body>Content</body></html>';
			
			const mockDocument = createMockDocument(content);
			const extracted = extractSeoContentFromFile(mockDocument);
			
			assert.ok(extracted.includes('Title: '), 'Should have empty title section');
			assert.ok(extracted.includes('Description: '), 'Should have empty description section');
			assert.ok(extracted.includes('Keywords: '), 'Should have empty keywords section');
		});
	});
});
