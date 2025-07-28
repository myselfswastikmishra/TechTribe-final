"use server"

import { z } from "zod"
import { SendMessageInputSchema } from "./ContactForm"

export async function sendDirectMessage(values: z.infer<typeof SendMessageInputSchema>) {
  console.log("Received direct message submission:", values)
  
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error("CRITICAL: Discord webhook URL is not configured.")
    return { success: false, message: "Server is not configured for notifications." }
  }

  const subjectMapping: { [key: string]: string } = {
    schedule_call: "Schedule a Call",
    sponsorship: "Sponsorship Inquiry",
    general_inquiry: "General Inquiry",
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

  const payload = JSON.stringify(discordMessage)
  console.log("Sending payload to Discord...");

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to send message to Discord. Status:", response.status, "Response:", errorText)
      return { success: false, message: "Failed to send notification to Discord." }
    }

    console.log("Message successfully sent to Discord.")
    return { success: true }
  } catch (error) {
    console.error("An unexpected error occurred while sending message to Discord:", error)
    return { success: false, message: "An unexpected network error occurred." }
  }
}
