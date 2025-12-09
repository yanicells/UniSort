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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  content: z.string().min(1, "Post cannot be empty").max(2000),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
});

export function PostForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      tags: ["general"],
    },
  });

  const tagOptions = ["general", "admu", "dlsu", "up", "ust"];

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await createPostAction(data);
    if (result.success) {
      form.reset();
      router.push("/freedom-wall");
    } else {
      console.error(result.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your post (markdown supported)..."
                  {...field}
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
              <FormLabel>Tags</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
}
