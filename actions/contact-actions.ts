'use server';

import { createInquiry } from "@/lib/api";

export async function createInquiryAction(formData: any) {

    const { fullName, email, subject, message } = formData;

    return await createInquiry(fullName || '', email || '', subject || '', message || '');
}