"use server"

import { sendMessage, type SendMessageInput } from "@/ai/flows/send-message-flow"

type FormValues = Omit<SendMessageInput, 'geminiApiKey' | 'resendApiKey'>;

export async function sendDirectMessage(values: FormValues) {
  console.log("Received message:", values);

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!geminiApiKey || !resendApiKey) {
    console.error("API keys for Gemini or Resend are not configured on the server.");
    return { success: false };
  }

  // Pass the API keys from the server environment to the flow.
  return await sendMessage({
    ...values,
    geminiApiKey,
    resendApiKey,
  });
}
