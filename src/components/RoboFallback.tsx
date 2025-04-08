import { useState } from "react";
import VoiceControl from "./VoiceControl";

const RoboFallback = () => {
  const [botResponse, setBotResponse] = useState<string>("");
  const [showBotMessage, setShowBotMessage] = useState(false);

  // Handle bot response
  const handleBotResponse = (response: string) => {
    setBotResponse(response);
    setShowBotMessage(true);

    // Hide the message after a delay
    setTimeout(() => {
      setShowBotMessage(false);
    }, 8000);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Static robot representation */}
      <div className="relative w-64 h-64 bg-blue-500 rounded-full mb-8 glow animate-pulse-slow">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white rounded-full"></div>
      </div>

      {/* Bot response message bubble */}
      {showBotMessage && botResponse && (
        <div className="bg-white/90 text-black p-4 rounded-xl max-w-md animate-fade-in mb-8">
          <p className="text-sm md:text-base">{botResponse}</p>
        </div>
      )}

      {/* Voice control component */}
      <VoiceControl onBotResponse={handleBotResponse} />

      {/* Instructions for users */}
      <div className="mt-8 text-center text-white">
        <p className="text-xl font-bold mb-2">I'm Robo, your AI assistant</p>
        <p className="text-sm mb-6">
          Click the microphone icon to talk with me
        </p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center flex-wrap gap-4 px-4 animate-fade-in">
        {[
          "About Me",
          "Skills & Services",
          "Projects / Portfolio",
          "Blog",
          "Testimonials / Client Feedback",
          "Contact Me",
        ].map((item) => (
          <button
            key={item}
            className="px-4 py-2 bg-[#1A1A1A] text-white rounded-full hover:shadow-[0_0_15px_rgba(31,142,241,0.5)] transition-all duration-300 text-sm md:text-base md:px-6 md:py-3"
          >
            {item}
          </button>
        ))}
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 25px 5px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </div>
  );
};

export default RoboFallback;
