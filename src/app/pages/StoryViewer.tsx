import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { X, Heart, Send, MoreVertical, Pause, Play } from "lucide-react";

interface Story {
  id: string;
  image: string;
  timestamp: string;
  views: number;
}

export function StoryViewer() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messageText, setMessageText] = useState("");

  const stories: Story[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
      timestamp: "2h ago",
      views: 234,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1200&fit=crop",
      timestamp: "5h ago",
      views: 189,
    },
  ];

  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
            return 0;
          } else {
            navigate(-1);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, currentStoryIndex, navigate, stories.length]);

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const handleNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Image */}
      <div className="relative w-full max-w-[480px] h-full">
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width:
                    index < currentStoryIndex
                      ? "100%"
                      : index === currentStoryIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=10"
              alt={username}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <div>
              <p className="text-white font-semibold text-sm">{username}</p>
              <p className="text-white/80 text-xs">{currentStory.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsPaused(!isPaused)} className="text-white">
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
            </button>
            <button className="text-white">
              <MoreVertical className="w-6 h-6" />
            </button>
            <button onClick={() => navigate(-1)} className="text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Touch Areas for Navigation */}
        <div className="absolute inset-0 flex">
          <div className="flex-1" onClick={handlePrevious} />
          <div className="flex-1" onClick={handleNext} />
        </div>

        {/* Reply Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-4 py-3">
              <input
                type="text"
                placeholder={`Reply to ${username}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-transparent text-white placeholder-white/70 text-sm focus:outline-none"
              />
            </div>
            {messageText.trim() ? (
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white p-3 rounded-full"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="text-white p-3">
                <Heart className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Views Counter */}
        {username === "yourusername" && (
          <div className="absolute bottom-20 left-4 flex items-center gap-2 text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-sm font-medium">{currentStory.views}</span>
          </div>
        )}
      </div>
    </div>
  );
}
