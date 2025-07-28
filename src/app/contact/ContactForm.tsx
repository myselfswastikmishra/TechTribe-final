
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { sendDirectMessage } from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SendMessageInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please select a subject."),
  customSubject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
}).refine(data => {
    if (data.subject === 'other') {
        return data.customSubject && data.customSubject.length > 2;
    }
    return true;
    }, {
    message: "Custom subject must be at least 3 characters.",
    path: ["customSubject"],
});


export function ContactForm() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject')
  const customSubjectParam = searchParams.get('customSubject')

  let defaultSubject = "general_inquiry"
  if (subjectParam === 'sponsorship') defaultSubject = 'sponsorship'
  if (subjectParam === 'schedule_call') defaultSubject = 'schedule_call'
  if (subjectParam === 'other') defaultSubject = 'other'


  const { toast } = useToast()
  const form = useForm<z.infer<typeof SendMessageInputSchema>>({
    resolver: zodResolver(SendMessageInputSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: defaultSubject,
      customSubject: customSubjectParam || "",
      message: "",
    },
  })

  const subjectValue = form.watch("subject");

  useEffect(() => {
    if (subjectValue !== 'other') {
      form.clearErrors('customSubject');
    }
  }, [subjectValue, form]);


  async function onSubmit(values: z.infer<typeof SendMessageInputSchema>) {
    const result = await sendDirectMessage(values)

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      })
      form.reset()
    } else {
      toast({
        title: "Something went wrong.",
        description: result.message || "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason for contacting us" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="schedule_call">Schedule a Call</SelectItem>
                  <SelectItem value="sponsorship">Sponsorship Inquiry</SelectItem>
                  <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                  <SelectItem value="other">Other (Please specify)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {subjectValue === 'other' && (
            <FormField
            control={form.control}
            name="customSubject"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Custom Subject</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Question about a project" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="How can we help you?" {...field} />
              </FormControl>
              {form.getValues("subject") === "schedule_call" && (
                 <FormDescription>
                    Please suggest a few time slots that work for you.
                </FormDescription>
              )}
               <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
