
"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  // First, check for the GEMINI_API_KEY before calling the flow.
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("YOUR_GEMINI_API_KEY")) {
    console.error("Gemini API Key is not configured.");
    return { success: false, message: "The AI service is not configured. Please contact the site administrator." };
  }

  try {
    // Call the Genkit flow.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      // If the AI flow itself has an issue, report it.
      console.error("The Genkit chapter application flow failed:", flowResult.message);
      return { success: false, message: flowResult.message || "An AI processing error occurred." }
    }

    // After the flow succeeds, send a Discord notification.
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl || webhookUrl.includes("YOUR_DISCORD_WEBHOOK_URL")) {
      // This is a server configuration issue. Let the user know.
      console.error("Discord Webhook URL is not configured.");
      // Note: We return success: true here because the application was processed by AI, but the notification failed.
      // The user message should reflect this nuance.
      return { success: true, message: "Your application was received, but the admin could not be notified due to a server configuration issue." }
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
      return { success: false, message: "The notification to the admin could not be sent. Please try again later." }
    }

    // This is the full success path.
    return { success: true }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("An unexpected server error occurred during chapter application submission:", error);
    return { success: false, message: `An unexpected server error occurred: ${errorMessage}` }
  }
}
