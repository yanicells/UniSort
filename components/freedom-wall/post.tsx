import { formatDistanceToNow } from "date-fns";

interface PostProps {
  id: string;
  content: string;
  tags: string[];
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  createdAt: Date;
}

export function Post({ id, content, tags, reactions, createdAt }: PostProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Tags */}
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-800 whitespace-pre-wrap">{content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
        <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>

        {/* Reactions */}
        <div className="flex gap-3">
          {Object.entries(reactions).map(
            ([reaction, count]) =>
              count > 0 && (
                <span key={reaction} className="flex items-center gap-1">
                  <span className="text-gray-600">
                    {getReactionEmoji(reaction)}
                  </span>
                  <span className="text-xs">{count}</span>
                </span>
              )
          )}
        </div>
      </div>
    </div>
  );
}

function getReactionEmoji(reaction: string): string {
  const emojis: Record<string, string> = {
    like: "👍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    sad: "😢",
    angry: "😠",
  };
  return emojis[reaction] || "";
}
