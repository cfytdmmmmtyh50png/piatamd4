import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      async authorize(c) {
        if (!c?.email || !c?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: c.email } });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(String(c.password), user.passwordHash);
        return ok ? { id: user.id, email: user.email ?? "", name: user.name ?? "" } as any : null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) (session as any).user.id = token.id;
      return session;
    }
  },
  trustHost: true
});
