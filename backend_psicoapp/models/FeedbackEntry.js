import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
const FeedbackEntrySchema = new Schema({
    user: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    estresse: Number,
    ansiedade: Number,
    tristeza: Number,
    desanimo: Number,
    feedback: String,
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('FeedbackEntry', FeedbackEntrySchema);