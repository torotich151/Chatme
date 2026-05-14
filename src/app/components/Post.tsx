import { useState } from "react";
import { Heart, MessageCircle, Bookmark, MoreVertical, ThumbsUp, Share2, Flag } from "lucide-react";
import { Link } from "react-router";
import { MediaViewer } from "./MediaViewer";
import { ReportModal } from "./ReportModal";

interface PostProps {
  id: string;
  username: string;
  avatar: string;
  images: string[];
  likes: number;
  caption: string;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export function Post({
  id,
  username,
  avatar,
  images,
  likes,
  caption,
  comments,
  timestamp,
  isLiked = false,
  isSaved = false,
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likesCount, setLikesCount] = useState(likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={`/user/${username}`} className="flex items-center gap-3">
          <div className="relative">
            <img
              src={avatar}
              alt={username}
              className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <span className="font-semibold text-gray-900 block">{username}</span>
            <span className="text-xs text-gray-500">{timestamp} • 🌍</span>
          </div>
        </Link>
        <button
          onClick={() => setShowPostOptions(!showPostOptions)}
          className="text-gray-700 relative"
        >
          <MoreVertical className="w-5 h-5" />
          {showPostOptions && (
            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg py-2 w-48 z-10">
              <button
                onClick={() => {
                  setShowReportModal(true);
                  setShowPostOptions(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-red-500"
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium">Report</span>
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                <Bookmark className="w-4 h-4" />
                <span className="text-sm font-medium">Save</span>
              </button>
            </div>
          )}
        </button>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal onClose={() => setShowReportModal(false)} type="post" />
      )}

      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800 whitespace-pre-line">{caption}</p>
      </div>

      {/* Images */}
      <div
        className="relative cursor-pointer"
        onDoubleClick={handleDoubleTap}
        onClick={() => setShowMediaViewer(true)}
      >
        <img
          src={images[currentImageIndex]}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? "bg-[#E91E63]" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Media Viewer Modal */}
      {showMediaViewer && (
        <MediaViewer
          images={images}
          initialIndex={currentImageIndex}
          onClose={() => setShowMediaViewer(false)}
          username={username}
          avatar={avatar}
        />
      )}

      {/* Reaction Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center -space-x-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <ThumbsUp className="w-3 h-3 text-white fill-white" />
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white fill-white" />
            </div>
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">
              😂
            </div>
          </div>
          <span className="text-sm text-gray-700 ml-2">{likesCount} Likes</span>
          <span className="text-sm text-gray-500 ml-auto">{comments} Comments</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around border-t border-gray-100 pt-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              liked ? "text-[#E91E63]" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? "fill-[#E91E63]" : ""}`} />
            <span className="font-medium text-sm">Like</span>
          </button>
          <Link
            to={`/post/${id}`}
            className="flex items-center gap-2 text-[#E91E63] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Comment</span>
          </Link>
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              saved ? "text-[#E91E63]" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-[#E91E63]" : ""}`} />
            <span className="font-medium text-sm">Save</span>
          </button>
        </div>
      </div>

      {/* Comments Preview */}
      {comments > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-start gap-3 mb-2">
            <img
              src="https://i.pravatar.cc/150?img=20"
              alt="Commenter"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-gray-900">Lusine</span>{" "}
                <span className="text-gray-700">Beautiful view! 😍</span>
              </p>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span>1h</span>
                <button className="font-medium">Like</button>
                <button className="font-medium">Reply</button>
                <div className="flex items-center gap-1 ml-auto">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={`/post/${id}`}
            className="text-sm font-medium text-[#E91E63] hover:text-[#C2185B] block"
          >
            View all {comments} comments
          </Link>
        </div>
      )}
    </div>
  );
}
