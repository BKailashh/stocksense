// netlify/functions/search-symbol.js
exports.handler = async function (event, context) {
  const { keyword } = event.queryStringParameters;
  const apiKey = process.env.EODHD_API_KEY;

  if (!keyword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Search keyword is required" }),
    };
  }

  const url = `https://eodhd.com/api/search/${keyword}?api_token=${apiKey}&fmt=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { statusCode: response.status, body: await response.text() };
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
