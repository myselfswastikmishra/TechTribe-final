"use server"

import { sendMessage, type SendMessageInput } from "@/ai/flows/send-message-flow"

export async function sendDirectMessage(values: SendMessageInput) {
  console.log("Received message:", values);
  return await sendMessage(values);
}
