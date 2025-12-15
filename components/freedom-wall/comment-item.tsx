"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ReplyModal } from "./reply-form";
import { ReactionModal } from "./reaction-modal";
import { PostComment } from "./comment-types";
import { PostContent } from "./PostContent";
import { ImageLightbox } from "./image-lightbox";
import { cn } from "@/lib/utils";

type CommentItemProps = {
  comment: PostComment;
  canReply?: boolean;
  depth?: number; // Add depth for sizing
};

export function CommentItem({ comment, canReply = true, depth = 0 }: CommentItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const createdAt =
    comment.createdAt instanceof Date
      ? comment.createdAt
      : new Date(comment.createdAt);

  // Calculate sizes based on nesting depth
  const textSize = depth === 0 ? 'text-sm' : depth === 1 ? 'text-xs' : 'text-[11px]';
  const padding = depth === 0 ? 'px-3 pt-3 pb-2' : 'px-2.5 pt-2.5 pb-2';
  const footerPadding = depth === 0 ? 'px-3 pb-3 pt-2' : 'px-2.5 pb-2.5 pt-1.5';

  return (
    <article
      className={cn(
        "relative rounded-xl border border-border bg-white shadow-sm transition-all duration-200"
      )}
    >
      {/* Header: Tags + Timestamp */}
      <div className={padding}>
        <div className={cn("flex items-center gap-2 flex-wrap", textSize, "text-foreground/60")}>
          {comment.tags && comment.tags.length > 0 ? (
            <>
              {comment.tags.map((tag) => {
                const config = getTagConfig(tag);
                return (
                  <span
                    key={tag}
                    className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 font-medium", textSize)}
                    style={{
                      backgroundColor: config.bgColor,
                      color: config.textColor,
                    }}
                  >
                    {tag.toUpperCase()}
                  </span>
                );
              })}
              <span className="text-foreground/50">•</span>
            </>
          ) : null}
          <time className="text-foreground/60" dateTime={createdAt.toISOString()}>
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </time>
        </div>
      </div>

      {/* Content Body */}
      <div className={cn(padding.replace('pt-3', 'pt-0').replace('pt-2.5', 'pt-0'))}>
        <PostContent content={comment.content} />
      </div>

      {/* Image */}
      {comment.imageUrl && (
        <div className="px-3 pb-2">
          <img
            src={comment.imageUrl}
            alt="Comment image"
            className="w-full max-h-[300px] object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity border border-border/50"
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>
      )}

      {/* Footer: Engagement + Actions */}
      <div className={cn(footerPadding, "border-t border-border/50")}>
        <div className="flex items-center justify-between">
          {/* Left: Reactions */}
          <div className="flex items-center gap-2.5">
            {Object.entries(comment.reactions).map(
              ([reaction, count]) =>
                count > 0 && (
                  <span
                    key={reaction}
                    className={cn("flex items-center gap-1 transition-colors hover:opacity-80", textSize)}
                  >
                    {getReactionIcon(reaction, depth)}
                    <span className="font-medium text-foreground/70">
                      {count}
                    </span>
                  </span>
                )
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            {/* React Button */}
            <div className="relative">
              <button
                onClick={() => setShowReactionModal(true)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border border-border bg-background font-medium transition-colors hover:bg-accent hover:border-foreground/20",
                  depth === 0 ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs'
                )}
                title="Add reaction"
              >
                <svg
                  className={depth === 0 ? 'h-3.5 w-3.5' : 'h-3 w-3'}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </button>
              {showReactionModal && (
                <ReactionModal
                  postId={comment.id}
                  onClose={() => setShowReactionModal(false)}
                />
              )}
            </div>

            {/* Reply Button */}
            {canReply && (
              <button
                onClick={() => setShowReply(true)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border border-border bg-background font-medium transition-colors hover:bg-accent hover:border-foreground/20",
                  depth === 0 ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs'
                )}
              >
                <svg
                  className={depth === 0 ? 'h-3.5 w-3.5' : 'h-3 w-3'}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <span className="text-foreground/70">Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReply && canReply && (
        <ReplyModal
          parentId={comment.id}
          onClose={() => setShowReply(false)}
        />
      )}

      {/* Image Lightbox */}
      {comment.imageUrl && (
        <ImageLightbox
          src={comment.imageUrl}
          alt="Comment image"
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </article>
  );
}

function getReactionIcon(reaction: string, depth: number = 0): JSX.Element {
  const size = depth === 0 ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const icons: Record<string, JSX.Element> = {
    like: (
      <svg className={cn(size, "text-blue-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
      </svg>
    ),
    love: (
      <svg className={cn(size, "text-red-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
    haha: (
      <svg className={cn(size, "text-yellow-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
      </svg>
    ),
    wow: (
      <svg className={cn(size, "text-yellow-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z" clipRule="evenodd" />
      </svg>
    ),
    sad: (
      <svg className={cn(size, "text-yellow-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
      </svg>
    ),
    angry: (
      <svg className={cn(size, "text-red-600")} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
      </svg>
    ),
  };
  return icons[reaction] || icons.like;
}

interface TagConfig {
  bgColor: string;
  textColor: string;
}

function getTagConfig(tag: string): TagConfig {
  const configs: Record<string, TagConfig> = {
    admu: {
      bgColor: "#001196",
      textColor: "#ffffff",
    },
    dlsu: {
      bgColor: "#00703c",
      textColor: "#ffffff",
    },
    up: {
      bgColor: "#7b1113",
      textColor: "#ffffff",
    },
    ust: {
      bgColor: "#fdb71a",
      textColor: "#000000",
    },
    general: {
      bgColor: "#6b7280",
      textColor: "#ffffff",
    },
  };
  return configs[tag] || configs.general;
}
