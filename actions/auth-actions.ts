'use server';

import { userRegister } from "@/lib/api";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { format } from "date-fns"
import { sendWelcomeEmail } from "@/lib/email";

export async function registerAction(formData: any) {
   const { firstName, lastName, mobile, email, state, dob } = formData;
   try {
      const dateObject = new Date(dob);
      const formattedDob = format(dateObject, "yyyy-MM-dd")
      const result = await userRegister(firstName, lastName, formattedDob, state, mobile, email);
      if (result.status && result.generatedPassword) {
         await sendWelcomeEmail(email, firstName, result.generatedPassword);
      }
      return { status: result.status, message: result.message };
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