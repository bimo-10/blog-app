import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const body = await request.json();
  const id = params.id;

  try {
    const existingBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlog) {
      return NextResponse.json({
        status: 404,
        message: "Blog not found",
      });
    }

    const res = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Update blog successful",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
