import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Get the user session
    const { data: { session } } = await supabase.auth.getSession();
    const user = await supabase.auth.getUser();

    console.log('Middleware session:', session);
    console.log('Middleware user:', user);

    // Protected routes - redirect to login if not authenticated
    if (pathname.startsWith("/post") && !session) {
      console.log('Redirecting to login - no session found');
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // CORS headers for API routes
    if (pathname.startsWith("/api/")) {
      response.headers.append("Access-Control-Allow-Credentials", "true");
      response.headers.append("Access-Control-Allow-Origin", "*");
      response.headers.append(
        "Access-Control-Allow-Methods",
        "GET,DELETE,PATCH,POST,PUT"
      );
      response.headers.append(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      );
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    // If there's an error, still protect the routes
    if (pathname.startsWith("/post")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/post/:path*",
  ],
};