const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User",
        },
        confessionGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ConfessionGroup",
            },
        ],
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
