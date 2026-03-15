import { auth } from "@/auth";
import { updateUserProfile } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
   const session = await auth();
   if (!session?.user) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 401 });
   }

   const { userId, ...data } = await req.json();

   if (session.user.id !== userId) {
      return NextResponse.json({ status: false, message: 'Unauthorized' }, { status: 403 });
   }

   const result = await updateUserProfile(userId, data);
   return NextResponse.json(result, { status: result.status ? 200 : 400 });
}
