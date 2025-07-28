'use server';
/**
 * @fileOverview A flow for generating email content from a contact form submission.
 *
 * - generateEmailContent - A function that uses an AI prompt to create an email body and subject.
 * - GenerateEmailContentInput - The input type for the function.
 * - GenerateEmailContentOutput - The return type for the function.
 */
import 'dotenv/config';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailContentInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(1, 'Please select a subject.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const GenerateEmailContentOutputSchema = z.object({
  emailBody: z.string(),
  subjectLine: z.string(),
});

export type GenerateEmailContentInput = z.infer<typeof GenerateEmailContentInputSchema>;
export type GenerateEmailContentOutput = z.infer<typeof GenerateEmailContentOutputSchema>;


export async function generateEmailContent(input: GenerateEmailContentInput): Promise<GenerateEmailContentOutput> {
  return await generateEmailContentFlow(input);
}


const emailPrompt = ai.definePrompt({
  name: 'generateEmailContentPrompt',
  input: {
    schema: z.object({
      fromName: z.string(),
      fromEmail: z.string(),
      subject: z.string(),
      message: z.string(),
    }),
  },
  output: {
    schema: GenerateEmailContentOutputSchema,
  },
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


const generateEmailContentFlow = ai.defineFlow(
  {
    name: 'generateEmailContentFlow',
    inputSchema: GenerateEmailContentInputSchema,
    outputSchema: GenerateEmailContentOutputSchema,
  },
  async (input) => {
    const {output} = await emailPrompt({
      fromName: input.name,
      fromEmail: input.email,
      subject: input.subject,
      message: input.message,
    });

    if (!output) {
      throw new Error("AI failed to generate email content.");
    }
    
    return output;
  }
);
