import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Get blogs successful",
      data: blogs,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
