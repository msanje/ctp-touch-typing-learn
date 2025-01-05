import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/index";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const matchingUser = await db.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (!matchingUser) {
          return null; // User not found
        }

        if (credentials?.password === undefined) {
          return null; // Password not provided, authentication failure
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = bcrypt.compare(
          credentials?.password,
          matchingUser.password
        );

        if (!passwordMatch) {
          return null; // Passwords do not match
        }

        return {
          id: matchingUser.id.toString(),
          name: matchingUser.username,
          email: matchingUser.email,
        };
      },
    }),
  ],
};
