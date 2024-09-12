export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin",
    "/admin/comments",
    "/admin/register",
    "/admin/posts",
    "/admin/posts/write",
    "/admin/posts/manage",
  ],
};
