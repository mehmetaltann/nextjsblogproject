export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin",
    "/admin/comments",
    "/admin/register",
    "/admin/categories",
    "/admin/write",
  ],
};
