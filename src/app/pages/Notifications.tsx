import { useState } from "react";
import { Heart } from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    username: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  postImage?: string;
  isFollowing?: boolean;
}

export function Notifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      user: {
        username: "john_doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      message: "liked your post.",
      timestamp: "2h",
      postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop",
    },
    {
      id: "2",
      type: "follow",
      user: {
        username: "jane_smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      message: "started following you.",
      timestamp: "5h",
      isFollowing: false,
    },
    {
      id: "3",
      type: "comment",
      user: {
        username: "mike_wilson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      message: "commented: \"Amazing shot! 🔥\"",
      timestamp: "1d",
      postImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop",
    },
    {
      id: "4",
      type: "like",
      user: {
        username: "sarah_jones",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      message: "and 15 others liked your post.",
      timestamp: "2d",
      postImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop",
    },
    {
      id: "5",
      type: "mention",
      user: {
        username: "david_lee",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      message: "mentioned you in a comment.",
      timestamp: "3d",
      postImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
    },
  ]);

  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});

  const toggleFollow = (userId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-4 sticky top-0 z-40 shadow-lg">
        <h1 className="text-white font-bold text-2xl">Notifications</h1>
      </header>

      {/* Notifications List */}
      <div className="bg-white mt-4 mx-4 rounded-t-3xl shadow-xl pb-20">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <img
              src={notification.user.avatar}
              alt={notification.user.username}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold text-gray-900">{notification.user.username}</span>{" "}
                <span className="text-gray-700">{notification.message}</span>{" "}
                <span className="text-gray-400">{notification.timestamp}</span>
              </p>
            </div>
            {notification.postImage && (
              <img
                src={notification.postImage}
                alt="Post"
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              />
            )}
            {notification.type === "follow" && (
              <button
                onClick={() => toggleFollow(notification.id)}
                className={`px-6 py-2 rounded-xl font-semibold text-sm flex-shrink-0 transition-all ${
                  followingStates[notification.id]
                    ? "bg-gray-100 text-gray-700"
                    : "bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white shadow-md"
                }`}
              >
                {followingStates[notification.id] ? "Following" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
