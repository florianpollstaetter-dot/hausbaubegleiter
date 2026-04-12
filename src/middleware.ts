import { NextRequest, NextResponse } from "next/server";

// For MVP, middleware is minimal — just pass through.
// Auth + subscription checks will be added in Phase 2 with Supabase.

export async function middleware(request: NextRequest) {
  return NextResponse.next({
    request: { headers: request.headers },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
};
