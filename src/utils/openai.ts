import OpenAI from "openai";

// Initialize the OpenAI client with the API key from environment variables
let openai: OpenAI | null = null;

try {
  // Only initialize OpenAI if API key is available
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Allow client-side usage (for demo purposes)
    });
  } else {
    console.warn("OpenAI API key is not provided. Voice assistant features will be limited.");
  }
} catch (error) {
  console.error("Error initializing OpenAI client:", error);
}

// Maintain conversation context (limited to last 5 exchanges)
const conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = [];
const MAX_HISTORY = 5;

// Fallback responses when API key is not available
const fallbackResponses = [
  "I'm sorry, I can't process that request right now. The API key for my intelligence is not configured.",
  "Voice assistant features are currently limited. Please check back later.",
  "I'm not fully operational at the moment due to configuration issues.",
  "I can't access my full capabilities right now. Please contact Naman for assistance.",
  "My AI capabilities are currently offline. Please explore the portfolio manually.",
];

/**
 * Send a message to the OpenAI API and get a response
 * @param message The user's message
 * @returns The AI's response
 */
export async function sendMessageToOpenAI(message: string): Promise<string> {
  try {
    // If OpenAI client is not initialized, return a fallback response
    if (!openai) {
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      return fallbackResponses[randomIndex];
    }
    
    // Add user message to history
    conversationHistory.push({ role: "user", content: message });
    
    // Keep only recent messages to avoid token limits
    const recentHistory = conversationHistory.slice(-MAX_HISTORY * 2);
    
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `I am Nexbot, an AI assistant on Naman Rathi's portfolio. I represent Naman with these facts:

PROFILE: Naman Rathi, Computer Science student at RNS Institute of Technology (2022-2026), specializing in Data Science and AI. CGPA: 7.30/10.

EXPERTISE:
- Data Analytics: Cleaning, visualization, market analysis (achieved 81% model efficiency)
- Tools: Python, React, TensorFlow, Pandas, Tableau, Excel, Matplotlib, YOLOv9
- Projects: FIFA World Cup Analysis (85% accuracy), AtliQ Hospitality, Amazon Sales Insights
- Skills: Machine learning, data visualization, problem-solving

ACHIEVEMENTS:
- Led celestial body recognition system (81% accuracy with YOLOv9)
- Reduced analytics turnaround by 30% through dashboards
- 94.14 percentile in JEE Mains, 99.04 in MHTCET
- Played district-level Badminton and Cricket

EXPERIENCE:
- Data Analytics Intern at Unified Mentors (Jul-Oct 2024)
- Analyzed data for e-commerce, hospitality, and sports domains
- Improved business recommendations by 15%

EDUCATION:
- B.Tech in Computer Science (Data Science) at RNSIT, Bengaluru
- 12th: MSBSHSE (84%), 10th: CBSE (80%)

INTERESTS: Calligraphy, reading, photography, cinematography, badminton, cricket

CONTACT: 1rn22cd049.namanmangilalrathi@gmail.com, +91-8830634853, Bengaluru

PROJECTS IN DETAIL:
1. FIFA World Cup Analysis: Analyzed team performance, winning trends, and player statistics with 85% accuracy.
2. AtliQ Hospitality: Optimized operations by 20% through interactive dashboards showing customer satisfaction and revenue.
3. Amazon Sales Insights: Identified regional profit centers and optimized inventory, improving business recommendations by 15%.
4. TicketTrader: Secure event ticket reselling app using React Native, Node.js, Firebase, and MongoDB.
5. Smart IoT Furniture App: Customization platform for furniture with React, Three.js, and Firebase.

PORTFOLIO SECTIONS:
- Home: Naman's 3D introduction
- About: Background, skills, and education details
- Projects: Detailed case studies of data analytics and development work
- Experience: Professional history and internships
- Contact: Form to reach out for collaborations or inquiries

PORTFOLIO HIGHLIGHTS:
- Dark mode design with interactive elements
- Responsive layout for all devices
- Voice-controlled robot assistant (that's me!)
- Night mode Google Maps integration
- EmailJS integration for contact form

COMMUNICATION STYLE:
- Keep responses under 3 sentences when possible
- Sound slightly robotic but professional
- Use technical terms accurately
- Be helpful but concise
- Avoid unnecessary pleasantries or wordiness
- Highlight Naman's strengths in data science and web development

When asked about navigation, suggest the right section for specific information.`,
        },
        ...recentHistory,
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const response = completion.choices[0]?.message?.content || "I could not process your request.";
    
    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: response });

    return response;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    
    // Return a fallback response if there's an error
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  }
}

/**
 * Helper function to ensure voices are available
 * @returns A promise that resolves when voices are available
 */
const checkVoicesAvailable = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
};

/**
 * Convert text to speech with a robotic voice effect
 * @param text The text to convert to speech
 */
export const speakWithRobotVoice = async (text: string) => {
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
  // Replace "Robo" with "Nexbot" and fix Naman's pronunciation
  const processedText = text.replace(/Robo/gi, "Nexbot").replace(/Naman/gi, "Nuh-muhn");
  
  // Get the saved volume from localStorage or default to 50%
  const savedVolume = localStorage.getItem('voiceVolume');
  const volume = savedVolume ? parseInt(savedVolume) / 100 : 0.5;
  
  // Create a SpeechSynthesisUtterance with English voice
  const utterance = new SpeechSynthesisUtterance(processedText);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.volume = volume;
  
  try {
    // Wait for voices to be available
    const voices = await checkVoicesAvailable();
    
    // Try to find a good English voice
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') && v.name.includes('US')) ||
      v.name.includes('Microsoft') ||
      v.lang === 'en-US'
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log("Using voice:", preferredVoice.name);
    }
  } catch (error) {
    console.error("Error loading voices:", error);
  }
  
  // Log that we're speaking
  console.log("Speaking with volume:", volume, "Text:", processedText.substring(0, 50) + "...");
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
  
  // Workaround for mobile devices that might pause speech synthesis
  const resumeSpeechInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(resumeSpeechInterval);
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 5000);
  
  // Clear interval when done speaking
  utterance.onend = () => {
    clearInterval(resumeSpeechInterval);
  };
};

/**
 * Speak in Hindi with robotic voice effects
 * @param text Hindi text to speak
 */
export const speakHindiWithRobotVoice = async (text: string) => {
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
  // Replace "Robo" with "Nexbot" in Hindi and fix Naman's pronunciation
  const processedText = text.replace(/रोबो/gi, "नेक्सबॉट").replace(/Naman/gi, "नमन");
  
  // Get the saved volume from localStorage or default to 50%
  const savedVolume = localStorage.getItem('voiceVolume');
  const volume = savedVolume ? parseInt(savedVolume) / 100 : 0.5;
  
  // Create a SpeechSynthesisUtterance with Hindi voice
  const utterance = new SpeechSynthesisUtterance(processedText);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.9; // Slightly slower for better pronunciation
  utterance.pitch = 0.9; // Lower pitch for a more masculine voice
  utterance.volume = volume;
  
  try {
    // Wait for voices to be available
    const voices = await checkVoicesAvailable();
    
    // Log all available voices for debugging
    console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
    
    // Find male Hindi voice with preference for deeper voices
    let hindiVoice = null;
    
    // First try to find a voice that explicitly mentions "male" in the name
    hindiVoice = voices.find(v => 
      (v.lang.includes('hi-IN') || v.lang.includes('hi')) && 
      (v.name.toLowerCase().includes('male') || v.name.includes('पुरुष'))
    );
    
    // If no explicitly male voice found, try other typical male voice names
    if (!hindiVoice) {
      hindiVoice = voices.find(v => 
        (v.lang.includes('hi-IN') || v.lang.includes('hi')) && 
        (v.name.includes('Kumar') || v.name.includes('Vijay') || 
         v.name.includes('Ajit') || v.name.includes('Google') || v.name.includes('हिन्दी'))
      );
    }
    
    // If still no male voice found, default to any Hindi voice
    if (!hindiVoice) {
      hindiVoice = voices.find(v => 
        v.lang.includes('hi-IN') || v.lang.includes('hi')
      );
    }
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      console.log("Using Hindi voice:", hindiVoice.name, "Language:", hindiVoice.lang);
    } else {
      // If no Hindi voice found, use a generic male voice
      const maleVoice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.includes('David') || 
        v.name.includes('Thomas') ||
        v.name.includes('Google') && v.name.includes('US')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
        console.log("No Hindi voice found, using male voice:", maleVoice.name);
      } else {
        console.log("No male voice found, using default voice");
      }
    }
  } catch (error) {
    console.error("Error loading Hindi voices:", error);
  }
  
  // Lower the pitch a bit more for a more masculine voice
  utterance.pitch = 0.8;
  
  // Log that we're speaking
  console.log("Speaking Hindi with volume:", volume, "Text:", processedText.substring(0, 50) + "...");
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
  
  // Same workaround for mobile devices
  const resumeSpeechInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(resumeSpeechInterval);
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 5000);
  
  // Clear interval when done speaking
  utterance.onend = () => {
    clearInterval(resumeSpeechInterval);
  };
};
