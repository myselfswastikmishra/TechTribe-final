"use server"

import { generateEmailContent, type GenerateEmailContentInput } from "@/ai/flows/send-message-flow"
import { Resend } from "resend";

export async function sendDirectMessage(values: GenerateEmailContentInput) {
  try {
    const toEmail = process.env.EMAIL_TO;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!toEmail || !resendApiKey) {
      console.error("CRITICAL: EMAIL_TO or RESEND_API_KEY environment variables are not set.");
      return { success: false, error: "Server is not configured for sending emails." };
    }
    
    console.log("Generating email content with AI...");
    const emailContent = await generateEmailContent(values);

    if (!emailContent || !emailContent.emailBody || !emailContent.subjectLine) {
        console.error("AI did not return valid content.");
        return { success: false, error: "Failed to generate email content." };
    }

    console.log("AI generated email content. Sending via Resend...");
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: emailContent.subjectLine,
      html: emailContent.emailBody,
    });
    
    console.log("Email sent successfully via Resend.");
    return { success: true };

  } catch (error) {
    console.error("Error in sendDirectMessage:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
