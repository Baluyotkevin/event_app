'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import Review from '../database/models/review.model'
import { CreateReviewParams, GetRelatedReviewsByEventId } from '@/types'

export async function createReview({ userId, review} : CreateReviewParams) {
    try {
        await connectToDatabase()
        const author = await User.findById(userId)
        if (!author) throw new Error('Author not found')

        const newReview = await Review.create({ ...review, eventId: review.eventId, author: userId })


        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        handleError(error)
    }
}