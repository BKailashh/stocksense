// netlify/functions/get-stock-data.js
exports.handler = async function (event, context) {
  // Get the stock symbol from the query string
  const { symbol, period } = event.queryStringParameters;
  const apiKey = process.env.EODHD_API_KEY;

  if (!symbol) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Stock symbol is required" }),
    };
  }

  const url = `https://eodhd.com/api/eod/${symbol}?api_token=${apiKey}&fmt=json&period=${
    period || "d"
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `EODHD API Error: ${errorText}` }),
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
