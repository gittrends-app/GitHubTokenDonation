import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.user == process.env.ADMIN_LOGIN_SECRET &&
          credentials?.password == process.env.ADMIN_PASSWORD_SECRET
        ) {
          return {
            id: process.env.ADMIN_LOGIN_SECRET as string,
            email: process.env.ADMIN_EMAIL_SECRET as string,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
};
