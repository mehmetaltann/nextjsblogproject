export const runtime = "nodejs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const { default: dbConnect } = await import("@/lib/config/dbConnect");
        const { default: UserModel } = await import("@/lib/models/UserModel");
        const bcrypt = await import("bcryptjs");

        await dbConnect();
        const user = await UserModel.findOne({ email });

        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
    signOut: "/home",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export const { GET, POST } = handlers;
export { auth, signIn, signOut };
