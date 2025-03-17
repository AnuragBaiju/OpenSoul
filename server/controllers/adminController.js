const User = require("../models/userModel");
const ConfessionGroup = require("../models/confessionGroupModel");


// Get all users
module.exports.getAllStudents = async (req, res) => {
    try {
        const users = await User.find().select("-__v");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single user by studentID
module.exports.getStudentById = async (req, res) => {
    try {
        const user = await User.findOne({ studentId: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new user
module.exports.createStudent = async (req, res) => {
    try {
        const { studentId, name, role } = req.body;

        if (!studentId || !name) {
            return res.status(400).json({ message: "Student ID and Name are required" });
        }

        const existingUser = await User.findOne({ studentId });
        if (existingUser) {
            return res.status(400).json({ message: "Student ID already exists" });
        }

        const newUser = new User({ studentId, name, role });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update user details
module.exports.updateStudent = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ studentId: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a user
module.exports.deleteStudent = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Create a new confession group
module.exports.createConfessionGroup = async (req, res) => {
    try {
        const { name, description, isPublic } = req.body;
        
        const confessionGroup = new ConfessionGroup({
            name,
            description,
            createdBy: req.user._id, // Assuming you have user info from auth middleware
            isPublic
        });

        const savedGroup = await confessionGroup.save();
        res.status(201).json({
            success: true,
            data: savedGroup
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all confession groups
module.exports.getAllConfessionGroups = async (req, res) => {
    try {
        const confessionGroups = await ConfessionGroup.find()
            .populate('createdBy', 'username')
            .populate('members', 'username')
            .populate('confessions');
        
        res.status(200).json({
            success: true,
            data: confessionGroups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single confession group by ID
module.exports.getConfessionGroup = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findById(req.params.id)
            .populate('createdBy', 'username')
            .populate('members', 'username')
            .populate('confessions');

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: 'Confession group not found'
            });
        }

        res.status(200).json({
            success: true,
            data: confessionGroup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update confession group
module.exports.updateConfessionGroup = async (req, res) => {
    try {
        const { name, description, isPublic } = req.body;
        
        const confessionGroup = await ConfessionGroup.findByIdAndUpdate(
            req.params.id,
            { name, description, isPublic },
            { new: true, runValidators: true }
        );

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: 'Confession group not found'
            });
        }

        res.status(200).json({
            success: true,
            data: confessionGroup
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete confession group
module.exports.deleteConfessionGroup = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findByIdAndDelete(req.params.id);

        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: 'Confession group not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Confession group deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Add member to group
module.exports.addMember = async (req, res) => {
    try {
        const confessionGroup = await ConfessionGroup.findById(req.params.id);
        
        if (!confessionGroup) {
            return res.status(404).json({
                success: false,
                message: 'Confession group not found'
            });
        }

        confessionGroup.members.push(req.body.userId);
        await confessionGroup.save();

        res.status(200).json({
            success: true,
            data: confessionGroup
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};