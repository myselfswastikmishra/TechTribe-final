
"use server"

import { z } from "zod"
import { SendMessageInputSchema } from "./ContactFormWrapper"

// This configuration uses a fallback mechanism.
// It will first try to use the DISCORD_WEBHOOK_URL from your environment variables (for production).
// If it's not found, it will fall back to the hardcoded key (for local/Firebase Studio development).
const DISCORD_WEBHOOK_URL = (process.env.DISCORD_WEBHOOK_URL && !process.env.DISCORD_WEBHOOK_URL.includes('YOUR_DISCORD_WEBHOOK_URL'))
    ? process.env.DISCORD_WEBHOOK_URL
    : 'https://discord.com/api/webhooks/1399182678174994433/HB6t5xD2rtt70M1tagVMnt5JqwBniexwNGc9hnthESBqK6gxLezErZSWnwITeDPRASpE';


export async function sendDirectMessage(values: z.infer<typeof SendMessageInputSchema>) {
  // First, check if the webhook URL is available either from env vars or fallback.
  if (!DISCORD_WEBHOOK_URL) {
    console.error("Discord Webhook URL is not configured on the server via environment variables or hardcoded fallback.");
    return { success: false, message: "The server is not configured to send notifications. Please contact the site administrator." }
  }

  const subjectMapping: { [key: string]: string } = {
    schedule_call: "Schedule a Call",
    sponsorship: "Sponsorship Inquiry",
    general_inquiry: "General Inquiry",
    other: values.customSubject || "Other",
  }
  const subjectText = subjectMapping[values.subject] || "General Inquiry"

  const discordMessage = {
    embeds: [
      {
        title: "New Contact Form Submission",
        color: 3447003, // A pleasant blue color
        fields: [
           {
            name: "Subject",
            value: subjectText,
            inline: false,
          },
          {
            name: "Name",
            value: values.name,
            inline: true,
          },
          {
            name: "Email",
            value: `[${values.email}](mailto:${values.email})`,
            inline: true,
          },
          {
            name: "Message",
            value: values.message,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Tech Tribe Contact Form",
        },
      },
    ],
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
       console.error("Failed to send notification to Discord.", { status: response.status, statusText: response.statusText });
      return { success: false, message: "Failed to send notification. The webhook URL may be invalid or missing permissions." }
    }

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown network error occurred."
    console.error("Error sending message to Discord:", error);
    return { success: false, message: `An unexpected error occurred: ${errorMessage}` }
  }
}
