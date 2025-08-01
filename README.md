# StockSense

StockSense is a real-time stock analysis dashboard providing live stock data, performance metrics, and AI-powered investment insights.

## Features

- Real-time stock data from NSE (National Stock Exchange)
- Interactive price charts
- AI-powered buy/sell analysis
- Investment idea generation based on risk profile
- Manual data entry option when API limits are reached

## Setup for Local Development

1. Clone the repository:

```bash
git clone https://github.com/BKailashh/stocksense.git
cd stocksense
```

2. Open `index.html` in your browser or set up a local server:

```bash
# Using Python
python -m http.server

# Using Node.js
npx serve
```

3. When running locally, the API configuration section will appear at the bottom of the page.
   - Enter your EODHD API key (get one from [EODHD](https://eodhistoricaldata.com/))
   - Enter your Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
   - The keys are stored in your browser's localStorage for development

## API Key Security

This project uses two APIs:

1. **EODHD API** for stock data
2. **Google Gemini API** for AI-powered insights

For deployment, we use environment variables rather than hardcoding API keys in the source code.

## Deployment Options

### Option 1: Deploy with Netlify (Recommended)

1. Sign up for a [Netlify](https://www.netlify.com/) account
2. Click "New site from Git" and select your GitHub repository
3. Configure the build settings:
   - Build command: Leave empty (static site)
   - Publish directory: `.` (root directory)
4. Add environment variables:
   - Go to Site settings > Environment variables
   - Add the following variables:
     - Key: `GEMINI_API_KEY`, Value: your Gemini API key
     - Key: `EODHD_API_KEY`, Value: your EODHD API key
5. Deploy the site

### Option 2: Deploy with Vercel

1. Sign up for a [Vercel](https://vercel.com/) account
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Other
   - Root Directory: `.`
   - Build Command: Leave empty
   - Output Directory: `.`
4. Add environment variables:
   - Go to Project Settings > Environment Variables
   - Add the same variables as described for Netlify
5. Deploy the site

### Option 3: Deploy with GitHub Pages and GitHub Actions

1. Create a new file `.github/workflows/deploy.yml` in your repository with this content:

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "16"

      - name: Install Dependencies
        run: npm install -g @11ty/eleventy

      - name: Build
        run: |
          mkdir _site
          cp index.html _site/
          # Create a JavaScript file with environment variables
          echo "const GEMINI_API_KEY = '${{ secrets.GEMINI_API_KEY }}'; const EODHD_API_KEY = '${{ secrets.EODHD_API_KEY }}';" > _site/env-config.js
          # Update index.html to include env-config.js
          sed -i 's/<\/head>/<script src="env-config.js"><\/script><\/head>/' _site/index.html

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

2. Add your API keys as GitHub Secrets:

   - Go to your GitHub repository > Settings > Secrets and variables > Actions
   - Add the following secrets:
     - Name: `GEMINI_API_KEY`, Value: your Gemini API key
     - Name: `EODHD_API_KEY`, Value: your EODHD API key

3. Push to the main branch to trigger deployment

**Note:** GitHub Pages deployment is a bit more complex because it doesn't natively support environment variables, so we're creating a JavaScript file with the variables during the build process.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
