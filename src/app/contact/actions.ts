"use server"

import * as z from "zod"

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export async function sendDirectMessage(values: z.infer<typeof formSchema>) {
  // Here you would typically process the form data,
  // e.g., send an email, save to a database, etc.
  console.log("Received message:", values)
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For this example, we'll just return a success message.
  return { success: true }
}
