import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const EmotionEntrySchema = new Schema({
    user: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('EmotionEntry', EmotionEntrySchema);
