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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {isReply ? "Reply" : "Create Post"}
          </h2>
          <button
            type="button"
            className="text-foreground/60 hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder={
                        isReply
                          ? "Write your reply..."
                          : "Share your story or question..."
                      }
                    />
                  </FormControl>
                  <div className="flex justify-between items-center mt-1">
                    <FormMessage />
                    <span className="text-xs text-foreground/60">
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
                  <FormLabel>Tags</FormLabel>
                  <p className="text-xs text-foreground/60 mb-2">
                    Select at least one
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <FormField
                        key={tag}
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          const isSelected = field.value?.includes(tag);
                          const tagStyles = {
                            general: isSelected
                              ? "bg-foreground/10 border-foreground/30"
                              : "border-border",
                            admu: isSelected
                              ? "bg-[#001196]/10 border-[#001196] text-[#001196]"
                              : "border-border",
                            dlsu: isSelected
                              ? "bg-[#00703c]/10 border-[#00703c] text-[#00703c]"
                              : "border-border",
                            up: isSelected
                              ? "bg-[#7b1113]/10 border-[#7b1113] text-[#7b1113]"
                              : "border-border",
                            ust: isSelected
                              ? "bg-[#fdb71a]/10 border-[#fdb71a] text-[#fdb71a]"
                              : "border-border",
                          };

                          return (
                            <FormItem>
                              <FormControl>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const checked = !field.value?.includes(tag);
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
                                  className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition-all hover:scale-105 ${
                                    tagStyles[tag as keyof typeof tagStyles]
                                  }`}
                                >
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

            <div className="space-y-3">
              <div className="border-2 border-dashed border-border rounded-lg p-4">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Upload preview"
                      className="w-full max-h-64 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                            "bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5 rounded-md cursor-pointer transition-colors",
                          container: "flex",
                          allowedContent: "hidden",
                        }}
                      />
                      <span className="text-sm text-foreground/60">
                        Image (4MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Posting..."
                  : isReply
                  ? "Post Reply"
                  : "Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
