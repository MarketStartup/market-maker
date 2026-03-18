import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DEFAULT_REPLY_TO_EMAIL,
    pass: process.env.PASSWORD_SENDER,
  },
});

export async function sendWelcomeEmail(
  toEmail: string,
  firstName: string,
  generatedPassword: string
): Promise<void> {
  const mailOptions = {
    from: `"Market Maker" <${process.env.DEFAULT_REPLY_TO_EMAIL}>`,
    to: toEmail,
    subject: 'Welcome to Market Maker – Your Account is Ready',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
        <div style="background: #ffffff; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
          <h2 style="color: #1a1a1a; margin-top: 0;">Welcome, ${firstName}!</h2>
          <p style="color: #444; line-height: 1.6;">
            Your account has been successfully created on <strong>Market Maker</strong>.
            Below are your login credentials:
          </p>
          <div style="background: #f0f4ff; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 4px; margin: 24px 0;">
            <p style="margin: 0; color: #333;"><strong>Email:</strong> ${toEmail}</p>
            <p style="margin: 8px 0 0; color: #333;"><strong>Password:</strong> ${generatedPassword}</p>
          </div>
          <p style="color: #e53e3e; font-size: 14px;">
            ⚠️ For security, you will be asked to change this password the first time you log in.
          </p>
          <p style="color: #666; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
            If you did not register for this account, please ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendEnrollmentEmail(
  toEmail: string,
  firstName: string,
  courseName: string,
  batchName: string,
  amountPaid: number,
  paymentId: string,
): Promise<void> {
  const mailOptions = {
    from: `"Market Maker" <${process.env.DEFAULT_REPLY_TO_EMAIL}>`,
    to: toEmail,
    subject: `Enrollment Confirmed – ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
        <div style="background: #ffffff; border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: #22c55e; border-radius: 50%;">
              <span style="color: white; font-size: 32px;">✓</span>
            </div>
          </div>
          <h2 style="color: #1a1a1a; margin-top: 0; text-align: center;">You're Enrolled, ${firstName}!</h2>
          <p style="color: #444; line-height: 1.6; text-align: center;">
            Your payment was successful and you have been enrolled in the course below.
          </p>
          <div style="background: #f0f4ff; border-left: 4px solid #4f46e5; padding: 20px; border-radius: 4px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #666; padding: 6px 0; font-size: 14px;">Course</td>
                <td style="color: #1a1a1a; font-weight: 600; padding: 6px 0; font-size: 14px; text-align: right;">${courseName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 6px 0; font-size: 14px;">Batch</td>
                <td style="color: #1a1a1a; font-weight: 600; padding: 6px 0; font-size: 14px; text-align: right;">${batchName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 6px 0; font-size: 14px;">Amount Paid</td>
                <td style="color: #4f46e5; font-weight: 700; padding: 6px 0; font-size: 14px; text-align: right;">₹${amountPaid.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 6px 0; font-size: 14px;">Transaction ID</td>
                <td style="color: #1a1a1a; font-family: monospace; padding: 6px 0; font-size: 13px; text-align: right;">${paymentId}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 6px 0; font-size: 14px;">Date</td>
                <td style="color: #1a1a1a; padding: 6px 0; font-size: 14px; text-align: right;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            </table>
          </div>
          <p style="color: #666; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px; text-align: center;">
            Please keep this email as your payment receipt. If you have any questions, contact our support team.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
