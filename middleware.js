export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin",
    "/admin/register",
    "/admin/blogList",
    "/admin/addProduct",
    "/admin/subscription",
  ],
};
