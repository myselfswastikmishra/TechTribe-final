'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendMessage - A function that handles a new message.
 * - SendMessageInput - The input type for the sendMessage function.
 */
import 'dotenv/config';

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

const sendMessageFlow = ai.defineFlow(
  {
    name: 'sendMessageFlow',
    inputSchema: SendMessageInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    console.log('New contact form message received:', input);
    // This flow now only logs the message to the Genkit console.
    // The email sending functionality has been removed due to persistent issues.
    return { success: true };
  }
);
