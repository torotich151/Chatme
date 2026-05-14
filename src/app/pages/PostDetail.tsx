import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Heart, MoreVertical, Smile, Image as ImageIcon, ThumbsUp, MessageCircle, Bookmark } from "lucide-react";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  isAuthor?: boolean;
  replies?: Comment[];
}

export function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  const [comments] = useState<Comment[]>([
    {
      id: "1",
      username: "Lusine",
      avatar: "https://i.pravatar.cc/150?img=4",
      text: "Beautiful view! 😍",
      likes: 12,
      timestamp: "2h",
      replies: [
        {
          id: "1-1",
          username: "Armenam",
          avatar: "https://i.pravatar.cc/150?img=30",
          text: "Thank you so much! ❤️",
          likes: 5,
          timestamp: "2h",
          isAuthor: true,
        },
      ],
    },
    {
      id: "2",
      username: "David",
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "This is amazing! 🔥",
      likes: 8,
      timestamp: "1h",
    },
    {
      id: "3",
      username: "Ani",
      avatar: "https://i.pravatar.cc/150?img=6",
      text: "Love the colors! 🌅",
      likes: 3,
      timestamp: "1h",
    },
    {
      id: "4",
      username: "Narek",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "Where is this place?",
      likes: 0,
      timestamp: "2h",
      replies: [
        {
          id: "4-1",
          username: "Armenam",
          avatar: "https://i.pravatar.cc/150?img=30",
          text: "It's in Montenegro 🇲🇪",
          likes: 4,
          timestamp: "2h",
          isAuthor: true,
        },
      ],
    },
    {
      id: "5",
      username: "Mari",
      avatar: "https://i.pravatar.cc/150?img=20",
      text: "So peaceful! 🧡",
      likes: 2,
      timestamp: "3h",
    },
  ]);

  const handlePostComment = () => {
    if (commentText.trim()) {
      console.log("Posting comment:", commentText);
      setCommentText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107] pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg flex-1">Comments</h1>
      </header>

      {/* Comments Container */}
      <div className="bg-white rounded-t-3xl mt-4 mx-4 shadow-xl">
        {/* Post Summary */}
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
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
            <span className="text-sm text-gray-700 ml-1">128 Likes</span>
            <span className="text-sm text-gray-500 ml-auto">24 Comments</span>
          </div>
        </div>

        {/* Comments List */}
        <div className="px-4 py-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {comment.username}
                        </span>
                        {comment.isAuthor && (
                          <span className="text-xs font-semibold text-[#E91E63] bg-pink-50 px-2 py-0.5 rounded">
                            Author
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-800">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <button className="font-medium hover:text-gray-700">Like</button>
                        <button className="font-medium hover:text-gray-700">Reply</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      {comment.likes > 0 && (
                        <>
                          <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                          <span className="text-xs">{comment.likes}</span>
                        </>
                      )}
                      {comment.likes === 0 && (
                        <Heart className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <>
                      {!showReplies[comment.id] && (
                        <button
                          onClick={() => setShowReplies({ ...showReplies, [comment.id]: true })}
                          className="text-sm font-medium text-[#E91E63] mt-2 flex items-center gap-1"
                        >
                          View {comment.replies.length} more {comment.replies.length === 1 ? "reply" : "replies"}
                        </button>
                      )}
                      {showReplies[comment.id] && (
                        <div className="mt-3 ml-0 border-l-2 border-gray-200 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 mb-3">
                              <img
                                src={reply.avatar}
                                alt={reply.username}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-gray-900">
                                    {reply.username}
                                  </span>
                                  {reply.isAuthor && (
                                    <span className="text-xs font-semibold text-[#E91E63] bg-pink-50 px-2 py-0.5 rounded">
                                      Author
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-800">{reply.text}</p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                  <button className="font-medium">Like</button>
                                  <button className="font-medium">Reply</button>
                                  {reply.likes > 0 && (
                                    <div className="flex items-center gap-1 ml-auto">
                                      <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                                      <span>{reply.likes}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => setShowReplies({ ...showReplies, [comment.id]: false })}
                            className="text-sm font-medium text-[#E91E63]"
                          >
                            Hide replies
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=30"
              alt="Your avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button className="text-gray-400">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-400">
                <Smile className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
