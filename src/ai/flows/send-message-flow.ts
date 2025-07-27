'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendMessage - A function that handles sending a message.
 * - SendMessageInput - The input type for the sendMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Resend} from 'resend';

// Re-define the schema here to avoid context conflicts with client components.
const SendMessageInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type SendMessageInput = z.infer<typeof SendMessageInputSchema>;

export async function sendMessage(input: SendMessageInput) {
  return await sendMessageFlow(input);
}

const emailPrompt = ai.definePrompt({
  name: 'sendEmailPrompt',
  input: {
    schema: z.object({
      fromName: z.string(),
      fromEmail: z.string(),
      subject: z.string(),
      message: z.string(),
    }),
  },
  output: { schema: z.object({ emailBody: z.string(), subjectLine: z.string() }) },
  prompt: `
    You are a helpful assistant for a company called Tech Tribe. A user with the name {{fromName}} ({{fromEmail}}) has submitted a contact form.
    The user selected the subject: "{{subject}}".
    Their message is:
    {{message}}

    Your tasks:
    1. Create a concise, descriptive subject line for an email to be sent to the Tech Tribe team. The subject line should start with "[TechTribe Contact]" and include the user's name and original subject.
    2. Generate a clean, well-formatted HTML email body to be sent to the internal team. The email should clearly present all the information provided by the user in a readable format. Use simple HTML tags like <h1>, <p>, <strong>, etc. Do not include <html> or <body> tags.
  `,
});

const sendMessageFlow = ai.defineFlow(
  {
    name: 'sendMessageFlow',
    inputSchema: SendMessageInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const toEmail = process.env.EMAIL_TO;
    if (!toEmail) {
      console.error("CRITICAL: EMAIL_TO environment variable is not set. Cannot send email.");
      return { success: false };
    }
    
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("CRITICAL: RESEND_API_KEY environment variable is not set. Cannot send email.");
      return { success: false };
    }

    console.log('New message received, preparing email for:', toEmail);

    try {
      const { output } = await emailPrompt({
        fromName: input.name,
        fromEmail: input.email,
        subject: input.subject,
        message: input.message,
      });

      if (!output) {
        console.error("AI did not return output. Cannot formulate email.");
        return { success: false };
      }

      console.log("AI generated email content. Sending via Resend...");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: toEmail,
        subject: output.subjectLine,
        html: output.emailBody,
      });
      
      console.log("Email sent successfully via Resend.");
      return { success: true };

    } catch (error) {
      console.error("Error in sendMessageFlow:", error);
      return { success: false };
    }
  }
);
