import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import VoiceControl from "./VoiceControl";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [botResponse, setBotResponse] = useState<string>("");
  const [showBotMessage, setShowBotMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate loading time for the 3D scene
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete, Spline scene should be visible now");
      
      // Mark animation as complete after an additional short delay
      // This will trigger the initial greeting from the robot
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle bot response
  const handleBotResponse = (response: string) => {
    setBotResponse(response);
    setShowBotMessage(true);

    // Hide the message after a longer delay to ensure users can read it
    // Especially important for initial language selection
    const messageTimeout = setTimeout(() => {
      setShowBotMessage(false);
    }, 12000); // 12 seconds for more time to read and respond
    
    return () => clearTimeout(messageTimeout);
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-primary">
            Loading experience...
          </p>
        </div>
      ) : (
        <>
          {/* 3D Scene wrapper with proper positioning */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Spline
              scene="https://prod.spline.design/gThPz1iTw0hN4kdk/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Bot response message bubble positioned to the side */}
          {showBotMessage && botResponse && (
            <div className="fixed sm:top-32 top-24 left-4 sm:left-8 md:left-16 lg:left-32 z-30 bg-black/80 text-white p-3 sm:p-4 rounded-xl max-w-[260px] sm:max-w-xs md:max-w-sm animate-fade-in shadow-lg border border-indigo-500/30">
              <div className="flex flex-col">
                <div className="text-indigo-300 text-xs mb-1">Robo says:</div>
                <p className="text-sm md:text-base leading-relaxed">{botResponse}</p>
              </div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 rotate-45 w-4 h-4 bg-black/80"></div>
            </div>
          )}

          {/* Voice control component with animation completion prop */}
          <VoiceControl 
            onBotResponse={handleBotResponse} 
            animationComplete={animationComplete}
          />

          {/* Dynamic instructions based on context */}
          <div className="absolute top-10 left-0 right-0 z-20 flex justify-center animate-fade-in">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full shadow-lg">
              <p className="text-sm">
                {showBotMessage 
                  ? "Respond to Robo by clicking the microphone" 
                  : "Click the microphone icon to talk with Robo"}
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center flex-wrap gap-4 px-4 animate-fade-in">
            {[
              { name: "About Me", path: "/about" },
              { name: "Skills", path: "/skills" },
              { name: "Projects", path: "/projects" },
              { name: "Portfolio", path: "/portfolio" },
              { name: "Blog", path: "/blog" },
              { name: "Testimonials", path: "/testimonials" },
              { name: "Contact Me", path: "/contact" },
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.path} 
                className="btn px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all"
              >
                {item.name}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
