# StockSense

StockSense is a real-time stock analysis dashboard providing live stock data, performance metrics, and AI-powered investment insights.

## Features

- Real-time stock data from NSE (National Stock Exchange)
- Interactive price charts
- AI-powered buy/sell analysis
- Investment idea generation based on risk profile
- Manual data entry option when API limits are reached

## Setup

1. Clone the repository:
```
git clone https://github.com/BKailashh/stocksense.git
```

2. Set up the configuration:
   - Rename `config.sample.js` to `config.js`
   - Add your EODHD API key to the file (get one from [EODHD](https://eodhistoricaldata.com/))

3. Open `index.html` in your browser or set up a local server.

## API Key Security

This project uses the EODHD API for stock data. The API key is loaded from a local configuration file that is not committed to the repository. When deploying, you'll need to securely provide your API key based on your hosting environment.

## Deployment

To deploy on GitHub Pages:

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Select the branch to deploy from (usually `main`)
4. Your site will be available at `https://bkailashh.github.io/stocksense/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.