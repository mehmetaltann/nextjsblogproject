import CredentialsProvider from "next-auth/providers/credentials";
import brcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import { ConnectDb } from "@/lib/config/db";

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
          await ConnectDb();
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
};
