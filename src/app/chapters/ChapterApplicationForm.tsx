"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitChapterApplication } from "./actions"

export const ChapterApplicationFormSchema = z.object({
  universityName: z.string().min(5, "University name is required."),
  contactPerson: z.string().min(2, "Contact person name is required."),
  email: z.string().email("Please enter a valid email address."),
  reason: z.string().min(20, "Please provide a reason with at least 20 characters."),
})

export function ChapterApplicationForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ChapterApplicationFormSchema>>({
    resolver: zodResolver(ChapterApplicationFormSchema),
    defaultValues: {
      universityName: "",
      contactPerson: "",
      email: "",
      reason: "",
    },
  })

  async function onSubmit(values: z.infer<typeof ChapterApplicationFormSchema>) {
    const result = await submitChapterApplication(values)

    if (result.success) {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We will review your application and be in touch soon.",
      })
      form.reset()
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="universityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University Name</FormLabel>
              <FormControl>
                <Input placeholder="University of Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Alex Turing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your University Email</FormLabel>
              <FormControl>
                <Input placeholder="alex.turing@university.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to start a chapter?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your motivation and how you plan to build a community..."
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  )
}
