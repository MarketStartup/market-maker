import "next-auth";
import "next-auth/jwt";
import { CommonType } from "./commonType";

declare module "next-auth" {
   interface User extends CommonType {
      id: number,
      firstName: string,
      lastName: string,
      dob: string,
      state: string,
      email: string,
   }
   interface Session {
      user: User
   }
}

declare module "next-auth/jwt" {
   interface JWT extends CommonType {
      id: number,
      firstName: string,
      lastName: string,
      dob: string,
      state: string,
      email: string,
   }
}