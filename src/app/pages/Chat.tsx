import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, Phone, Video, MoreVertical, Image, Smile,
  Send, Mic, MicOff, X, Play, Paperclip, Camera,
} from "lucide-react";
import { pickImageFromGallery } from "../services/capacitor";

interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  audioDuration?: number;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
}

export function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey! How are you doing?", timestamp: "10:30 AM", isSent: false },
    { id: "2", text: "I'm doing great! Thanks for asking 😊", timestamp: "10:32 AM", isSent: true, status: "read" },
    { id: "3", text: "That's awesome! Did you see my new post?", timestamp: "10:33 AM", isSent: false },
    { id: "4", text: "Yes! It looks amazing. Where was that taken?", timestamp: "10:35 AM", isSent: true, status: "read" },
    { id: "5", text: "Montenegro! It's so beautiful there 🌅", timestamp: "10:36 AM", isSent: false },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setMessageText("");
  };

  const handleSendImage = async () => {
    setShowAttachMenu(false);
    const dataUrl = await pickImageFromGallery();
    if (!dataUrl) return;
    const msg: Message = {
      id: Date.now().toString(),
      imageUrl: dataUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const msg: Message = {
          id: Date.now().toString(),
          audioUrl: url,
          audioDuration: recordingSeconds,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isSent: true,
          status: "sent",
        };
        setMessages((prev) => [...prev, msg]);
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimer.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } catch {
      alert("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
      recordingTimer.current = null;
    }
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-[480px] mx-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Lusine</h2>
            <p className="text-xs text-white/80">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white">
            <Phone className="w-5 h-5" />
          </button>
          <button className="text-white">
            <Video className="w-5 h-5" />
          </button>
          <button className="text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E91E63' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
            {!msg.isSent && (
              <img src="https://i.pravatar.cc/150?img=1" alt="" className="w-7 h-7 rounded-full mr-2 self-end flex-shrink-0 object-cover" />
            )}
            <div className={`max-w-[75%] ${msg.isSent ? "items-end" : "items-start"} flex flex-col`}>
              {msg.text && (
                <div
                  className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                    msg.isSent
                      ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              )}
              {msg.imageUrl && (
                <div className={`rounded-2xl overflow-hidden shadow-sm ${msg.isSent ? "rounded-br-sm" : "rounded-bl-sm"}`}>
                  <img src={msg.imageUrl} alt="shared" className="max-w-[200px] max-h-[200px] object-cover" />
                </div>
              )}
              {msg.audioUrl && (
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-sm min-w-[180px] ${
                    msg.isSent
                      ? "bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-br-sm"
                      : "bg-white rounded-bl-sm"
                  }`}
                >
                  <button
                    onClick={() => {
                      const audio = new Audio(msg.audioUrl);
                      audio.play();
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isSent ? "bg-white/20" : "bg-pink-100"}`}
                  >
                    <Play className={`w-4 h-4 ml-0.5 ${msg.isSent ? "text-white" : "text-[#E91E63]"}`} fill="currentColor" />
                  </button>
                  <div className="flex-1 flex items-center gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full ${msg.isSent ? "bg-white/60" : "bg-gray-300"}`}
                        style={{ height: `${4 + Math.random() * 12}px` }}
                      />
                    ))}
                  </div>
                  <span className={`text-xs ${msg.isSent ? "text-white/80" : "text-gray-500"}`}>
                    {formatDuration(msg.audioDuration || 0)}
                  </span>
                </div>
              )}
              <div className={`flex items-center gap-1 mt-1 ${msg.isSent ? "justify-end" : ""}`}>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
                {msg.isSent && msg.status === "read" && (
                  <span className="text-xs text-blue-400">✓✓</span>
                )}
                {msg.isSent && msg.status === "delivered" && (
                  <span className="text-xs text-gray-400">✓✓</span>
                )}
                {msg.isSent && msg.status === "sent" && (
                  <span className="text-xs text-gray-400">✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-3 py-2 flex-shrink-0">
        {isRecording ? (
          <div className="flex items-center gap-3">
            <button onClick={stopRecording} className="text-red-500">
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1 bg-red-50 rounded-full px-4 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-medium text-sm">Recording {formatDuration(recordingSeconds)}</span>
            </div>
            <button
              onClick={stopRecording}
              className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <div className="relative">
              <button
                className="text-[#E91E63] p-1"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[160px] z-20">
                  <button
                    onClick={handleSendImage}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <Image className="w-5 h-5 text-[#E91E63]" />
                    <span className="text-sm font-medium">Gallery</span>
                  </button>
                  <button
                    onClick={() => setShowAttachMenu(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700"
                  >
                    <Camera className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Camera</span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 placeholder-gray-500 resize-none max-h-28"
                rows={1}
              />
              <button className="text-gray-400 flex-shrink-0">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            {messageText.trim() ? (
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center shadow-md flex-shrink-0"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onMouseDown={startRecording}
                className="w-10 h-10 bg-gradient-to-r from-[#E91E63] to-[#FF5722] rounded-full flex items-center justify-center shadow-md flex-shrink-0"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
