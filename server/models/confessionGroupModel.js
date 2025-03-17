const mongoose = require("mongoose");

const confessionGroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        confessions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Confession",
            },
        ],
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const ConfessionGroup = mongoose.model("ConfessionGroup", confessionGroupSchema);
module.exports = ConfessionGroup;
