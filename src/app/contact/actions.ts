
"use server"

import { z } from "zod"
import { SendMessageInputSchema } from "./ContactForm"

export async function sendDirectMessage(values: z.infer<typeof SendMessageInputSchema>) {
  // IMPORTANT: The user's actual Discord Webhook URL is now hardcoded here.
  const webhookUrl = "https://discord.com/api/webhooks/1399182678174994433/HB6t5xD2rtt70M1tagVMnt5JqwBniexwNGc9hnthESBqK6gxLezErZSWnwITeDPRASpE";
  
  if (!webhookUrl || webhookUrl.includes("YOUR_DISCORD_WEBHOOK_URL")) {
    console.error("CRITICAL: DISCORD_WEBHOOK_URL is not configured in src/app/contact/actions.ts.")
    return { success: false, message: "The server is not configured to send notifications. Please add the webhook URL." }
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
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to send message to Discord. Status:", response.status, "Response:", errorText)
      return { success: false, message: "Failed to send notification to Discord." }
    }

    return { success: true }
  } catch (error) {
    console.error("An unexpected error occurred while sending message to Discord:", error)
    return { success: false, message: "An unexpected network error occurred." }
  }
}
