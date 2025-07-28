"use server"

import { z } from "zod"
import { SendMessageInputSchema } from "./ContactForm"

export async function sendDirectMessage(values: z.infer<typeof SendMessageInputSchema>) {
  console.log("Received direct message:", values)
  
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured. Please set DISCORD_WEBHOOK_URL in your .env file.")
    return { success: false, message: "Server is not configured for notifications." }
  }

  const discordMessage = {
    embeds: [
      {
        title: `New Message: ${values.subject}`,
        color: 3447003, // Blue color
        fields: [
          {
            name: "Name",
            value: values.name,
            inline: true,
          },
          {
            name: "Email",
            value: values.email,
            inline: true,
          },
          {
            name: "Message",
            value: values.message,
          },
        ],
        timestamp: new Date().toISOString(),
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
      console.error("Failed to send message to Discord:", response.status, await response.text())
      return { success: false, message: "Failed to send notification." }
    }

    console.log("Message successfully sent to Discord.")
    return { success: true }
  } catch (error) {
    console.error("Error sending message to Discord:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
