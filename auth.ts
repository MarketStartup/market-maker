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
            if (!auth.user.hasChangedInitialPassword && !pathname.startsWith('/update-password')) {
               return Response.redirect(new URL('/update-password', nextUrl));
            }
         }
         return !!auth;
      },
      jwt({ token, user, trigger, session }) {
         if (user) {
            token.id = typeof (user.id) === 'string' ? parseInt(user.id) : user.id,
               token.firstName = user.firstName as string;
            token.lastName = user.lastName as string;
            token.dob = user.dob as string;
            token.state = user.state as string;
            token.mobile = user.mobile as string;
            token.email = user.email as string;
            token.hasChangedInitialPassword = user.hasChangedInitialPassword;
         }
         if (trigger === "update" && session) {
            token = { ...token, ...session };
         }
         return token;
      },
      session({ session, token }) {
         return {
            ...session,
            user: {
               ...session.user,
               id: token.id,
               firstName: token.firstName as string,
               lastName: token.lastName as string,
               dob: token.dob as string,
               state: token.state as string,
               mobile: token.mobile as string,
               email: token.email as string,
               hasChangedInitialPassword: token.hasChangedInitialPassword,
            },
         };
      }

   },
   pages: {
      signIn: "/login"
   }
})