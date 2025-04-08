import OpenAI from "openai";

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Allow client-side usage (for demo purposes)
});

/**
 * Send a message to the OpenAI API and get a response
 * @param message The user's message
 * @returns The AI's response
 */
export async function sendMessageToOpenAI(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant embedded in a 3D robot on a portfolio website. Keep responses concise, friendly, and slightly robotic. Your name is Robo and you help visitors navigate the portfolio.",
        },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
    });

    return (
      completion.choices[0]?.message?.content ||
      "I could not process your request."
    );
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return "I encountered an error processing your request. Please try again later.";
  }
}

/**
 * Convert text to speech with a robotic voice effect
 * @param text The text to convert to speech
 */
export function speakWithRobotVoice(text: string): void {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Get available voices and select a good one for a robot
  const voices = window.speechSynthesis.getVoices();

  // Try to find a good voice for a robot (preference order)
  const preferredVoices = [
    voices.find(
      (voice) =>
        voice.name.includes("Google US English") && voice.name.includes("Male"),
    ),
    voices.find((voice) => voice.name.includes("Microsoft David")),
    voices.find((voice) => voice.name.includes("Daniel")),
    voices.find(
      (voice) => voice.lang === "en-US" && voice.name.includes("Male"),
    ),
  ];

  // Use the first available preferred voice, or fall back to the first available voice
  utterance.voice =
    preferredVoices.find((voice) => voice !== undefined) || voices[0];

  // Adjust speech parameters for a more robotic sound
  utterance.pitch = 0.8; // Slightly lower pitch
  utterance.rate = 0.9; // Slightly slower rate
  utterance.volume = 1.0; // Full volume

  // Add some pauses between words for robotic effect
  const processedText = text
    .replace(/\. /g, '. <break time="0.5s"/> ')
    .replace(/\! /g, '! <break time="0.5s"/> ')
    .replace(/\? /g, '? <break time="0.5s"/> ');

  utterance.text = processedText;

  // Speak the text
  window.speechSynthesis.speak(utterance);
}
