"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { createPostAction } from "@/lib/actions/post-actions";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { X } from "lucide-react";

// Helper to strip HTML tags for validation
const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const formSchema = z.object({
  content: z
    .string()
    .refine(
      (val) => {
        const textContent = stripHtml(val).trim();
        return textContent.length >= 1;
      },
      { message: "Post cannot be empty" }
    )
    .refine(
      (val) => {
        const textContent = stripHtml(val);
        return textContent.length <= 2000;
      },
      { message: "Post must be less than 2000 characters" }
    ),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
  imageUrl: z.string().optional(),
});

interface PostModalProps {
  parentId?: string;
  onClose: () => void;
  onPostCreated?: () => void;
}

export function PostModal({
  parentId,
  onClose,
  onPostCreated,
}: PostModalProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const isReply = !!parentId;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: ["general"],
      imageUrl: undefined,
    },
  });

  const tagOptions = ["general", "admu", "dlsu", "up", "ust"];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await createPostAction({
      ...data,
      parentId,
      imageUrl: uploadedImage || undefined,
    });
    if (result.success) {
      form.reset();
      setUploadedImage(null);
      onPostCreated?.();
      onClose();
    } else {
      console.error(result.error);
    }
  }

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4">
      <div className="w-full max-w-3xl bg-white border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[95vh] overflow-hidden flex flex-col">
        {/* Newspaper Header */}
        <div className="bg-pink-600 border-b-2 sm:border-b-4 border-black p-3 sm:p-4 text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight italic">
            {isReply ? "Write a Reply" : "Breaking News!"}
          </h2>
          <div className="text-[10px] sm:text-xs font-mono font-bold text-pink-200 uppercase tracking-wider mt-1">
            {isReply
              ? "Continue the Conversation"
              : "Submit Your Anonymous Story"}
          </div>

          {/* Close Button */}
          <button
            type="button"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black text-white hover:bg-white hover:text-black transition-colors p-1.5 sm:p-2 border-2 border-white hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            onClick={onClose}
          >
            <X size={16} className="sm:w-5 sm:h-5 font-bold" />
          </button>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-slate-50">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] bg-white mt-2">
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder={
                            isReply
                              ? "Type your thoughts... be bold, be brave, be anonymous!"
                              : "Share your confession, rant, or shoutout... what's on your mind?"
                          }
                        />
                      </div>
                    </FormControl>
                    <div className="flex justify-between items-center mt-2 text-[10px] sm:text-xs font-mono">
                      <FormMessage className="text-red-600 font-bold" />
                      <span className="text-slate-600 font-bold bg-slate-200 px-2 py-1 border border-black text-[10px] sm:text-xs">
                        {stripHtml(field.value).length}/2000
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-black uppercase tracking-wide border-b-2 border-black pb-1 block">
                      🏷️ Campus Tags{" "}
                      <span className="text-[10px] sm:text-xs font-normal lowercase">
                        (pick your squad)
                      </span>
                    </FormLabel>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {tagOptions.map((tag) => (
                        <FormField
                          key={tag}
                          control={form.control}
                          name="tags"
                          render={({ field }) => {
                            const isSelected = field.value?.includes(tag);
                            const tagConfig = {
                              general: { bg: "#64748b", text: "#ffffff" },
                              admu: { bg: "#001196", text: "#ffffff" },
                              dlsu: { bg: "#00703c", text: "#ffffff" },
                              up: { bg: "#7b1113", text: "#ffffff" },
                              ust: { bg: "#fdb71a", text: "#000000" },
                            };
                            const config =
                              tagConfig[tag as keyof typeof tagConfig];

                            return (
                              <FormItem>
                                <FormControl>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const checked =
                                        !field.value?.includes(tag);
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            tag,
                                          ])
                                        : field.onChange(
                                            (field.value || []).filter(
                                              (v) => v !== tag
                                            )
                                          );
                                    }}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black font-black text-[10px] sm:text-xs uppercase transition-all hover:translate-y-[-2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    style={{
                                      backgroundColor: isSelected
                                        ? config.bg
                                        : "#ffffff",
                                      color: isSelected
                                        ? config.text
                                        : "#000000",
                                    }}
                                  >
                                    {isSelected && "✓ "}
                                    {tag.toUpperCase()}
                                  </button>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 sm:space-y-3">
                <FormLabel className="text-xs sm:text-sm font-black uppercase tracking-wide border-b-2 border-black pb-1 block">
                  📷 Add Photo{" "}
                  <span className="text-[10px] sm:text-xs font-normal lowercase">
                    (optional)
                  </span>
                </FormLabel>
                <div className="border-2 border-dashed border-black bg-white p-3 sm:p-4">
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Upload preview"
                        className="w-full max-h-64 object-cover border-2 border-black"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black text-white border-2 border-white font-black text-[10px] sm:text-xs uppercase px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            setUploadedImage(res[0].url);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                        appearance={{
                          button:
                            "bg-black text-white font-black text-[10px] sm:text-xs uppercase px-4 sm:px-6 py-2 sm:py-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer",
                          container: "flex",
                          allowedContent: "hidden",
                        }}
                      />
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                        📏 Max 4MB · 📸 JPG, PNG, WEBP
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-3 sm:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onClose}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black border-2 border-black font-black text-[10px] sm:text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
                >
                  ✕ Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white border-2 border-black font-black text-[10px] sm:text-xs uppercase shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] hover:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-y-[-2px] transition-all hover:bg-pink-600"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "📤 Publishing..."
                    : isReply
                    ? "📣 Post Reply"
                    : "📰 Publish Story"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
