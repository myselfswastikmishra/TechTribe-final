"use server"

import { Resend } from "resend";
import { type SendMessageInputSchema } from "./ContactForm";
import type * as z from "zod";

type SendMessageInput = z.infer<typeof SendMessageInputSchema>;

export async function sendDirectMessage(values: SendMessageInput) {
  try {
    const toEmail = process.env.EMAIL_TO;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!toEmail || !resendApiKey) {
      console.error("CRITICAL: EMAIL_TO or RESEND_API_KEY environment variables are not set.");
      return { success: false, error: "Server is not configured for sending emails." };
    }
    
    // Manually construct the email content
    const subjectLine = `[TechTribe Contact] From ${values.name} - ${values.subject}`;
    const emailBody = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Subject:</strong> ${values.subject}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${values.message.replace(/\n/g, '<br>')}</p>
    `;

    console.log("Sending email via Resend...");
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: subjectLine,
      html: emailBody,
    });
    
    console.log("Email sent successfully via Resend.");
    return { success: true };

  } catch (error) {
    console.error("Error in sendDirectMessage:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
