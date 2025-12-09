'use server';

import { userRegister } from "@/lib/api";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { format } from "date-fns"

export async function registerAction(formData: any) {
   const { firstName, lastName, mobile, email, state, dob, password } = formData;
   try {
      const dateObject = new Date(dob);
      const formattedDob = format(dateObject, "yyyy-MM-dd")
      return await userRegister(firstName, lastName, formattedDob, state, mobile, email, password);
   } catch (error) {
      return { status: false, message: 'Internal Server Error' };
   }
}

// export async function loginAction(email: string, password: string) {
//    try {
//       await signIn("credentials", {
//          redirect: false,
//          email,
//          password,
//       })
//       return { status: true }
//    } catch (error) {
//       console.error("loginAction AuthError:", error)

//       if (error instanceof AuthError) {
//          if (error.type === "CredentialsSignin") {
//             return { status: false, message: "Invalid email or password" }
//          }
//          return { status: false, message: "Authentication error" }
//       }
//       return { status: false, message: "Unexpected error" }
//    }
// }

export async function handleSignOut() {
   await signOut({ redirect: true, redirectTo: '/login' });
}