import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "@/lib/db";
import { Admin, User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const AuthOption = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        matric: { label: "Matric", type: "number" },
        level: { label: "Level", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
        department: { label: "Department", type: "text" },
      },
      async authorize(credentials) {
        const Email = credentials?.email;
        const Password = credentials?.password;
        const Department = credentials?.department;
        const Name = credentials?.name;
        const Level = credentials?.level;
        const Matric = credentials?.matric;

        if (Email === process.env.ADMIN_EMAIL) {
          const admin = await prisma.admin.findFirst({
            where: {
              email: Email as string,
              password: Password as string,
              department: Department as string,
            },
          });
          if (!admin) {
            // Any object returned will be saved in `user` property of the JWT
            return null;
          }
          return admin;
        }

        const checkStudent = await prisma.user.findUnique({
          where: {
            matric: Number(Matric),
          },
        });
        if (checkStudent) {
          return checkStudent;
        }
        const NewStudent = await prisma.user.create({
          data: {
            name: Name as string,
            department: Department as string,
            matric: Number(Matric),
            level: Level as string,
          },
        });

        return NewStudent;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signIn/Admin", // Correct key name for pages
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User & Admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as User & Admin;
      }
      return session;
    },
  },
} as AuthOptions;

const handlers = NextAuth(AuthOption);

export { handlers as POST, handlers as GET };
