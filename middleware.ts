import { clerkMiddleware } from '@clerk/nextjs/server';
// import { clerkMiddleware } from '@clerk/nextjs';

export default clerkMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/sso-callback", "/landing"],
  ignoredRoutes: ["/api/webhook"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
