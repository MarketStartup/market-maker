import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userLogin } from "@/lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         credentials: {
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password", placeholder: "Password" },
         },
         async authorize(credentials) {
            let user = null;
            const data = await userLogin(String(credentials.email), String(credentials.password));
            if (data.status && data.user) {
               user = data.user
            } else
               return null

            return user;
         }
      })
   ],
   callbacks: {
      authorized({ request: { nextUrl }, auth }) {
         const isLoggedIn = !!auth?.user;
         const { pathname } = nextUrl;
         if (isLoggedIn) {
            if (pathname.startsWith('/login')) {
               return Response.redirect(new URL('/dashboard', nextUrl));
            }
         }
         return !!auth;
      },
      jwt({ token, user, trigger, session }) {
         if (user) {
            token.firstName = user.firstName as string;
            token.lastName = user.lastName as string;
            token.dob = user.dob as string;
            token.state = user.state as string;
            token.email = user.email as string;
         }
         if (trigger === "update" && session) {
            token = { ...token, ...session };
         }
         return token;
      },
      session({ session, token }) {
         session.user.firstName = token.firstName;
         session.user.lastName = token.lastName;
         session.user.dob = token.dob;
         session.user.state = token.state;
         session.user.email = token.email;
         return session;
      }
   },
   pages: {
      signIn: "/login"
   }
})