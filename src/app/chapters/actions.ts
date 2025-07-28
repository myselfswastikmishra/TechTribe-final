"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  console.log("Submitting chapter application:", values)

  try {
    // First, call the Genkit flow. This can be used for AI checks later.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      // If the AI flow itself has an issue, report it.
      console.error("Genkit flow failed:", flowResult.message)
      return { success: false, message: flowResult.message || "An AI processing error occurred." }
    }

    // After the flow succeeds, send a Discord notification.
    // IMPORTANT: The user's actual Discord Webhook URL is now hardcoded here.
    const webhookUrl = "https://discord.com/api/webhooks/1399182678174994433/HB6t5xD2rtt70M1tagVMnt5JqwBniexwNGc9hnthESBqK6gxLezErZSWnwITeDPRASpE";
    
    if (!webhookUrl || webhookUrl.includes("YOUR_DISCORD_WEBHOOK_URL")) {
      console.error("CRITICAL: DISCORD_WEBHOOK_URL is not configured for the chapter form in src/app/chapters/actions.ts.")
      // This is a server configuration issue. Let the user know.
      return { success: false, message: "The server is not configured to send notifications. Please add the webhook URL." }
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
      return { success: false, message: "The notification to Discord could not be sent." }
    }

    console.log("Chapter application successfully sent to Discord.")
    return { success: true }

  } catch (error) {
    console.error("An unexpected error occurred in submitChapterApplication:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return { success: false, message: `An unexpected server error occurred: ${errorMessage}` }
  }
}
