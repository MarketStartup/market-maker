export type AppUser = {
   id: string;
   externalId: number;
   email: string;
   name: string;
   firstName: string;
   lastName: string;
   dob: string;
   state: string;
   emailVerified: boolean;
   image?: string | null;
   createdAt: Date | string;
   updatedAt: Date | string;
};
