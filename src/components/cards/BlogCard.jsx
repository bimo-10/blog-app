"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import UpdateBlogDialog from "../dialogs/UpdateBlogDialog";
import DeleteBlogAlertDialog from "../alert-dialogs/DeleteBlogAlertDialog";

export default function BlogCard() {
  const {
    data: getBlogs,
    isPending: isPendingGetBlogs,
    isFetching: isFetchingGetBlogs,
    isLoading: isLoadingGetBlogs,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/blog");
      const data = await res.data;
      return data;
    },
  });

  return (
    <>
      {isPendingGetBlogs || (isFetchingGetBlogs && <div>Loading...</div>)}
      {isLoadingGetBlogs ? (
        <Card className="w-80 bg-base-100 shadow-xl">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-32" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-72 " />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-60" />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            <Button variant="destructive" size="sm">
              Delete
            </Button>
            <Button size="sm">Edit</Button>
          </CardFooter>
        </Card>
      ) : (
        getBlogs?.data.map((blog) => {
          return (
            <Card className="bg-base-100 shadow-xl" key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2 ">
                  <p>{blog.content}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-end items-end gap-4">
                <DeleteBlogAlertDialog blogId={blog.id} />
                <UpdateBlogDialog blog={blog} />
              </CardFooter>
            </Card>
          );
        })
      )}
    </>
  );
}
