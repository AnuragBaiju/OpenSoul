const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const jwt = require("jsonwebtoken");

////////////////////////////////// LOGIN ///////////////////////////////

module.exports.studentLogin = async (req, res) => {
    try {
        const { studentId } = req.body;

        const user = await User.findOne({ studentId });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 🔥 Clear both admin and user tokens before setting the new one
        res.clearCookie("admin_token");
        res.clearCookie("user_token");

        res.cookie("user_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
