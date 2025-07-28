"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  console.log("Submitting chapter application:", values)

  try {
    // First, call the Genkit flow.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      // If the AI flow fails, return its error message.
      console.error("Genkit flow failed:", flowResult.message)
      return { success: false, message: flowResult.message }
    }

    // If the flow succeeds, send a Discord notification.
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("CRITICAL: DISCORD_WEBHOOK_URL is not configured.")
      // Return a user-friendly error, but log the specific issue.
      return { success: false, message: "The server is not configured to send notifications." }
    }

    const discordMessage = {
      embeds: [
        {
          title: "New University Chapter Application",
          color: 16763904, // A vibrant orange color
          fields: [
            {
              name: "University Name",
              value: values.universityName,
              inline: false,
            },
            {
              name: "Contact Person",
              value: values.contactPerson,
              inline: true,
            },
            {
              name: "Email",
              value: `[${values.email}](mailto:${values.email})`,
              inline: true,
            },
            {
              name: "Reason for Applying",
              value: values.reason,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Tech Tribe Chapter Application",
          },
        },
      ],
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to send chapter application to Discord. Status:", response.status, "Response:", errorText)
      return { success: false, message: "Could not send notification to Discord." }
    }

    console.log("Chapter application successfully sent to Discord.")
    return { success: true }

  } catch (error) {
    console.error("An unexpected error occurred in submitChapterApplication:", error)
    return { success: false, message: "An unexpected server error occurred." }
  }
}
