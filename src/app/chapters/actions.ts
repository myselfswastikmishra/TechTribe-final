
"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  try {
    // We directly call the Genkit flow.
    const flowResult = await chapterApplication(values)
    if (!flowResult.success) {
      console.error("The Genkit chapter application flow failed:", flowResult.message);
      return { success: false, message: flowResult.message || "An AI processing error occurred." }
    }

    // After the flow succeeds, send a Discord notification.
    const webhookUrl = "https://discord.com/api/webhooks/1399182678174994433/HB6t5xD2rtt70M1tagVMnt5JqwBniexwNGc9hnthESBqK6gxLezErZSWnwITeDPRASpE";
    
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
