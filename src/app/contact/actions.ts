
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

  // If the webhook isn't configured, log it but don't block the user.
  // In a real app, you might handle this differently, but for direct use, we proceed.
  if (!webhookUrl || webhookUrl.includes("YOUR_DISCORD_WEBHOOK_URL")) {
    console.error("Discord Webhook URL is not configured. Message will not be sent.");
    // For the user, pretend it was successful so they are not blocked.
    // The error is logged on the server for the developer to see.
    return { success: true, message: "Message sent (simulated)." };
  }


  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
      console.error("Failed to send notification to Discord.", { status: response.status });
      return { success: false, message: "There was an issue sending your message to the destination." }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending message to Discord:", error);
    return { success: false, message: "An unexpected network error occurred." }
  }
}
