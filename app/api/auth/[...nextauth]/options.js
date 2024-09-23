import CredentialsProvider from "next-auth/providers/credentials";
import brcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email " },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await brcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    signOut: "/home",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 gün
  },
};
