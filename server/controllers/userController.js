const Confession = require("../models/confessionModel");
const User = require("../models/userModel");

// Create a new confession
module.exports.createConfession = async (req, res) => {
    try {
        const { confessionGroup, text, anonymous } = req.body;
        const user = req.user.id; // Assuming you're using authentication middleware

        const confession = new Confession({
            user,
            confessionGroup,
            text,
            anonymous: anonymous !== undefined ? anonymous : true,
        });

        await confession.save();
        res.status(201).json(confession);
    } catch (error) {
        res.status(500).json({ message: "Error creating confession", error: error.message });
    }
};

// Get all confessions in a group
module.exports.getConfessionsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const confessions = await Confession.find({ confessionGroup: groupId })
            .populate("user", "username") // Only populate username if not anonymous
            .populate("likes", "username")
            .populate("comments.user", "username")
            .sort({ createdAt: -1 });

        // If confession is anonymous, remove user info
        const sanitizedConfessions = confessions.map((conf) => {
            if (conf.anonymous) {
                conf.user = undefined;
            }
            return conf;
        });

        res.json(sanitizedConfessions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching confessions", error: error.message });
    }
};

// Like a confession
module.exports.likeConfession = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const userId = req.user.id;

        const confession = await Confession.findById(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        // Check if user already liked
        if (confession.likes.includes(userId)) {
            confession.likes = confession.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            confession.likes.push(userId);
        }

        await confession.save();
        res.json(confession);
    } catch (error) {
        res.status(500).json({ message: "Error liking confession", error: error.message });
    }
};

// Add a comment
module.exports.addComment = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const confession = await Confession.findById(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        confession.comments.push({
            user: userId,
            text,
        });

        await confession.save();
        const updatedConfession = await Confession.findById(confessionId).populate("comments.user", "username");

        res.json(updatedConfession);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

// Delete a confession (only by the creator)
module.exports.deleteConfession = async (req, res) => {
    try {
        const { confessionId } = req.params;
        const userId = req.user.id;

        const confession = await Confession.findById(confessionId);
        if (!confession) {
            return res.status(404).json({ message: "Confession not found" });
        }

        if (confession.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this confession" });
        }

        await confession.remove();
        res.json({ message: "Confession deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting confession", error: error.message });
    }
};
