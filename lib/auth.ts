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

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Check Artist table first
        const artist = await prisma.artist.findUnique({
          where: { email },
        });

        if (artist) {
          const isValid = await compare(password, artist.password);
          if (!isValid) return null;
          return {
            id: artist.id,
            email: artist.email,
            name: artist.name,
            image: artist.image,
          };
        }

        // Check Collector table
        const collector = await prisma.collector.findUnique({
          where: { email },
        });

        if (collector) {
          const isValid = await compare(password, collector.password);
          if (!isValid) return null;
          return {
            id: collector.id,
            email: collector.email,
            name: collector.name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Determine role by checking which table the user belongs to
        const artist = await prisma.artist.findUnique({
          where: { email: user.email! },
        });
        if (artist) {
          token.role = "artist";
          token.artistId = artist.id;
          token.artistSlug = artist.slug;
        } else {
          const collector = await prisma.collector.findUnique({
            where: { email: user.email! },
          });
          if (collector) {
            token.role = "collector";
            token.collectorId = collector.id;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = session as any;
        s.role = token.role;
        if (token.role === "artist") {
          s.user.id = token.artistId as string;
          s.artistSlug = token.artistSlug;
        } else if (token.role === "collector") {
          s.user.id = token.collectorId as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
