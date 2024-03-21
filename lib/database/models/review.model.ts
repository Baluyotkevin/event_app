import { Document, Schema, model, models } from "mongoose";

export interface IReview extends Document {
    _id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    author: string;
    eventId: string;
}

const ReviewSchema = new Schema({ 
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event'},
})

const Review = models.Review || model('Review', ReviewSchema);

export default Review;