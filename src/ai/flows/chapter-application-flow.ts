'use server';
/**
 * @fileOverview A flow for handling chapter application submissions.
 *
 * - chapterApplication - A function that handles a new chapter application.
 * - ChapterApplicationInput - The input type for the chapterApplication function.
 */
import 'dotenv/config';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Re-define the schema here to avoid context conflicts with client components.
const ChapterApplicationFormSchema = z.object({
  universityName: z.string().min(5, "University name is required."),
  contactPerson: z.string().min(2, "Contact person name is required."),
  email: z.string().email("Please enter a valid email address."),
  reason: z.string().min(20, "Please provide a reason with at least 20 characters."),
});

export type ChapterApplicationInput = z.infer<typeof ChapterApplicationFormSchema>;

export async function chapterApplication(input: ChapterApplicationInput) {
  return await chapterApplicationFlow(input);
}

const chapterApplicationFlow = ai.defineFlow(
  {
    name: 'chapterApplicationFlow',
    inputSchema: ChapterApplicationFormSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    console.log('New chapter application received:', input);
    // Here you would process the application.
    // This could involve saving it to a database, sending a notification,
    // and using another AI flow to check for eligibility.
    return { success: true };
  }
);
