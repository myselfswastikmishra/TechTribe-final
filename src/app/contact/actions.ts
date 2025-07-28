"use server"

import { sendMessage, type SendMessageInput } from "@/ai/flows/send-message-flow";

export async function sendDirectMessage(values: SendMessageInput) {
  console.log("Received direct message:", values)
  // Simulate network delay to give user feedback
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return await sendMessage(values);
}
