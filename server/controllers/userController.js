const ConfessionGroup = require("../models/confessionGroupModel");
const Confession = require("../models/confessionModel");
const User = require("../models/userModel");

// Create a new confession
module.exports.createConfession = async (req, res) => {
    console.log("hello from create chat");
    try {
        const groupId = req.params.groupId;
        const { text } = req.body;
        const user = req.user.id; // Assuming you're using authentication middleware

        // Find the group
        const group = await ConfessionGroup.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Confession group not found" });
        }

        // Create confession
        let confession = new Confession({
            user,
            confessionGroup: groupId,
            text,
        });

        // Save confession first
        await confession.save();

        // Populate user after saving
        confession = await confession.populate("user");

        // Update group
        group.confessions.push(confession._id);
        await group.save();

        res.status(201).json(confession);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating confession", error: error.message });
    }
};

// Get other confession groups

module.exports.getOtherConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find({ members: { $ne: req.user.id } });
        res.status(200).json({ message: "success", confessionGroups });
    } catch (error) {
        res.status(500).json({ message: "Error geting confession groups", error: error.message });
    }
};

// Get all confession groups

module.exports.getAllConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find();
        res.status(200).json({ message: "success", confessionGroups });
    } catch (error) {
        res.status(500).json({ message: "Error geting confession groups", error: error.message });
    }
};

// Get group by id

module.exports.getConfessionGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const confessionGroup = await ConfessionGroup.findById(groupId).populate({
            path: "confessions",
            populate: [
                { path: "user", select: "name" }, // Populate confession owner
                { path: "comments.user", select: "name" }, // Populate user in comments
            ],
        });
        res.status(200).json({ message: "success", confessionGroup });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error geting confession group", error: error.message });
    }
};

//Join a group

module.exports.joinGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const confessionGroup = await ConfessionGroup.findByIdAndUpdate(groupId, { $push: { members: req.user.id } });
        await User.findByIdAndUpdate(req.user.id, { $push: { confessionGroups: confessionGroup._id } });
        res.status(200).json({ message: "success", confessionGroup });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error geting confession groups", error: error.message });
    }
};

// Get all confessions in a group
module.exports.getConfessionsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const confessions = await Confession.find({ confessionGroup: groupId })
            .populate("user", "name") // Only populate username if not anonymous
            .populate("likes", "username")
            .populate("comments.user", "name")
            .sort({ createdAt: -1 });

        res.json(confessions);
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
        const updatedConfession = await Confession.findById(confessionId).populate("comments.user").populate("user");

        console.log(updatedConfession);

        res.status(201).json(updatedConfession);
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
