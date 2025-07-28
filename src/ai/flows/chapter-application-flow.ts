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
    outputSchema: z.object({ success: z.boolean(), message: z.string().optional() }),
  },
  async (input) => {
    console.log('New chapter application received:', input);
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
    if (!webhookUrl) {
      console.error("CRITICAL: Discord webhook URL is not configured for chapter applications.")
      return { success: false, message: "Server is not configured for notifications." }
    }

    const discordMessage = {
      embeds: [
        {
          title: "New University Chapter Application",
          color: 16763904, // A vibrant orange color
          fields: [
             {
              name: "University Name",
              value: input.universityName,
              inline: false,
            },
            {
              name: "Contact Person",
              value: input.contactPerson,
              inline: true,
            },
            {
              name: "Email",
              value: `[${input.email}](mailto:${input.email})`,
              inline: true,
            },
            {
              name: "Reason for Applying",
              value: input.reason,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Tech Tribe Chapter Application",
          },
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to send chapter application to Discord. Status:", response.status, "Response:", errorText);
        return { success: false, message: "Failed to send notification to Discord." };
      }

      console.log("Chapter application successfully sent to Discord.");
      return { success: true };
    } catch (error) {
      console.error("An unexpected error occurred while sending chapter application to Discord:", error);
      return { success: false, message: "An unexpected network error occurred." };
    }
  }
);
