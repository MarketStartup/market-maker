import { sendForgotPasswordEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

function generatePassword(): string {
   const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!';
   const bytes = randomBytes(12);
   return Array.from(bytes as Uint8Array).map((b: number) => chars[b % chars.length]).join('');
}

export async function POST(req: NextRequest) {
   const { email } = await req.json();

   if (!email) {
      return NextResponse.json({ status: false, message: 'Email is required' }, { status: 400 });
   }

   // Look up user by email
   const searchUrl = `${process.env.PAYLOAD_BASE_URL}/api/users?where[email][equals]=${encodeURIComponent(email)}`;
   const searchResponse = await fetch(searchUrl, {
      cache: 'no-store',
      headers: {
         'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
      },
   });

   const searchData = await searchResponse.json();
   const user = searchData?.docs?.[0];

   if (!user) {
      return NextResponse.json({ status: false, message: 'No account found with that email address.' }, { status: 404 });
   }

   const tempPassword = generatePassword();

   // Update user: set temp password and reset hasChangedInitialPassword so they're forced to change it
   const updateUrl = `${process.env.PAYLOAD_BASE_URL}/api/users/${user.id}`;
   const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `users API-Key ${process.env.PAYLOAD_ADMIN_API_KEY}`,
      },
      body: JSON.stringify({ password: tempPassword, hasChangedInitialPassword: false }),
   });

   if (updateResponse.status !== 200) {
      return NextResponse.json({ status: false, message: 'Failed to reset password. Please try again.' }, { status: 500 });
   }

   await sendForgotPasswordEmail(user.email, user.firstName, tempPassword);

   return NextResponse.json({ status: true, message: 'If that email is registered, a reset link has been sent.' });
}
