"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
} from "lucide-react";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Write something...",
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, // Disable headings to keep it simple
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] max-h-[500px] overflow-y-auto p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-1 sm:p-2 flex flex-wrap gap-0.5 sm:gap-1 sticky top-0 z-10">
        {/* Text Formatting Group */}
        <div className="flex gap-0.5 sm:gap-1 pr-1 sm:pr-2 border-r border-gray-300">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
            icon={<Bold className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
            icon={<Italic className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough (Ctrl+Shift+S)"
            icon={<Strikethrough className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
        </div>

        {/* Lists Group */}
        <div className="flex gap-0.5 sm:gap-1 pr-1 sm:pr-2 border-r border-gray-300">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
            icon={<List className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
            icon={<ListOrdered className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
        </div>

        {/* Block Elements Group */}
        <div className="flex gap-0.5 sm:gap-1 pr-1 sm:pr-2 border-r border-gray-300">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
            icon={<Quote className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            isActive={false}
            title="Horizontal Rule"
            icon={<Minus className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
        </div>

        {/* History Group */}
        <div className="flex gap-0.5 sm:gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            disabled={!editor.can().undo()}
            title="Undo"
            icon={<Undo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            disabled={!editor.can().redo()}
            title="Redo"
            icon={<Redo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
          />
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  title: string;
  icon: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled = false,
  title,
  icon,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-1.5 sm:p-2 rounded transition-colors
        ${
          isActive
            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
            : "text-gray-700 hover:bg-gray-200"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {icon}
    </button>
  );
}
