import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    const res = await prisma.blog.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Delete blog successful",
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
