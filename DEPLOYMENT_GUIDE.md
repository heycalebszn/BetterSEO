# VS Code Extension Deployment Guide

This guide covers multiple ways to deploy and install the Better SEO VS Code extension.

## Table of Contents
1. [Development Installation](#development-installation)
2. [Local Package Installation](#local-package-installation)
3. [VS Code Marketplace Publishing](#vs-code-marketplace-publishing)
4. [Enterprise/Private Distribution](#enterpriseprivate-distribution)
5. [User Installation Instructions](#user-installation-instructions)

---

## Development Installation

This method is used for testing and development purposes.

### Prerequisites
- VS Code 1.96.0 or higher
- Node.js 16+ and npm
- Git (for cloning the repository)

### Steps

1. **Clone and Setup**
   ```bash
   git clone <your-repository-url>
   cd betterseo
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Build the Extension**
   ```bash
   npm run compile
   ```

4. **Launch Development Mode**
   - Open the project in VS Code
   - Press `F5` or go to `Run > Start Debugging`
   - A new "Extension Development Host" window opens with the extension loaded
   - Test the extension in this window

---

## Local Package Installation

This method creates a `.vsix` package that can be installed locally or distributed.

### Steps

1. **Build Production Package**
   ```bash
   npm run package
   ```
   This creates a `betterseo-0.0.1.vsix` file in the project root.

2. **Install the Package**

   **Method A: Command Line**
   ```bash
   code --install-extension betterseo-0.0.1.vsix
   ```

   **Method B: VS Code UI**
   1. Open VS Code
   2. Go to Extensions panel (`Ctrl+Shift+X`)
   3. Click the "..." menu in the top-right
   4. Select "Install from VSIX..."
   5. Choose your `.vsix` file

3. **Verify Installation**
   - Check Extensions panel for "Better SEO"
   - Open Command Palette (`Ctrl+Shift+P`) and search for "SEO"
   - Open an HTML file to test auto-analysis

---

## VS Code Marketplace Publishing

To publish your extension to the official VS Code Marketplace for public distribution.

### Prerequisites

1. **Visual Studio Code Publisher Account**
   - Visit [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
   - Create a publisher account
   - Note your publisher name

2. **Install vsce (VS Code Extension Manager)**
   ```bash
   npm install -g vsce
   ```

### Steps

1. **Update package.json**
   ```json
   {
     "publisher": "your-publisher-name",
     "repository": {
       "type": "git",
       "url": "https://github.com/your-username/betterseo.git"
     },
     "homepage": "https://github.com/your-username/betterseo",
     "bugs": {
       "url": "https://github.com/your-username/betterseo/issues"
     }
   }
   ```

2. **Prepare for Publishing**
   ```bash
   # Ensure all dependencies are production-ready
   npm audit fix
   
   # Run tests and linting
   npm run lint
   npm test
   
   # Create package
   vsce package
   ```

3. **Publish to Marketplace**
   ```bash
   # Login to your publisher account
   vsce login your-publisher-name
   
   # Publish the extension
   vsce publish
   ```

4. **Monitor Publication**
   - Check [VS Code Marketplace](https://marketplace.visualstudio.com/)
   - Your extension should appear within a few minutes
   - Users can now install it directly from VS Code

### Publishing Updates
```bash
# Increment version and publish
vsce publish patch  # or minor, major
```

---

## Enterprise/Private Distribution

For organizations that want to distribute the extension privately.

### Option 1: Internal Package Repository

1. **Create VSIX Package**
   ```bash
   npm run package
   ```

2. **Host on Internal Server**
   - Upload `.vsix` file to internal file server
   - Provide download link to users
   - Users install via "Install from VSIX"

### Option 2: Private VS Code Extensions Gallery

1. **Setup Private Gallery** (requires Azure DevOps or similar)
2. **Publish to Private Gallery**
3. **Configure VS Code Settings** for users:
   ```json
   {
     "extensions.gallery": {
       "serviceUrl": "https://your-private-gallery.com/_apis/extensionmanagement",
       "cacheUrl": "https://your-private-gallery.com/_apis/public/gallery",
       "itemUrl": "https://your-private-gallery.com/_apis/public/gallery/publishers"
     }
   }
   ```

### Option 3: Git-based Distribution

1. **Tag Release in Git**
   ```bash
   git tag v0.0.1
   git push origin v0.0.1
   ```

2. **Users Clone and Install**
   ```bash
   git clone <repository-url>
   cd betterseo
   npm install
   npm run package
   code --install-extension betterseo-0.0.1.vsix
   ```

---

## User Installation Instructions

Provide these instructions to end users for installing your extension.

### From VS Code Marketplace (Once Published)

1. **Open VS Code**
2. **Go to Extensions panel** (`Ctrl+Shift+X`)
3. **Search for "Better SEO"**
4. **Click "Install"**
5. **Reload VS Code if prompted**

### From VSIX Package

1. **Download the `.vsix` file** from your distribution source
2. **Open VS Code**
3. **Go to Extensions panel** (`Ctrl+Shift+X`)
4. **Click the "..." menu** in the top-right
5. **Select "Install from VSIX..."**
6. **Choose the downloaded `.vsix` file**
7. **Reload VS Code if prompted**

### First-time Setup

After installation, users should:

1. **Get a Gemini API Key** (optional but recommended)
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Save it for configuration

2. **Configure the Extension**
   - Create a `.env` file in their project root:
     ```
     GEMINI_API_KEY=their_api_key_here
     ```
   - Or set it as an environment variable

3. **Test the Extension**
   - Open an HTML file
   - Check for SEO analysis in Problems panel
   - Run "SEO: Analyze SEO" command

---

## Configuration Options

### Environment Variables
```bash
# Required for AI features
GEMINI_API_KEY=your_gemini_api_key

# Optional settings
DEBUG_MODE=false
```

### VS Code Settings (Future Enhancement)
```json
{
  "betterSEO.autoAnalyze": true,
  "betterSEO.debounceDelay": 500,
  "betterSEO.enableAI": true,
  "betterSEO.maxTitleLength": 60,
  "betterSEO.maxDescriptionLength": 160
}
```

---

## Troubleshooting Deployment

### Common Issues

1. **Extension Not Loading**
   - Check VS Code version compatibility
   - Verify all dependencies are installed
   - Check for errors in Developer Console

2. **Publishing Fails**
   - Verify publisher account is active
   - Check that all required fields in `package.json` are filled
   - Ensure no sensitive information is included

3. **VSIX Installation Fails**
   - Verify VS Code version compatibility
   - Check file permissions
   - Try restarting VS Code

### Debug Information

Enable debug logging:
```bash
# Set environment variable
DEBUG=vscode:*

# Or in VS Code Developer Console
process.env.DEBUG = 'vscode:*'
```

---

## Distribution Checklist

Before distributing your extension:

- [ ] All dependencies installed and working
- [ ] Extension compiles without errors
- [ ] All features tested with sample files
- [ ] README.md updated with current information
- [ ] Version number incremented appropriately
- [ ] API keys and sensitive data removed from package
- [ ] License file included
- [ ] Publisher information correct in package.json

---

## Security Considerations

### For Publishers
- Never include API keys in the published package
- Use environment variables for configuration
- Validate all user inputs
- Keep dependencies updated

### For Users
- Only install extensions from trusted sources
- Review permissions requested by extensions
- Keep extensions updated
- Use secure API keys and don't share them

---

## Support and Maintenance

### Version Management
```bash
# Semantic versioning
npm version patch  # Bug fixes: 0.0.1 -> 0.0.2
npm version minor  # New features: 0.0.1 -> 0.1.0
npm version major  # Breaking changes: 0.0.1 -> 1.0.0
```

### Update Distribution
1. **Make changes to code**
2. **Test thoroughly**
3. **Update version number**
4. **Build new package**
5. **Distribute through chosen method**
6. **Notify users of updates**

This deployment guide ensures smooth installation and distribution of your Better SEO extension across different environments and use cases.