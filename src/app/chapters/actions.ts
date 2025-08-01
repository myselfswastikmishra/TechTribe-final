
"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('YOUR_GEMINI_API_KEY')) 
    ? process.env.GEMINI_API_KEY 
    : 'AIzaSyDPTJ7DF3UpsfhI6W5N6RVT1LyIB45end0';
    
const DISCORD_WEBHOOK_URL = (process.env.DISCORD_WEBHOOK_URL && !process.env.DISCORD_WEBHOOK_URL.includes('YOUR_DISCORD_WEBHOOK_URL'))
    ? process.env.DISCORD_WEBHOOK_URL
    : 'https://discord.com/api/webhooks/1399182678174994433/HB6t5xD2rtt70M1tagVMnt5JqwBniexwNGc9hnthESBqK6gxLezErZSWnwITeDPRASpE';


export async function submitChapterApplication(values: ChapterApplicationInput) {
  // First, check if the key is available.
  if (!GEMINI_API_KEY) {
    console.error("Gemini API Key is not configured on the server via environment variables or hardcoded fallback.");
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

    // After the flow succeeds, check if the webhook URL is available.
    if (!DISCORD_WEBHOOK_URL) {
      console.error("Discord Webhook URL is not configured on the server via environment variables or hardcoded fallback.");
      // The application was successful, but the notification failed. This is a partial success.
      return { success: true, message: "Your application was received, but the admin could not be notified. The server's notification service is not configured." }
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

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    })

    if (!response.ok) {
      console.error("Failed to send chapter application notification to Discord.", { status: response.status, statusText: response.statusText });
       // The application was successful, but the notification failed. This is a partial success.
      return { success: true, message: "Your application was received, but the final notification to the admin could not be sent. Please verify the Discord Webhook URL on the server." }
    }

    // This is the full success path.
    return { success: true, message: "Thank you for your interest! We will review your application and be in touch soon." }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    console.error("An unexpected server error occurred during chapter application submission:", error);
    return { success: false, message: `An unexpected server error occurred: ${errorMessage}` }
  }
}
