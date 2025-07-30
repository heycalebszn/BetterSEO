# SEO Extension Testing Guide

This guide will help you test the Better SEO VS Code extension thoroughly to ensure it's working correctly.

## Prerequisites

1. **VS Code 1.96.0 or higher**
2. **Node.js and npm installed**
3. **Google Gemini API key** (optional for AI features)

## Step 1: Setup and Configuration

### 1.1 Environment Configuration
```bash
# Navigate to the extension directory
cd /workspace

# Install dependencies (if not already done)
npm install

# Configure your API key (optional but recommended)
cp .env.example .env
# Edit .env file and replace placeholder with your actual Gemini API key
```

### 1.2 Get a Google Gemini API Key (Optional)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

**Note:** The extension will work without an API key, but you'll miss the AI-powered suggestions feature.

## Step 2: Build the Extension

```bash
# Compile the extension
npm run compile

# Optional: Run linting to check code quality
npm run lint
```

## Step 3: Install and Test in VS Code

### 3.1 Install the Extension for Testing

**Method 1: Use F5 (Development Mode)**
1. Open VS Code in the extension directory
2. Press `F5` or go to `Run > Start Debugging`
3. This opens a new "Extension Development Host" window with your extension loaded

**Method 2: Package and Install**
```bash
# Create a .vsix package
npm run package

# Install the package (replace with actual filename)
code --install-extension betterseo-0.0.1.vsix
```

### 3.2 Verify Extension is Loaded
1. In the Extension Development Host window, check that "Better SEO" appears in:
   - Extensions panel (`Ctrl+Shift+X`)
   - Command palette (`Ctrl+Shift+P`) - search for "SEO"

## Step 4: Test with Sample Files

### 4.1 Test Good SEO Practices
1. Open `sample/test-good-seo.html`
2. Expected behavior:
   - ✅ No errors in Problems panel
   - ✅ "No SEO Violations Found!" notification
   - ✅ AI suggestions appear in "SEO Analyzer" output channel (if API key configured)

### 4.2 Test Bad SEO Practices
1. Open `sample/test-bad-seo.html`
2. Expected behavior:
   - ❌ Multiple violations in Problems panel (`Ctrl+Shift+M`)
   - ❌ Warning notification: "X SEO Violations Found!"
   - 🔍 Specific issues should include:
     - Title too long (>60 characters)
     - Meta description too long (>160 characters)
     - Missing viewport meta tag
     - Multiple H1 tags
     - Images without alt attributes
     - Missing Open Graph tags
     - Missing canonical link

### 4.3 Test Minimal SEO File
1. Open `sample/test-minimal-seo.html`
2. Expected behavior:
   - ❌ Multiple critical violations
   - 🔍 Should detect:
     - Missing title tag
     - Missing meta description
     - Missing viewport meta tag
     - Missing H1 tag
     - Image without alt attribute

## Step 5: Test Real-Time Analysis

### 5.1 Test Auto-Detection
1. Create a new HTML file
2. Start typing HTML content
3. The extension should automatically analyze as you type (with 500ms debounce)

### 5.2 Test Manual Command
1. Open any HTML file
2. Open Command Palette (`Ctrl+Shift+P`)
3. Run "SEO: Analyze SEO" command
4. Verify analysis runs immediately

## Step 6: Test Different File Types

The extension should activate for these file types:
- `.html` files
- `.vue` files (Vue.js components)
- `.js` files (JavaScript)
- `.ts` files (TypeScript)
- `.php` files

Test by opening files with these extensions and verifying the extension analyzes them.

## Step 7: Test Error Handling

### 7.1 Test Without API Key
1. Remove or comment out `GEMINI_API_KEY` in `.env`
2. Reload VS Code
3. Test analysis - should work without AI suggestions

### 7.2 Test Invalid API Key
1. Set `GEMINI_API_KEY` to an invalid value
2. Test analysis - should show basic analysis without AI features

## Step 8: Test UI Components

### 8.1 Problems Panel
1. Open a file with SEO issues
2. Check Problems panel (`Ctrl+Shift+M`)
3. Verify issues are categorized by severity:
   - 🔴 **Error**: Missing/empty title tag, title too long
   - 🟡 **Warning**: Meta description issues, multiple H1s, missing alt attributes
   - 🔵 **Information**: Missing viewport, Open Graph tags, canonical links

### 8.2 Output Channel
1. With a valid API key, analyze any HTML file
2. Click "View Suggestions" when prompted
3. Verify "SEO Analyzer" output channel opens with AI suggestions

### 8.3 Notifications
- Test that notifications appear for violations found/not found
- Test that clicking "View Problems" opens the Problems panel
- Test that clicking "View Suggestions" opens the output channel

## Step 9: Performance Testing

### 9.1 Test Debouncing
1. Open an HTML file
2. Type rapidly and continuously
3. Verify analysis doesn't run on every keystroke (should wait 500ms after typing stops)

### 9.2 Test Large Files
1. Create or open a large HTML file (>1000 lines)
2. Verify extension handles it without significant performance issues

## Step 10: Test Cleanup

### 10.1 Test Extension Deactivation
1. Disable the extension in VS Code
2. Verify no errors in Developer Console (`Help > Toggle Developer Tools`)

### 10.2 Test Memory Leaks
1. Open/close multiple files repeatedly
2. Check that diagnostic collections are properly cleaned up
3. Monitor memory usage in Task Manager (optional)

## Expected Test Results Summary

| Test File | Expected Violations | Key Checks |
|-----------|-------------------|------------|
| `test-good-seo.html` | 0 | All SEO best practices followed |
| `test-bad-seo.html` | 8-10 | Multiple issues across all categories |
| `test-minimal-seo.html` | 5-7 | Missing essential SEO elements |

## Troubleshooting

### Common Issues:
1. **Extension not loading**: Check VS Code version compatibility
2. **No AI suggestions**: Verify API key is set correctly
3. **No diagnostics**: Check file types are supported
4. **Performance issues**: Check for JavaScript errors in console

### Debug Mode:
1. Set `DEBUG_MODE=true` in `.env`
2. Check VS Code Developer Console for detailed logs
3. Look for error messages in the terminal

## Additional Testing

### Test with Real Websites
1. Save any live website as HTML
2. Test the extension's analysis
3. Compare with real SEO tools like Google PageSpeed Insights

### Test Edge Cases
- Empty files
- Files with only text (no HTML tags)
- Files with malformed HTML
- Very long content strings

This testing guide ensures comprehensive validation of all extension features and helps identify any issues before deployment.