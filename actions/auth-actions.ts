'use server';

import { userRegister } from "@/lib/api";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

export async function handleSignOut() {
   await auth.api.signOut({
      headers: await headers(),
   });
   redirect('/login');
}
