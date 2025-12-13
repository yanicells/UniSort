"use client";

import DOMPurify from "dompurify";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
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
    ],
    ALLOWED_ATTR: [],
  });

  return (
    <div
      className="prose prose-sm max-w-none text-gray-800"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{
        wordBreak: "break-word",
      }}
    />
  );
}
