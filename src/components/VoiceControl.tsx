import { useState, useEffect } from "react";
import { sendMessageToOpenAI, speakWithRobotVoice } from "../utils/openai";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface VoiceControlProps {
  onBotResponse?: (response: string) => void;
}

const VoiceControl = ({ onBotResponse }: VoiceControlProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );

  // Initialize speech recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

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

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognition.start();
      setIsListening(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleUserVoiceInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsProcessing(true);

    try {
      const response = await sendMessageToOpenAI(userInput);

      // Notify parent component about the response
      if (onBotResponse) {
        onBotResponse(response);
      }

      // Speak the response if not muted
      if (!isMuted) {
        speakWithRobotVoice(response);
      }
    } catch (error) {
      console.error("Error processing voice input:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-10 z-50 flex flex-col items-end space-y-4">
      {transcript && (
        <div className="bg-black/70 text-white p-3 rounded-lg max-w-xs">
          <p className="text-sm">{transcript}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <div className="speaker-toggle-container">
          <input
            type="checkbox"
            id="checkboxInput"
            checked={isMuted}
            onChange={toggleMute}
          />
          <label htmlFor="checkboxInput" className="toggleSwitch">
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
                <path
                  d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: 5,
                    strokeLinecap: "round",
                  }}
                ></path>
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
            className={`micToggleSwitch ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isListening ? "Stop listening" : "Start listening"}
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
        <div className="bg-black/70 text-white p-2 rounded-lg">
          <p className="text-xs">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;

// Add TypeScript definitions for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
