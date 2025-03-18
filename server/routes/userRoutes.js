const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes
router.use(verifyToken);

// Create a new confession
router.post("/confession", userController.createConfession);

// Get all confessions in a group
router.get("/confession/group/:groupId", userController.getConfessionsByGroup);

// Like/unlike a confession
router.post("/confession/:confessionId/like", userController.likeConfession);

// Add a comment to a confession
router.post("/confession/:confessionId/comment", userController.addComment);

// Delete a confession
router.delete("/confession/:confessionId", userController.deleteConfession);

module.exports = router;
