import { useState, useEffect, useRef } from "react";
import { sendMessageToOpenAI, speakWithRobotVoice, speakHindiWithRobotVoice } from "../utils/openai";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

// Add TypeScript definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceControlProps {
  onBotResponse?: (response: string) => void;
  animationComplete?: boolean;
}

// Hindi translations for common phrases
const HINDI_PHRASES = {
  greetings: "नमस्ते! मैं नेक्सबॉट हूँ, नमन राठी का AI सहायक। आप किस भाषा में बात करना चाहेंगे - हिंदी या अंग्रे़ी?",
  languagePrompt: "कृपया बताएं कि आप किस भाषा में बात करना पसंद करेंगे?",
  welcome: "आपका स्वागत है! मैं आपकी कैसे सहायता कर सकता हूँ?",
  askName: "आपका नाम क्या है?",
  help: "मैं नमन के बारे में जानकारी प्रदान कर सकता हूँ। आप क्या जानना चाहते हैं?",
  namanName: "नमन"
};

const VoiceControl = ({ onBotResponse, animationComplete = true }: VoiceControlProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [language, setLanguage] = useState<"english" | "hindi" | "unselected">("unselected");
  const [hasInitialGreeting, setHasInitialGreeting] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [needsManualStart, setNeedsManualStart] = useState(false);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  
  // Prompts for initial interactions
  const initialLanguagePrompt = "Hello! I'm Nexbot, Naman's AI assistant. Which language would you prefer to chat in - English or Hindi?";
  const englishWelcomePrompt = "Welcome! I'm Nexbot, Naman's AI assistant. May I know your name?";

  // Initialize speech recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === "hindi" ? "hi-IN" : "en-US";

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const userTranscript = event.results[current][0].transcript;
        setTranscript(userTranscript);
        handleUserVoiceInput(userTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported in this browser");
    }
  }, [language]);

  // Initialize speech synthesis and load voices
  useEffect(() => {
    // Initialize speech synthesis and ensure voices are loaded
    if ('speechSynthesis' in window) {
      // Force initial load of voices
      window.speechSynthesis.getVoices();

      // Create a listener for when voices are ready
      const handleVoicesChanged = () => {
        console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
      };
      
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      
      // Test if we can autoplay audio or need a manual trigger
      const audioTest = new Audio();
      audioTest.src = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHCAgICAgICAgICAgICAgICAgICAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAZVg";
      const playPromise = audioTest.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Auto-play is allowed
            console.log("Auto-play is allowed");
            audioTest.pause();
          })
          .catch(error => {
            // Auto-play is prevented
            console.log("Auto-play is prevented", error);
            setNeedsManualStart(true);
          });
      }
      
      // Cleanup
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Automatically trigger the greeting when animation completes
  useEffect(() => {
    if (animationComplete && !hasInitialGreeting && !needsManualStart) {
      // Slight delay to ensure everything is loaded
      const greetingTimer = setTimeout(() => {
        triggerInitialGreeting();
      }, 1500); // Increased delay to ensure speech synthesis is ready
      
      return () => clearTimeout(greetingTimer);
    }
  }, [animationComplete, hasInitialGreeting, needsManualStart]);

  // Trigger the initial greeting and language selection
  const triggerInitialGreeting = () => {
    if (!isMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // First automatically speak the language prompt
      console.log("Speaking initial greeting:", initialLanguagePrompt);
      
      // Use a small delay before speaking to ensure synthesis is ready
      setTimeout(() => {
        speakWithRobotVoice(initialLanguagePrompt);
      }, 200);
      
      // Call onBotResponse to show the message in the UI
      if (onBotResponse) {
        onBotResponse(initialLanguagePrompt);
      }
      
      // Mark that we've done the initial greeting
      setHasInitialGreeting(true);
    }
  };

  // Detect language from user input
  const detectLanguage = (text: string) => {
    const hindiPattern = /[\u0900-\u097F]/; // Unicode range for Hindi characters
    const languageKeywords = {
      english: /\b(english|speak.*english|talk.*english)\b/i,
      hindi: /\b(hindi|speak.*hindi|talk.*hindi)\b/i,
    };

    // Check if text contains Hindi characters
    if (hindiPattern.test(text)) {
      return "hindi";
    }
    
    // Check for explicit language mentions
    if (languageKeywords.hindi.test(text)) {
      return "hindi";
    }
    
    if (languageKeywords.english.test(text)) {
      return "english";
    }
    
    // Default to current language or English
    return language !== "unselected" ? language : "english";
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      
      // Update recognition language based on selected language
      if (recognition.lang !== (language === "hindi" ? "hi-IN" : "en-US")) {
        recognition.lang = language === "hindi" ? "hi-IN" : "en-US";
      }
      
      recognition.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    // Load volume from localStorage on component mount
    const savedVolume = localStorage.getItem('voiceVolume');
    if (savedVolume) {
      const parsedVolume = parseInt(savedVolume);
      setVolume(parsedVolume);
      setIsMuted(parsedVolume === 0);
      
      // Set the CSS variable for the gradient when component mounts
      if (volumeSliderRef.current) {
        volumeSliderRef.current.style.setProperty('--volume-percent', `${parsedVolume}%`);
      }
    }
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    // Save to localStorage
    localStorage.setItem('voiceVolume', newVolume.toString());
    
    // Update CSS variable for gradient
    e.target.style.setProperty('--volume-percent', `${newVolume}%`);
  };

  const toggleMute = () => {
    if (isMuted) {
      // If currently muted, restore previous volume or default to 50
      const prevVolume = volume === 0 ? 50 : volume;
      setVolume(prevVolume);
      setIsMuted(false);
      
      // Update CSS variable for the gradient
      if (volumeSliderRef.current) {
        volumeSliderRef.current.style.setProperty('--volume-percent', `${prevVolume}%`);
        localStorage.setItem('voiceVolume', prevVolume.toString());
      }
    } else {
      // If not muted, set volume to 0
      setVolume(0);
      setIsMuted(true);
      
      // Update CSS variable for the gradient
      if (volumeSliderRef.current) {
        volumeSliderRef.current.style.setProperty('--volume-percent', '0%');
        localStorage.setItem('voiceVolume', '0');
      }
    }
  };

  const handleVolumeClick = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (volumeSliderRef.current && !volumeSliderRef.current.contains(e.target as Node)) {
      setIsVolumeVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);

  const handleUserVoiceInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsProcessing(true);
    
    // If language not yet selected, try to detect it from input
    if (language === "unselected") {
      const detectedLang = detectLanguage(userInput);
      setLanguage(detectedLang);
      
      // Provide welcome message in selected language
      let welcomeMessage = "";
      
      if (detectedLang === "hindi") {
        // Use the Hindi name version for proper pronunciation
        welcomeMessage = HINDI_PHRASES.welcome + " " + HINDI_PHRASES.askName;
        if (onBotResponse) {
          onBotResponse(welcomeMessage);
        }
        if (!isMuted) {
          speakHindiWithRobotVoice(welcomeMessage);
        }
      } else {
        welcomeMessage = englishWelcomePrompt;
        if (onBotResponse) {
          onBotResponse(welcomeMessage);
        }
        if (!isMuted) {
          speakWithRobotVoice(welcomeMessage);
        }
      }
      
      setIsProcessing(false);
      return;
    }

    try {
      // Process user's input by replacing mentions of "Naman" with correct pronunciations
      let processedInput = userInput;
      if (language === "hindi" && userInput.includes("Naman") || userInput.includes("नमन")) {
        processedInput = userInput.replace(/Naman/gi, HINDI_PHRASES.namanName);
      }
      
      const response = await sendMessageToOpenAI(processedInput);

      // Process response before displaying/speaking to ensure proper name pronunciation
      let processedResponse = response;
      if (language === "hindi" && response.includes("Naman")) {
        processedResponse = response.replace(/Naman/gi, HINDI_PHRASES.namanName);
      }

      // Notify parent component about the response
      if (onBotResponse) {
        onBotResponse(processedResponse);
      }

      // Speak the response in the selected language
      if (!isMuted) {
        if (language === "hindi") {
          speakHindiWithRobotVoice(processedResponse);
        } else {
          speakWithRobotVoice(processedResponse);
        }
      }
    } catch (error) {
      console.error("Error processing voice input:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-10 z-50 flex flex-col items-end space-y-4">
      {needsManualStart && !hasInitialGreeting && (
        <div className="bg-black/70 text-white p-3 rounded-lg max-w-xs backdrop-blur-md shadow-lg animate-fade-in mb-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm">Click to meet Nexbot!</p>
            <button 
              onClick={triggerInitialGreeting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 clickable"
            >
              Say Hello
            </button>
          </div>
        </div>
      )}
      
      {transcript && (
        <div className="bg-black/70 text-white p-3 rounded-lg max-w-xs backdrop-blur-md shadow-lg animate-fade-in">
          <div className="relative">
            <p className="text-sm">{transcript}</p>
            <div className="absolute -bottom-3 right-2 w-4 h-4 bg-black/70 rotate-45 backdrop-blur-md transform-gpu"></div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div className="speaker-toggle-container">
          <input
            type="checkbox"
            id="checkboxInput"
            checked={isMuted}
            onChange={toggleMute}
          />
          <label 
            htmlFor="checkboxInput" 
            className="toggleSwitch clickable"
            onClick={handleVolumeClick}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <div className="speaker">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                viewBox="0 0 75 75"
              >
                <path
                  d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                  style={{
                    stroke: "#fff",
                    strokeWidth: 5,
                    strokeLinejoin: "round",
                    fill: "#fff",
                  }}
                ></path>
                {volume > 0 && (
                  <path
                    d={`M48,27.6a19.5,19.5 0 0 1 0,21.4M${volume > 30 ? "55.1,20.5a30,30 0 0 1 0,35.6M" : ""}${volume > 60 ? "61.6,14a38.8,38.8 0 0 1 0,48.6" : ""}`}
                    style={{
                      fill: "none",
                      stroke: "#fff",
                      strokeWidth: 5,
                      strokeLinecap: "round",
                    }}
                  ></path>
                )}
              </svg>
            </div>
            <div className="mute-speaker">
              <svg
                version="1.0"
                viewBox="0 0 75 75"
                stroke="#fff"
                strokeWidth="5"
              >
                <path
                  d="m39,14-17,15H6V48H22l17,15z"
                  fill="#fff"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="m49,26 20,24m0-24-20,24"
                  fill="#fff"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </label>
          
          {/* Volume Slider */}
          {isVolumeVisible && (
            <div className="volume-slider-container">
              <input
                ref={volumeSliderRef}
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volume Slider"
                style={{ '--volume-percent': `${volume}%` } as React.CSSProperties}
              />
            </div>
          )}
        </div>

        <div className="mic-toggle-container">
          <input
            type="checkbox"
            id="micCheckboxInput"
            checked={isListening}
            onChange={toggleListening}
            disabled={isProcessing}
          />
          <label
            htmlFor="micCheckboxInput"
            className={`micToggleSwitch clickable ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isListening ? "Stop listening" : "Start listening"}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            <div className="mic">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
            <div className="mic-off">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
          </label>
        </div>
      </div>

      {isProcessing && (
        <div className="bg-black/70 text-white p-2 rounded-lg backdrop-blur-md shadow-lg">
          <p className="text-xs">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;
