import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
import { userLogin } from "@/lib/api";

const memoryDB = {
   user: [],
   session: [],
   account: [],
   verification: [],
};

export const auth = betterAuth({
   database: memoryAdapter(memoryDB),

   emailAndPassword: {
      enabled: true,

      async verifyPassword({ email, password }: { email: string; password: string }) {
         const result = await userLogin(email, password);

         if (!result.status || !result.user) {
            throw new Error("Invalid email or password");
         }

         const user = result.user;

         return {
            id: String(user.id),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            state: user.state,
         };
      },
   },

   user: {
      additionalFields: {
         firstName: { type: "string" },
         lastName: { type: "string" },
         dob: { type: "string" },
         state: { type: "string" },
      },
   },

   secret: process.env.BETTER_AUTH_SECRET!,
   baseURL: process.env.BETTER_AUTH_URL,
});