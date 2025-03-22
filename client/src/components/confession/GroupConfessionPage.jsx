import React, { useState } from "react";
import { motion } from "framer-motion";

// Sample emoji icons (replace with real emoji SVGs or a library like react-emoji-picker)
const emojis = ["👍", "❤️", "😂", "😢", "😡"];

const GroupConfessionPage = ({ groupName }) => {
    const [newConfession, setNewConfession] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [confessions, setConfessions] = useState([
        {
            id: 1,
            text: "I stayed up all night cramming for the exam and still failed!",
            author: "Anonymous",
            reactions: { "👍": 5, "❤️": 2, "😂": 3 },
            comments: ["Oof, been there!", "You’ll get it next time!"],
        },
        {
            id: 2,
            text: "The cafeteria food is secretly amazing this week.",
            author: "Student123",
            reactions: { "👍": 10, "❤️": 4 },
            comments: ["Really? I need to try it!"],
        },
    ]);

    // Validation
    const MIN_CONFESSION_LENGTH = 10;
    const validateConfession = (text) =>
        text.length < MIN_CONFESSION_LENGTH ? `Confession must be at least ${MIN_CONFESSION_LENGTH} characters.` : "";

    // Animation variants
    const pageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
        bounce: { y: [-5, 5, -5, 0], transition: { duration: 0.6, repeat: 1 } },
    };

    const confessionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    // Handle confession submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateConfession(newConfession);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const newConf = {
                id: confessions.length + 1,
                text: newConfession,
                author: isAnonymous ? "Anonymous" : "You",
                reactions: {},
                comments: [],
            };
            setConfessions([newConf, ...confessions]);
            setNewConfession("");
            setIsAnonymous(false);
            setIsSubmitting(false);
            setError("");
        }, 1000);
    };

    // Handle reaction
    const handleReaction = (confessionId, emoji) => {
        setConfessions((prev) =>
            prev.map((conf) =>
                conf.id === confessionId
                    ? {
                          ...conf,
                          reactions: {
                              ...conf.reactions,
                              [emoji]: (conf.reactions[emoji] || 0) + 1,
                          },
                      }
                    : conf
            )
        );
    };

    // Handle comment submission
    const handleComment = (confessionId, commentText) => {
        if (!commentText.trim()) return;
        setConfessions((prev) =>
            prev.map((conf) =>
                conf.id === confessionId ? { ...conf, comments: [...conf.comments, commentText] } : conf
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-yellow-50 to-green-100 py-12">
            <motion.div className="container mx-auto px-4" variants={pageVariants} initial="hidden" animate="visible">
                {/* Group Header */}
                <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">{groupName} Confessions</h1>

                {/* New Confession Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-green-600">
                    <h2 className="text-xl font-semibold text-green-800 mb-4">Post a Confession</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                            <textarea
                                value={newConfession}
                                onChange={(e) => {
                                    setNewConfession(e.target.value);
                                    setError(validateConfession(e.target.value));
                                }}
                                className={`w-full p-3 border ${
                                    error ? "border-red-400" : "border-green-300"
                                } rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500`}
                                rows="4"
                                placeholder="What's on your mind?"
                                maxLength={500}
                                required
                            />
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-sm text-gray-500">{newConfession.length}/500 characters</p>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="anonymous" className="text-green-700 font-medium">
                                    Post Anonymously
                                </label>
                            </div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting || !newConfession || error}
                            className={`w-full py-3 rounded-lg font-semibold text-white ${
                                isSubmitting || error
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            } transition-colors`}
                            variants={buttonVariants}
                            whileHover={!isSubmitting && !error ? "hover" : ""}
                            whileTap={!isSubmitting && !error ? "tap" : ""}
                            animate={!isSubmitting && newConfession && !error ? "bounce" : ""}
                        >
                            {isSubmitting ? "Posting..." : "Post Confession"}
                        </motion.button>
                    </form>
                </div>

                {/* Existing Confessions */}
                <div className="space-y-6">
                    {confessions.map((conf) => (
                        <motion.div
                            key={conf.id}
                            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600"
                            variants={confessionVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-gray-800 mb-2">{conf.text}</p>
                            <p className="text-sm text-gray-500">Posted by: {conf.author}</p>

                            {/* Reactions */}
                            <div className="flex space-x-2 mt-4">
                                {emojis.map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => handleReaction(conf.id, emoji)}
                                        className="text-lg hover:scale-110 transition-transform"
                                    >
                                        {emoji}{" "}
                                        <span className="text-sm text-gray-600">{conf.reactions[emoji] || 0}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Comments */}
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-green-800">
                                    Comments ({conf.comments.length})
                                </h4>
                                <ul className="mt-2 space-y-2">
                                    {conf.comments.map((comment, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">
                                            - {comment}
                                        </li>
                                    ))}
                                </ul>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const commentText = e.target[0].value;
                                        handleComment(conf.id, commentText);
                                        e.target[0].value = "";
                                    }}
                                    className="mt-2 flex space-x-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="flex-1 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Comment
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// Example usage with a group name passed as a prop

export default GroupConfessionPage;
