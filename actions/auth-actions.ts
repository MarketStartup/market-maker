'use server';

import { userLogin, userRegister } from "@/lib/api";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function registerAction(formData: any) {

   const { firstName, lastName, email, state, dob, password } = formData;
   try {
      const dateObject = new Date(dob);
      const formattedDob = `${String(dateObject.getMonth() + 1).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}-${dateObject.getFullYear()}`;
      return await userRegister(firstName, lastName, formattedDob, state, email, password);
   } catch (error) {
      return { status: false, message: 'Internal Server Error' };
   }
}

export async function loginAction(email: string, password: string) {
   try {
      await signIn("credentials", { email, password, redirectTo: "/dashboard" });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return {
                  message: 'Invalid credentials',
               }
            default:
               return {
                  message: 'Something went wrong.',
               }
         }
      }
      throw error;
   }
}

export async function handleSignOut() {
   await signOut({ redirectTo: '/login' });
}