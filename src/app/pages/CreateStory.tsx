import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Type, Smile, Image as ImageIcon, Video, Music, Palette, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const STORY_THEMES = [
  { id: 1, name: "Sunset", gradient: "linear-gradient(135deg, #E91E63, #FF5722)" },
  { id: 2, name: "Ocean", gradient: "linear-gradient(135deg, #2196F3, #00BCD4)" },
  { id: 3, name: "Purple Dream", gradient: "linear-gradient(135deg, #9C27B0, #E91E63)" },
  { id: 4, name: "Fire", gradient: "linear-gradient(135deg, #FF5722, #FFC107)" },
  { id: 5, name: "Forest", gradient: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
  { id: 6, name: "Autumn", gradient: "linear-gradient(135deg, #FF9800, #FF5722)" },
  { id: 7, name: "Night Sky", gradient: "linear-gradient(135deg, #1A237E, #512DA8)" },
  { id: 8, name: "Cherry Blossom", gradient: "linear-gradient(135deg, #F48FB1, #FCE4EC)" },
  { id: 9, name: "Mint", gradient: "linear-gradient(135deg, #00BFA5, #B2DFDB)" },
  { id: 10, name: "Peach", gradient: "linear-gradient(135deg, #FFAB91, #FFE0B2)" },
  { id: 11, name: "Lavender", gradient: "linear-gradient(135deg, #7E57C2, #B39DDB)" },
  { id: 12, name: "Rose Gold", gradient: "linear-gradient(135deg, #EC407A, #F8BBD0)" },
];

const TEXT_COLORS = [
  "#FFFFFF", "#000000", "#E91E63", "#9C27B0", "#2196F3",
  "#4CAF50", "#FFC107", "#FF5722", "#795548", "#607D8B"
];

const FONT_FAMILIES = [
  "Arial", "Georgia", "Courier New", "Comic Sans MS", "Impact",
  "Times New Roman", "Verdana", "Trebuchet MS", "Brush Script MT", "Lucida Console"
];

export function CreateStory() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [storyText, setStoryText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(STORY_THEMES[0]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center");
  const [showTextTools, setShowTextTools] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const handleImageSelect = () => {
    const placeholderImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop";
    setSelectedImage(placeholderImage);
  };

  const handlePost = () => {
    console.log("Posting story:", { image: selectedImage, text: storyText, theme: selectedTheme });
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full max-w-[480px] h-full mx-auto">
        {/* Story Preview */}
        <div
          className="w-full h-full flex items-center justify-center p-8"
          style={{
            background: selectedImage ? `url(${selectedImage})` : selectedTheme.gradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!selectedImage && storyText && (
            <div
              className="w-full"
              style={{
                textAlign: textAlign,
              }}
            >
              <p
                className="text-4xl font-bold break-words"
                style={{
                  color: textColor,
                  fontFamily: fontFamily,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {storyText}
              </p>
            </div>
          )}
          {selectedImage && storyText && (
            <div className="absolute bottom-32 left-0 right-0 px-8">
              <p
                className="text-2xl font-bold break-words"
                style={{
                  color: textColor,
                  fontFamily: fontFamily,
                  textAlign: textAlign,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {storyText}
              </p>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={() => navigate(-1)} className="text-white">
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold text-lg">Create Story</h1>
          <div className="w-6"></div>
        </div>

        {/* Tools */}
        <div className="absolute top-20 right-4 flex flex-col gap-3">
          <button
            onClick={() => {
              setShowTextTools(!showTextTools);
              setShowColorPicker(false);
              setShowFontPicker(false);
            }}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <Type className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowTextTools(false);
              setShowFontPicker(false);
            }}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <Palette className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <Smile className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <Music className="w-6 h-6" />
          </button>
        </div>

        {/* Text Alignment Tools */}
        {showTextTools && (
          <div className="absolute top-20 right-20 bg-black/80 backdrop-blur-sm rounded-2xl p-3 flex flex-col gap-2">
            <button
              onClick={() => setTextAlign("left")}
              className={`p-2 rounded-lg ${textAlign === "left" ? "bg-white/20" : ""}`}
            >
              <AlignLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setTextAlign("center")}
              className={`p-2 rounded-lg ${textAlign === "center" ? "bg-white/20" : ""}`}
            >
              <AlignCenter className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setTextAlign("right")}
              className={`p-2 rounded-lg ${textAlign === "right" ? "bg-white/20" : ""}`}
            >
              <AlignRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* Color Picker */}
        {showColorPicker && (
          <div className="absolute top-40 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    textColor === color ? "border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {!selectedImage && (
            <>
              {/* Text Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Type something..."
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 rounded-full px-6 py-3 text-center text-lg font-semibold focus:outline-none"
                  style={{ fontFamily: fontFamily }}
                />
              </div>

              {/* Font Selector */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setShowFontPicker(!showFontPicker);
                    setShowTextTools(false);
                    setShowColorPicker(false);
                  }}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full px-4 py-2 text-sm"
                >
                  Font: {fontFamily}
                </button>
                {showFontPicker && (
                  <div className="mt-2 bg-black/80 backdrop-blur-sm rounded-2xl max-h-48 overflow-y-auto">
                    {FONT_FAMILIES.map((font) => (
                      <button
                        key={font}
                        onClick={() => {
                          setFontFamily(font);
                          setShowFontPicker(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-white/10"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Gradients */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
                {STORY_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-12 h-12 rounded-full flex-shrink-0 border-2 ${
                      selectedTheme.id === theme.id ? "border-white" : "border-transparent"
                    }`}
                    style={{ background: theme.gradient }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Upload Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleImageSelect}
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              Photo
            </button>
            <button className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2">
              <Video className="w-5 h-5" />
              Video
            </button>
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            disabled={!selectedImage && !storyText.trim()}
            className={`w-full mt-3 font-bold py-3.5 rounded-full ${
              selectedImage || storyText.trim()
                ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white"
                : "bg-white/10 text-white/40"
            }`}
          >
            Share to Story
          </button>
        </div>
      </div>
    </div>
  );
}
