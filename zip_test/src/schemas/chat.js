import mongoose from "mongoose";

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const chatSchema = new Schema({
    room: {
        type: ObjectId,
        require: true,
        ref: 'Room',
    },
    user: {
        type: String,
        required: true,
      },
      chat: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
    
    module.exports = mongoose.model('Chat', chatSchema);