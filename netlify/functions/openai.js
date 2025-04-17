const { OpenAI } = require('openai');

// Handler for Netlify serverless function
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { message, action } = body;

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Using server-side environment variable
    });

    let result;
    
    // Handle different types of requests
    if (action === 'sendMessage') {
      result = await sendMessageToOpenAI(openai, message);
    } else if (action === 'generateSpeech') {
      result = await generateSpeech(openai, message);
    } else {
      throw new Error('Invalid action');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};

// Function to send a message to OpenAI
async function sendMessageToOpenAI(openai, message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant named Nexbot. You work for Naman Rathi, a full stack developer. Keep responses concise and engaging." },
      { role: "user", content: message }
    ],
    max_tokens: 150,
  });

  return { text: completion.choices[0].message.content };
}

// Function to generate speech
async function generateSpeech(openai, text) {
  const speechResponse = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  // Convert the audio to base64
  const buffer = Buffer.from(await speechResponse.arrayBuffer());
  const audioBase64 = buffer.toString('base64');

  return { audio: audioBase64 };
} 