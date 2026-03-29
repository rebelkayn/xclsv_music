import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const artist = await prisma.artist.findUnique({
          where: { email: credentials.email as string },
        });

        if (!artist) return null;

        const isValid = await compare(
          credentials.password as string,
          artist.password
        );

        if (!isValid) return null;

        return {
          id: artist.id,
          email: artist.email,
          name: artist.name,
          image: artist.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const artist = await prisma.artist.findUnique({
          where: { email: user.email! },
        });
        if (artist) {
          token.artistId = artist.id;
          token.artistSlug = artist.slug;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.artistId as string;
        (session as unknown as Record<string, unknown>).artistSlug = token.artistSlug;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
