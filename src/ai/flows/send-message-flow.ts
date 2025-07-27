'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendMessage - A function that handles sending a message.
 * - SendMessageInput - The input type for the sendMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
      toEmail: z.string(),
    }),
  },
  output: { schema: z.object({ emailBody: z.string() }) },
  prompt: `
    You are a helpful assistant. A user with the name {{fromName}} and email {{fromEmail}} has submitted a contact form.
    Generate the body for an email to be sent to {{toEmail}} with the subject "{{subject}}" and the following message:
    {{message}}

    Format the email body to be clear and readable.
  `,
});

const sendMessageFlow = ai.defineFlow(
  {
    name: 'sendMessageFlow',
    inputSchema: SendMessageInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    console.log('New message received, preparing email:', input);

    const toEmail = "theswastikmishraofficial@gmail.com";

    const { output } = await emailPrompt({
      fromName: input.name,
      fromEmail: input.email,
      subject: input.subject,
      message: input.message,
      toEmail: toEmail,
    });

    if (output) {
      console.log("------- EMAIL TO BE SENT -------");
      console.log(`To: ${toEmail}`);
      console.log(`Subject: New message from ${input.name}: ${input.subject}`);
      console.log("Body:");
      console.log(output.emailBody);
      console.log("---------------------------------");
    }

    // In a real application, you would add logic here to send an email,
    // save to a database, or notify a messaging service like Slack.
    return { success: true };
  }
);
