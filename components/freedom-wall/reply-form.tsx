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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createPostAction } from "@/lib/actions/post-actions";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { X } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(2000),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
  imageUrl: z.string().optional(),
});

interface ReplyModalProps {
  parentId: string;
  onClose: () => void;
}

export function ReplyModal({ parentId, onClose }: ReplyModalProps) {
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
      parentId,
      imageUrl: uploadedImage || undefined,
    });
    if (result.success) {
      form.reset();
      setUploadedImage(null);
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
      <div className="w-full max-w-lg rounded-md bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Reply</h2>
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reply</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your reply..." {...field} />
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
                  <FormLabel>Tags</FormLabel>
                  <div className="space-y-2">
                    {tagOptions.map((tag) => (
                      <FormField
                        key={tag}
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag)}
                                onCheckedChange={(checked) => {
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
              <FormLabel>Image (optional)</FormLabel>
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

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Post Reply</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
