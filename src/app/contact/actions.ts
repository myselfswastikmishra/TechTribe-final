"use server"

import { sendMessage, type SendMessageInput } from "@/ai/flows/send-message-flow"

export async function sendDirectMessage(values: SendMessageInput) {
  // Here you would typically process the form data,
  // e.g., send an email, save to a database, etc.
  console.log("Received message:", values)
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return await sendMessage(values);
}
