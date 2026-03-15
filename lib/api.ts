import { CourseBatchType, CourseType } from "@/models/courseType";
import { CacheConstant, TransactionStatusConstant } from "./constants";
import { OrderType } from "@/models/OrderType";

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

export const getCourseData = async (slug?: string): Promise<CourseType[]> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/courses${slug ? `?where[slug][equals]=${slug}` : ''}`);
      const cacheDuration = Number.parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || "0");
      const response = await fetch(url, {
         headers: {
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         },
         ...(cacheDuration > 0
            ? { next: { revalidate: cacheDuration, tags: [CacheConstant.revalidateTag] } }
            : { cache: 'no-store' }
         ),
      });
      const res = await response.json();
      return res?.docs;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const userLogin = async (email: string, password: string): Promise<{ status: boolean; message: string; user?: { id: number, firstName: string, lastName: string, dob: string, state: string, mobile: string, email: string, password: string } }> => {
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

export const getOrderData = async (userId: number): Promise<OrderType[]> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/orders?where[user][equals]=${userId}&sort=-createdAt`);
      const response = await fetch(url, {
         cache: 'no-store',
         headers: {
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         }
      });
      const res = await response.json();
      return res?.docs;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const createOrder = async (userId: number, batchId: number, transactionId: string, amount: number): Promise<{ status: boolean; message: string, orderId: number }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/orders`);
      const response = await fetch(url, {
         method: 'POST',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         },
         body: JSON.stringify({
            "user": {
               "id": userId
            },
            "batch": {
               "id": batchId
            },
            "transactionId": transactionId,
            "amount": amount,
            "status": TransactionStatusConstant.PENDING
         }),
      });

      const res = await response.json();
      if (response.status === 201) {
         return { status: true, message: res.message, orderId: res.doc.id };
      } else {
         return { status: false, message: res.errors[0].data.errors[0].message, orderId: 0 };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to register user', orderId: 0 };
   }
};

export const updateOrder = async (orderId: number, status: string, razorpayPaymentId?: string, razorpayOrderId?: string, message?: string): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/orders/${orderId}`);
      const response = await fetch(url, {
         method: 'PATCH',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         },
         body: JSON.stringify({
            "status": status,
            "razorpayPaymentId": razorpayPaymentId,
            "razorpayOrderId": razorpayOrderId,
            "message": message
         }),
      });

      const res = await response.json();
      if (response.status === 200) {
         return { status: true, message: res.message };
      } else {
         return { status: false, message: res.errors[0].data.errors[0].message };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to register user' };
   }
};

export const enrollUserInBatch = async (batch: CourseBatchType, userId: number, amount: number): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/batches/${batch.id}`);
      const response = await fetch(url, {
         method: 'PATCH',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         },
         body: JSON.stringify({
            "users": [
               ...batch.users,
               {
                  "user": userId,
                  "enrollmentDate": new Date().toISOString(),
                  "amountPaid": amount
               }
            ]
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

export const getUserEnrollment = async (userId: number): Promise<{course: number; title: string; name: string; startDate: string, endDate: string}[]> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users/${userId}`);
      const response = await fetch(url, {
         cache: 'no-store',
         headers: {
            'Authorization': `users API-Key ${process.env.PAYLOAD_TOKEN}`,
         }
      });
      const res = await response.json();
      console.log('User Enrollment Response:', res);
      return res?.enrollments?.docs ?? [];
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const updateUserProfile = async (userId: number, data: { firstName: string; lastName: string; dob: string; state: string }): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users/${userId}`);
      const response = await fetch(url, {
         method: 'PATCH',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
         },
         body: JSON.stringify(data),
      });

      const res = await response.json();
      if (response.status === 200) {
         return { status: true, message: 'Profile updated successfully' };
      } else {
         return { status: false, message: res.errors?.[0]?.message || 'Failed to update profile' };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to update profile' };
   }
};

export const changeUserPassword = async (userId: number, email: string, currentPassword: string, newPassword: string): Promise<{ status: boolean; message: string }> => {
   try {
      // Step 1: Verify current password via login
      const loginUrl = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users/login`);
      const loginResponse = await fetch(loginUrl, {
         method: 'POST',
         cache: 'no-store',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password: currentPassword }),
      });

      if (loginResponse.status !== 200) {
         return { status: false, message: 'Current password is incorrect' };
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      // Step 2: Update password using the user's own token
      const updateUrl = new URL(`${process.env.PAYLOAD_BASE_URL}/api/users/${userId}`);
      const updateResponse = await fetch(updateUrl, {
         method: 'PATCH',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
         },
         body: JSON.stringify({ password: newPassword }),
      });

      const updateData = await updateResponse.json();
      if (updateResponse.status === 200) {
         return { status: true, message: 'Password updated successfully' };
      } else {
         return { status: false, message: updateData.errors?.[0]?.message || 'Failed to update password' };
      }
   } catch (error) {
      console.error(error);
      return { status: false, message: 'Failed to update password' };
   }
};

export const createInquiry = async (fullName: string, email: string, subject: string, message: string): Promise<{ status: boolean; message: string }> => {
   try {
      const url = new URL(`${process.env.PAYLOAD_BASE_URL}/api/inquiries`);
      const response = await fetch(url, {
         method: 'POST',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
         },
         body: JSON.stringify({
            "fullName": fullName,
            "email": email,
            "subject": subject,
            "message": message,
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