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
import { Checkbox } from "@/components/ui/checkbox";
import { TiptapEditor } from "@/components/editor/TiptapEditor";
import { createPostAction } from "@/lib/actions/post-actions";
import { useRouter } from "next/navigation";
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

export function PostForm() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
      imageUrl: uploadedImage || undefined,
    });
    if (result.success) {
      form.reset();
      setUploadedImage(null);
      router.push("/freedom-wall");
    } else {
      console.error(result.error);
    }
  }

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="card space-y-6 p-6 shadow-sm"
      >
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Post details</h2>
          <p className="text-sm text-foreground/60">
            Keep it concise and respectful. You can add an optional image.
          </p>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post</FormLabel>
              <FormControl>
                <TiptapEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Share your story or question..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Universities</FormLabel>
              <p className="text-xs text-foreground/60 mb-2">
                Pick at least one so people know who it’s for.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tagOptions.map((tag) => (
                  <FormField
                    key={tag}
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 rounded-md border border-border px-3 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tag)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, tag])
                                : field.onChange(
                                    field.value?.filter((v) => v !== tag)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {tag.toUpperCase()}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel>Image (optional)</FormLabel>
            <span className="text-xs text-foreground/60">
              JPG, PNG up to 5MB
            </span>
          </div>
          {uploadedImage && (
            <div className="w-full relative group">
              <img
                src={uploadedImage}
                alt="Upload preview"
                className="w-full max-h-64 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {!uploadedImage && (
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
                  "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer",
                container: "w-full",
                allowedContent: "text-gray-600 text-sm",
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/freedom-wall")}
          >
            Cancel
          </Button>
          <Button type="submit">Post</Button>
        </div>
      </form>
    </Form>
  );
}
