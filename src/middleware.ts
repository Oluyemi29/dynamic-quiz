"use server";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/Admin")) {
    if (!token || token?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname.startsWith("/dashboard")) {
    if (!token || token.email) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname.startsWith("/signIn") && token) {
    if (token.email === process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/Admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
};

export default middleware;
