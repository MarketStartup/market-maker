import { auth } from "@/auth";
import { changeUserPassword } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const session = await auth();
   if (!session?.user) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
   }

   const { userId, email, currentPassword, newPassword, hasChangedInitialPassword } = await req.json();

   if (session.user.id !== userId) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 403 });
   }

   // First-time login: skip current password verification, use admin key
   if (hasChangedInitialPassword === false) {
      const url = `${process.env.PAYLOAD_BASE_URL}/api/users/${userId}`;
      const response = await fetch(url, {
         method: 'PATCH',
         cache: 'no-store',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
         },
         body: JSON.stringify({ password: newPassword, hasChangedInitialPassword: true }),
      });
      const data = await response.json();
      if (response.status === 200) {
         return NextResponse.json({ status: true, message: 'Password updated successfully' });
      }
      return NextResponse.json(
         { status: false, message: data.errors?.[0]?.message || 'Failed to update password' },
         { status: 400 }
      );
   }

   const result = await changeUserPassword(userId, email, currentPassword, newPassword);
   return NextResponse.json(result, { status: result.status ? 200 : 400 });
}
