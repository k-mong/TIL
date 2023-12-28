import mongoose from "mongoose";

import { Schema } from "mongoose";
const roomSchema = new Schema({
    title: {
        type: String,   // 방제목(게시글 제목으로)
        require: true,
    },
    owner: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Room', roomSchema);