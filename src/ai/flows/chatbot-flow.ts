
'use server';
/**
 * @fileOverview A chatbot flow for the Tech TribeX website.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string(),
});
type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return await chatbotFlow(input);
}

const CONTEXT = `
You are TribeX Navigator, the friendly and helpful AI assistant for the Tech TribeX website.
Your role is to answer questions about Tech TribeX based *only* on the information provided below.
Do not make up any information. If a question cannot be answered with the given context,
politely state that you don't have that information.
When presenting lists, use markdown-style hyphens, like this:
- First item
- Second item

**About Tech TribeX & Founder's Vision**

Tech TribeX is India’s largest tech-driven student community, connecting, educating, and empowering students and tech enthusiasts globally.

**Founder:** Swastik Mishra

**Founder’s Background & Vision:**
Swastik Mishra's journey began at K.R. Mangalam University, where he led a tech community of over 1000 students. His purpose is to create something meaningful from the ground up and scale it to impact thousands. This initiative fostered collaborations with organizations like Growbinar, ISKCON Gurugram, MUEsportsIndia, and Blockchain Orbit.

**Key Milestones:**
- Roborush: A flagship tech event at KRMU with 400+ participants.
- Spiritual Tech Retreat: Organized at ISKCON Gurugram, focusing on inner growth for innovators.
- Gen AI Workshop: Held at IIT Delhi, exploring the future of artificial intelligence.

**The Vision for Tech TribeX:**
The vision is to create a powerful ecosystem that provides:
- Hands-on Trainings & Workshops
- Internship & Placement Opportunities
- An esports community and tournament platform called TribeXesports.

The core mission is to build a movement that connects and empowers people driven to build, disrupt, and do something meaningful. Swastik is always open to collaborations and partnerships that align with this mission. After all, this isn’t just a community — it’s a movement.
`;

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `The user asks: "${input.message}".

      Provide a concise and friendly answer based *only* on the provided context.`,
      system: CONTEXT,
    });
    
    return { answer: llmResponse.text };
  }
);
