
"use server"

import { z } from "zod"
import { SendMessageInputSchema } from "./ContactFormWrapper"

export async function sendDirectMessage(values: z.infer<typeof SendMessageInputSchema>) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

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
    // We will directly attempt to send the notification.
    // If the webhookUrl is not set, fetch will throw an error which will be caught.
    if (!webhookUrl) {
      throw new Error("Discord Webhook URL is not set on the server.");
    }
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
      console.error("Discord API returned a non-ok response.", { status: response.status, statusText: response.statusText });
      const errorBody = await response.text();
      console.error("Discord response body:", errorBody);
      return { success: false, message: `Failed to send notification. Discord returned: ${response.statusText}` }
    }

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("Failed to send message to Discord:", error);
    return { success: false, message: `An unexpected error occurred while sending the message: ${errorMessage}` }
  }
}
