
"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  try {
    // Call the Genkit flow.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      console.error("The Genkit chapter application flow failed:", flowResult.message);
      return { success: false, message: flowResult.message || "An AI processing error occurred." }
    }

    // After the flow succeeds, send a Discord notification.
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    // If the webhook isn't configured, we can still consider the application
    // successfully submitted to the AI flow, but we should log the issue.
    if (!webhookUrl || webhookUrl.includes("YOUR_DISCORD_WEBHOOK_URL")) {
      console.warn("Discord Webhook URL is not configured. Skipping notification.");
      // Return success because the application was processed by the flow.
      return { success: true, message: "Your application was received, but the admin notification could not be sent." }
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
      console.error("Failed to send chapter application notification to Discord.", { status: response.status, statusText: response.statusText });
      return { success: true, message: "Your application was received, but the final notification to the admin could not be sent." }
    }

    // This is the full success path.
    return { success: true }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("An unexpected server error occurred during chapter application submission:", error);
    // Even if there's an error, it might be after the AI flow, so we check Gemini key
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("YOUR_GEMINI_API_KEY")) {
        return { success: false, message: "The AI service is not configured. Please contact the site administrator." };
    }
    return { success: false, message: `An unexpected server error occurred: ${errorMessage}` }
  }
}
