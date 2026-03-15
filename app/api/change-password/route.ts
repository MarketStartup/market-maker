import { auth } from "@/auth";
import { changeUserPassword } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const session = await auth();
   if (!session?.user) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
   }

   const { userId, email, currentPassword, newPassword } = await req.json();

   // Ensure the requester is only changing their own password
   if (session.user.id !== userId) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 403 });
   }

   const result = await changeUserPassword(userId, email, currentPassword, newPassword);
   return NextResponse.json(result, { status: result.status ? 200 : 400 });
}
