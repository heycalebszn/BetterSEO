# betterSEO - VS Code Extension

A powerful VS Code extension that helps improve your website's SEO by providing real-time analysis, suggestions, and validation of SEO best practices.

## Features

### 🔍 Real-time SEO Analysis
- Automatically analyzes HTML, Vue, JavaScript, TypeScript, and PHP files as you type
- Provides instant feedback on SEO issues and improvements

### 🤖 AI-Powered Suggestions
- Integrates with Google Gemini AI to provide intelligent SEO recommendations
- Analyzes content for meta tags, titles, descriptions, and overall SEO optimization

### 📋 Comprehensive SEO Checks
- **Title Tag Validation**: Checks for presence, length (optimal: <60 characters), and content
- **Meta Description**: Validates presence, length (optimal: <160 characters), and content
- **Image Alt Attributes**: Ensures all images have descriptive alt text for accessibility and SEO
- **Heading Structure**: Validates proper H1 tag usage (one per page)
- **Mobile Optimization**: Checks for viewport meta tag
- **Open Graph Tags**: Validates social media sharing optimization
- **Canonical Links**: Suggests canonical URLs to prevent duplicate content issues

### 🚨 Smart Diagnostics
- Color-coded severity levels (Error, Warning, Information)
- Line-specific error reporting where possible
- Integration with VS Code's Problems panel

## Installation

### Prerequisites
- VS Code 1.96.0 or higher
- Node.js and npm
- Google Gemini API key

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd betterseo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API Key**:
   - Copy `.env.example` to `.env`
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to the `.env` file:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

4. **Build the extension**:
   ```bash
   npm run compile
   ```

5. **Install the extension**:
   - Press `F5` to open a new VS Code window with the extension loaded
   - Or package the extension: `npm run package` and install the `.vsix` file

## Usage

### Automatic Analysis
The extension automatically analyzes your files when you:
- Open HTML, Vue, JavaScript, TypeScript, or PHP files
- Make changes to supported file types
- The analysis runs with a 500ms debounce to avoid excessive processing

### Manual Analysis
- Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
- Run the command: `SEO: Analyze SEO`
- Or use the keyboard shortcut if configured

### Viewing Results
- SEO issues appear in the **Problems** panel (`Ctrl+Shift+M`)
- Notifications show the number of violations found
- AI-generated suggestions appear as information messages

## Supported File Types

- **HTML** (`.html`, `.htm`)
- **Vue.js** (`.vue`)
- **JavaScript** (`.js`)
- **TypeScript** (`.ts`)
- **PHP** (`.php`)

## SEO Rules Checked

### Critical (Errors)
- Missing or empty `<title>` tag
- Title tag longer than 60 characters

### Important (Warnings)
- Missing or empty meta description
- Meta description longer than 160 characters
- Images without alt attributes
- Multiple H1 tags on the same page

### Recommendations (Information)
- Missing viewport meta tag
- Missing H1 tag
- Empty alt attributes
- Missing canonical link
- Missing Open Graph tags (og:title, og:description)

## Development

### Scripts
- `npm run compile` - Compile the extension
- `npm run watch` - Watch for changes and recompile
- `npm run package` - Create production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Project Structure
```
src/
├── extension.ts              # Main extension entry point
├── analyzers/
│   ├── geminiAnalyzer.ts    # AI-powered analysis
│   └── seoRules.ts          # SEO validation rules
├── utils/
│   ├── geminiUtils.ts       # Gemini AI integration
│   └── seoUtils.ts          # SEO content extraction
├── views/
│   └── seoNotification.ts   # User notifications
└── test/
    └── extension.test.ts    # Unit tests
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/your-repo/betterseo/issues) on GitHub.

---

**Made with ❤️ for better web SEO practices**