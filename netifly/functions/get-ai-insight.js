// netlify/functions/get-ai-insight.js
exports.handler = async function (event, context) {
  // Get the prompt from the request body
  const { prompt } = JSON.parse(event.body);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Prompt is required" }),
    };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error
        ? errorData.error.message
        : "An unknown API error occurred.";
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Gemini API Error: ${errorMessage}` }),
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
