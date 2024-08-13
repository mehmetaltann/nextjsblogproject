import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import brcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import { ConnectDb } from "@/lib/config/db";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await ConnectDb();
          const user = await UserModel.findOne({ email });
          console.log(user);
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
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
