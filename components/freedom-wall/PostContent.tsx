"use client";

import { useEffect, useState } from "react";

interface PostContentProps {
  content: string;
  className?: string;
}

// Allowed tags and attributes for DOMPurify
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "s",
    "ul",
    "ol",
    "li",
    "blockquote",
    "hr",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
  ],
  ALLOWED_ATTR: ["href", "target", "rel"],
};

export function PostContent({ content, className }: PostContentProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import DOMPurify only on client
    import("dompurify").then((DOMPurify) => {
      const clean = DOMPurify.default.sanitize(content, PURIFY_CONFIG);
      setSanitizedContent(clean);
    });
  }, [content]);

  // Show raw text (stripped of HTML) during SSR and initial hydration
  if (!isClient) {
    const textContent = content.replace(/<[^>]*>/g, "");
    return (
      <div
        className={className || "prose prose-sm max-w-none text-foreground"}
        style={{ wordBreak: "break-word" }}
      >
        {textContent}
      </div>
    );
  }

  return (
    <div
      className={className || "prose prose-sm max-w-none text-foreground"}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{
        wordBreak: "break-word",
      }}
    />
  );
}
