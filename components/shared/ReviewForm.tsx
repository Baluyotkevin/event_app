"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { reviewFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues, reviewDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { IReview } from "@/lib/database/models/review.model"
import { createReview } from "@/lib/actions/review.actions"


type ReviewFormProps = {
    userId: string
    type: "Create" | "Update"
    review?: IReview
    eventId: string
}

const ReviewForm = ({ userId, type, review, eventId}: ReviewFormProps) => {
    const initialValues = review && type === 'Update' 
    ? { 
      ...review, 
      updatedAt: new Date(review.updatedAt), 
    }
    : reviewDefaultValues;
    const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: initialValues
  })

  const router = useRouter();


  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    if(type === 'Create') {
        try {
            const newReview = await createReview({
                review: { ...values, eventId },
                userId,
                eventId,
                path: `/profile`
            })

            if (newReview) {
                form.reset();
                router.push(`/events/${eventId}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Review Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Review `}</Button>
      </form>
    </Form>
  )
}

export default ReviewForm;