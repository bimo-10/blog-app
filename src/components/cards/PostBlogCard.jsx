"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export default function PostBlogCard() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutateAsync: createBlog, isLoading: isLoadingCreateBlog } =
    useMutation({
      mutationFn: async () => {
        const res = await axios.post("http://localhost:3000/api/blog/create", {
          title: form.getValues("title"),
          content: form.getValues("content"),
        });

        return res;
      },
      onSuccess: () => {
        form.reset({
          title: "",
          content: "",
        });

        router.push("/blog");
        queryClient.invalidateQueries(["blogs"]);
      },
    });

  const onSubmitBlog = (data) => {
    createBlog(data);
  };
  return (
    <div>
      <Card className="w-[480px] bg-base-100 shadow-xl">
        <CardHeader>
          <CardTitle>Post Blog</CardTitle>
          <CardDescription>Post your Blog</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmitBlog)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                cotrol={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Label>Content</Label>
                    <FormControl>
                      <Textarea placeholder="Content" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <CardFooter className="justify-end mt-4">
                <Button
                  type="submit"
                  className="w-24"
                  disabled={isLoadingCreateBlog}
                >
                  {isLoadingCreateBlog && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Post
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
