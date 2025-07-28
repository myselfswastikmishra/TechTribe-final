"use server"

import { type SendMessageInputSchema } from "./ContactForm";
import type * as z from "zod";

type SendMessageInput = z.infer<typeof SendMessageInputSchema>;

export async function sendDirectMessage(values: SendMessageInput) {
  const toEmail = process.env.EMAIL_TO;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!toEmail || !resendApiKey) {
    console.error("CRITICAL: EMAIL_TO or RESEND_API_KEY environment variables are not set.");
    return { success: false, error: "Server is not configured for sending emails." };
  }

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

  try {
    console.log(`Attempting to send email to ${toEmail} via Resend API...`);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: toEmail,
        subject: subjectLine,
        html: emailBody,
        reply_to: values.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API Error:", errorData);
      return { success: false, error: "Failed to send email via Resend." };
    }
    
    const data = await response.json();
    console.log("Email sent successfully via Resend. ID:", data.id);
    return { success: true };

  } catch (error) {
    console.error("Error in sendDirectMessage function:", error);
    return { success: false, error: "An unexpected server error occurred." };
  }
}
