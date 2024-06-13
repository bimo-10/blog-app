import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export default function UpdateBlogDialog({ blog }) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  });

  const { mutateAsync: updateBlog, isLoading: isLoadingUpdateBlog } =
    useMutation({
      mutationFn: async (id) => {
        const res = await axios.put(
          `http://localhost:3000/api/blog/update/${id}`,
          {
            title: form.getValues("title"),
            content: form.getValues("content"),
          }
        );
        return res;
      },
      onSuccess: () => {
        form.reset({
          title: "",
          content: "",
        });
        queryClient.invalidateQueries(["blogs"]);

        setIsOpen(false);
      },
    });

  const onSubmitUpdateBlog = (data) => {
    updateBlog(blog.id);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button size="sm">Edit</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your blog</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              action=""
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmitUpdateBlog)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Title</Label>
                    <FormControl>
                      <Input id="title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="content">Content</Label>
                    <FormControl>
                      <Textarea id="content" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="my-4">
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-500">
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
