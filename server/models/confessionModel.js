const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        confessionGroup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ConfessionGroup",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Confession = mongoose.model("Confession", confessionSchema);
module.exports = Confession;
