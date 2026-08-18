import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 150,
  },
});

const conversationHistory: Array<{ role: "user" | "model"; parts: string[] }> = [];
const MAX_HISTORY = 5;

const SYSTEM_PROMPT = `I am Nexbot, an AI assistant on Naman Rathi's portfolio. I represent Naman with these facts:

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

When asked about navigation, suggest the right section for specific information.`;

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    conversationHistory.push({ role: "user", parts: [message] });
    
    const recentHistory = conversationHistory.slice(-MAX_HISTORY * 2);
    
    const chat = model.startChat({
      history: [
        { role: "user", parts: [SYSTEM_PROMPT] },
        { role: "model", parts: ["Understood. I am Nexbot, Naman's AI assistant. How can I help you?"] },
        ...recentHistory,
      ],
    });
    
    const result = await chat.sendMessage(message);
    const response = result.response.text() || "I could not process your request.";
    
    conversationHistory.push({ role: "model", parts: [response] });
    
    return response;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I encountered an error processing your request. Please try again later.";
  }
}

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

export const speakWithRobotVoice = async (text: string) => {
  window.speechSynthesis.cancel();
  
  const processedText = text.replace(/Robo/gi, "Nexbot").replace(/Naman/gi, "Nuh-muhn");
  
  const savedVolume = localStorage.getItem('voiceVolume');
  const volume = savedVolume ? parseInt(savedVolume) / 100 : 0.5;
  
  const utterance = new SpeechSynthesisUtterance(processedText);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.volume = volume;
  
  try {
    const voices = await checkVoicesAvailable();
    
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
  
  console.log("Speaking with volume:", volume, "Text:", processedText.substring(0, 50) + "...");
  
  window.speechSynthesis.speak(utterance);
  
  const resumeSpeechInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(resumeSpeechInterval);
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 5000);
  
  utterance.onend = () => {
    clearInterval(resumeSpeechInterval);
  };
};

export const speakHindiWithRobotVoice = async (text: string) => {
  window.speechSynthesis.cancel();
  
  const processedText = text.replace(/रोबो/gi, "नेक्सबॉट").replace(/Naman/gi, "नमन");
  
  const savedVolume = localStorage.getItem('voiceVolume');
  const volume = savedVolume ? parseInt(savedVolume) / 100 : 0.5;
  
  const utterance = new SpeechSynthesisUtterance(processedText);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.9;
  utterance.pitch = 0.9;
  utterance.volume = volume;
  
  try {
    const voices = await checkVoicesAvailable();
    
    console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
    
    let hindiVoice = null;
    
    hindiVoice = voices.find(v => 
      (v.lang.includes('hi-IN') || v.lang.includes('hi')) && 
      (v.name.toLowerCase().includes('male') || v.name.includes('पुरुष'))
    );
    
    if (!hindiVoice) {
      hindiVoice = voices.find(v => 
        (v.lang.includes('hi-IN') || v.lang.includes('hi')) && 
        (v.name.includes('Kumar') || v.name.includes('Vijay') || 
         v.name.includes('Ajit') || v.name.includes('Google') || v.name.includes('हिन्दी'))
      );
    }
    
    if (!hindiVoice) {
      hindiVoice = voices.find(v => 
        v.lang.includes('hi-IN') || v.lang.includes('hi')
      );
    }
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      console.log("Using Hindi voice:", hindiVoice.name, "Language:", hindiVoice.lang);
    } else {
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
  
  utterance.pitch = 0.8;
  
  console.log("Speaking Hindi with volume:", volume, "Text:", processedText.substring(0, 50) + "...");
  
  window.speechSynthesis.speak(utterance);
  
  const resumeSpeechInterval = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(resumeSpeechInterval);
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 5000);
  
  utterance.onend = () => {
    clearInterval(resumeSpeechInterval);
  };
};