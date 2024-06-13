import BlogCard from "@/components/cards/BlogCard";
import React from "react";

export default function BlogPage() {
  return (
    <main className="flex justify-between items-center mx-auto p-24">
      <div className="grid grid-cols-3 gap-4 w-full">
        <BlogCard />
      </div>
    </main>
  );
}
