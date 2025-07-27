'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendMessage - A function that handles sending a message.
 * - SendMessageInput - The input type for the sendMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { SendMessageInputSchema } from '@/app/contact/ContactForm';

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
    console.log('New message received:', input);
    // In a real application, you would add logic here to send an email,
    // save to a database, or notify a messaging service like Slack.
    return { success: true };
  }
);
