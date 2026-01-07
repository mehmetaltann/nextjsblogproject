import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {});

export const config = {
  matcher: ["/admin", "/admin/register", "/admin/categories", "/admin/write"],
};
