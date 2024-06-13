import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const res = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Create blog successful",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
