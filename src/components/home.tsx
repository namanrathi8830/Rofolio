import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import VoiceControl from "./VoiceControl";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [botResponse, setBotResponse] = useState<string>("");
  const [showBotMessage, setShowBotMessage] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete, Spline scene should be visible now");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle bot response
  const handleBotResponse = (response: string) => {
    setBotResponse(response);
    setShowBotMessage(true);

    // Hide the message after a delay
    setTimeout(() => {
      setShowBotMessage(false);
    }, 8000); // 8 seconds should be enough for most responses to be spoken
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
          <div className="absolute inset-0 z-10">
            <Spline
              scene="https://prod.spline.design/gThPz1iTw0hN4kdk/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Bot response message bubble */}
          {showBotMessage && botResponse && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 bg-black/80 text-white p-4 rounded-xl max-w-md animate-fade-in">
              <p className="text-sm md:text-base">{botResponse}</p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black/80 rotate-45"></div>
            </div>
          )}

          {/* Voice control component */}
          <VoiceControl onBotResponse={handleBotResponse} />

          {/* Instructions for users */}
          <div className="absolute top-10 left-0 right-0 z-20 flex justify-center animate-fade-in">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full">
              <p className="text-sm">
                Click the microphone icon to talk with Robo
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
              <a key={item.name} href={item.path} className="btn">
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
