import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeleteBlogAlertDialog({ blogId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBlog, isLoading: isLoadingDeleteBlog } =
    useMutation({
      mutationFn: async (id) => {
        const res = await axios.delete(
          `http://localhost:3000/api/blog/delete/${id}`
        );
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["blogs"]);
      },
    });

  const onSubmitDeleteBlog = () => {
    deleteBlog(blogId);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={onSubmitDeleteBlog}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
