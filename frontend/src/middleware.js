import { isAuthPages } from "./utils/isAuthPages";
import { verifyJwtToken } from "./utils/verifyJwtToken";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("authToken") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("authToken");
      return response;
    }
    const response = NextResponse.redirect(new URL("/predict", url));
    return response;
  }

  if (!hasVerifiedToken) {
    const response = NextResponse.redirect(
      new URL("/auth/login", url)
    );
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
