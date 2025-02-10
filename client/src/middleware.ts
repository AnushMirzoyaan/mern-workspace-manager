import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { pageUrls, publicPaths } from "@/utils/pageUrls ";
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  const token = request.cookies.get("accessToken")?.value;
  const dynamicPublicPathsRegex = new RegExp(
    `^(${publicPaths.join("|")})(/[^/]+)?$`
  );

  if (!token && !dynamicPublicPathsRegex.test(pathname)) {
    request.nextUrl.pathname = pageUrls.signIn;
    return NextResponse.redirect(request.nextUrl);
  }

  if (token && dynamicPublicPathsRegex.test(pathname)) {
    request.nextUrl.pathname = pageUrls.workspaceManager;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    Object.values(pageUrls)
      .map((url) => `"${url}"`)
      .join(","),
  ],
};
