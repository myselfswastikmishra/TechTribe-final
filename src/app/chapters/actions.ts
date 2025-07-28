
"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  try {
    // We directly call the Genkit flow. If GEMINI_API_KEY is not set,
    // the genkit constructor or the flow call itself should throw an error.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      console.error("The Genkit chapter application flow failed:", flowResult.message);
      return { success: false, message: flowResult.message || "An AI processing error occurred." }
    }

    // After the flow succeeds, send a Discord notification.
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    // If webhookUrl is missing, we still want to inform the user that the main application part succeeded.
    if (!webhookUrl) {
       console.error("Discord Webhook URL is not configured. Cannot send notification.");
       return { success: true, message: "Your application was received, but the admin could not be notified as the server is missing the required configuration." }
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
       // The AI part succeeded, so overall success is true, but we pass a message.
      return { success: true, message: "Your application was received, but the final notification to the admin could not be sent." }
    }

    // This is the full success path.
    return { success: true, message: "Thank you for your interest. We will review your application and be in touch soon." }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("An unexpected server error occurred during chapter application submission:", error);
    return { success: false, message: `An unexpected server error occurred: ${errorMessage}` }
  }
}
