"use client";

import DOMPurify from "isomorphic-dompurify";

interface PostContentProps {
  content: string;
  className?: string;
}

export function PostContent({ content, className }: PostContentProps) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
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
  });

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
