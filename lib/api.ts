import { CourseType } from "@/models/courseType";
import { CacheConstant } from "./constants";

export const getCommonData = async () => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/globals/common`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getHomePageData = async () => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/globals/home`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getHeaderData = async () => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/globals/header`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res?.navItems;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getFooterData = async () => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/globals/footer`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getPageData = async (slug: string, layout?: string) => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/pages${layout ? `?where[layout][equals]=${layout}` : `?where[slug][equals]=${slug}`}`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res?.docs[0];
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getCoursesData = async (slug?: string): Promise<CourseType[]> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/courses${slug ? `?where[slug][equals]=${slug}` : ''}`);
      const response = await fetch(url, {
         next: {
            revalidate: Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0"),
            tags: [CacheConstant.revalidateTag]
         }
      });
      const res = await response.json();
      return res?.docs;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const userLogin = async (email: string, password: string): Promise<{ status: boolean; message: string; user?: { id: number, firstName: string, lastName: string, dob: string, state: string, email: string, password: string } }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users/login`);
      const response = await fetch(url, {
         method: 'POST',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "email": email,
            "password": password
         }),
      });
      const res = await response.json();
      if (response.status === 200) {
         return { status: true, message: res.message, user: res.user };
      } else {
         return { status: false, message: res.errors[0].message };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to login user' };
   }
};

export const userRegister = async (firstName: string, lastName: string, dob: string, state: string, mobile: string, email: string, password: string): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users`);
      const response = await fetch(url, {
         method: 'POST',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
         },
         body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob,
            "state": state,
            "mobile": mobile,
            "email": email,
            "password": password
         }),
      });

      const res = await response.json();
      if (response.status === 201) {
         return { status: true, message: res.message };
      } else {
         return { status: false, message: res.errors[0].data.errors[0].message };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to register user' };
   }
};

export const createOrder = async (userId: number, batchId: number, amount: number): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/orders`);
      const response = await fetch(url, {
         method: 'POST',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
         },
         body: JSON.stringify({
            "user": {
               "id": userId
            },
            "batch": {
               "id": batchId
            },
            "amount": amount,
            "status": "pending"
         }),
      });

      const res = await response.json();
      if (response.status === 201) {
         return { status: true, message: res.message };
      } else {
         return { status: false, message: res.errors[0].data.errors[0].message };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to register user' };
   }
};