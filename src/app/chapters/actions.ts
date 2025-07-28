"use server"

import { chapterApplication, type ChapterApplicationInput } from "@/ai/flows/chapter-application-flow"

export async function submitChapterApplication(values: ChapterApplicationInput) {
  console.log("Submitting chapter application:", values)

  // First, call the Genkit flow. In the future, this could do AI analysis.
  const flowResult = await chapterApplication(values);

  if (!flowResult.success) {
    // If the AI flow fails, return its error message.
    return flowResult;
  }
  
  // If the flow succeeds, send a Discord notification.
  const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL_HERE";

  if (!webhookUrl || webhookUrl === "YOUR_DISCORD_WEBHOOK_URL_HERE") {
    console.error("CRITICAL: Discord webhook URL is not configured for chapter applications.")
    // We can still return success to the user, but log the error.
    return { success: true }; 
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
    };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send chapter application to Discord. Status:", response.status, "Response:", errorText);
      // Even if discord fails, tell the user it was a success.
    } else {
      console.log("Chapter application successfully sent to Discord.");
    }
    
  } catch (error) {
    console.error("An unexpected error occurred while sending chapter application to Discord:", error);
     // Even if discord fails, tell the user it was a success.
  }
  
  return { success: true };
}
