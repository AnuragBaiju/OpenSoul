import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

import { getGroupById, postComment, postConfession } from "../../apis/userApis";

// Sample emoji icons (replace with real emoji SVGs or a library like react-emoji-picker)
const emojis = ["👍", "❤️", "😂", "😢", "😡"];

const GroupConfessionPage = () => {
    const [group, setGroup] = useState({});
    const [newConfession, setNewConfession] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [confessions, setConfessions] = useState([]);
    const [showConfessionForm, setShowConfessionForm] = useState(false);

    const { groupId } = useParams();

    useEffect(() => {
        const fetchGroup = async () => {
            const data = await getGroupById(groupId);
            console.log(data);
            setGroup(data.confessionGroup);
            setConfessions(data.confessionGroup?.confessions);
        };

        fetchGroup();
    }, [groupId]);

    // console.log(confessions);

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
        hover: { scale: 1.01, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
        bounce: { y: [-5, 5, -5, 0], transition: { duration: 0.6, repeat: 1 } },
    };

    const confessionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    // Handle confession submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateConfession(newConfession);
        if (validationError) {
            setError(validationError);
            return;
        }

        const data = await postConfession(groupId, newConfession);
        console.log(data);

        setIsSubmitting(true);

        setConfessions([data, ...confessions]);
        setNewConfession("");
        setIsAnonymous(false);
        setIsSubmitting(false);
        setError("");
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
    const handleComment = async (confessionId, commentText) => {
        if (!commentText.trim()) return;

        const confession = await postComment(confessionId, commentText);
        console.log(confession);

        setConfessions((prev) => prev.map((conf) => (conf._id === confessionId ? confession : conf)));
    };

    return (
        <div className="min-h-screen relative w-full bg-gradient-to-t bg-white py-12">
            <motion.div
                className="container space-y-1 bg-white  mx-auto px-4"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Group Header */}
                <div className=" shadow-xl rounded-lg border-b-4  border-white p-3">
                    <h1 className="text-3xl font-bold  font-mono ">{group?.name} </h1>
                    <p className=" text-sm italic">{group?.members?.length} members</p>
                </div>

                {/* New Confession Form */}
                {showConfessionForm && (
                    <div className="fixed inset-0 bg-[rgba(48,48,46,0.5)] flex items-center justify-center z-50">
                        <div className="bg-white p-6 mb-8 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
                            <h2 className="text-xl font-semibold mb-4">Post a Confession</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                                    <textarea
                                        value={newConfession}
                                        onChange={(e) => {
                                            setNewConfession(e.target.value);
                                            setError(validateConfession(e.target.value));
                                        }}
                                        className={`w-full p-3 border ${
                                            error ? "border-red-400" : "border-black"
                                        } rounded-lg resize-none focus:outline-none`}
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

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting || !newConfession || error}
                                    className={`w-full py-3 rounded-lg font-semibold text-black ${
                                        isSubmitting || error
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[rgb(157,255,45)] transition duration-300"
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
                    </div>
                )}

                {/* Existing Confessions */}
                <div className="space-y-6  px-1 sm:px-4 md:px-10 lg:px-[100px]">
                    {confessions
                        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((conf) => (
                            <motion.div
                                key={conf._id}
                                className=" text-gray-800 flex gap-2  p-6"
                                variants={confessionVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="  w-12 flex justify-center">
                                    <div className=" bg-amber-200 w-10 h-10 rounded-full "></div>
                                </div>
                                <div className=" flex flex-col gap-2">
                                    <div className=" flex my-1 justify-between">
                                        <p className="text-lg text-black">{conf?.user?.name}</p>
                                        <p className="text-sm text-gray-500">30 min</p>
                                    </div>
                                    <p className="mb-2 font-bold">{conf.text}</p>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt tempore quia
                                        harum illo cum amet, ab reprehenderit est ratione nobis natus nesciunt
                                        recusandae, dignissimos iusto ipsum odio voluptatem libero voluptas.
                                    </p>
                                    <div className=" flex gap-5 mt-2">
                                        <FaHeart color="#D4D4D4" size={25} /> <FaComment color="#D4D4D4" size={25} />
                                    </div>
                                </div>

                                {/* Comments */}
                                {/* <div className="mt-4 border-slate-200 shadow-inner border p-2 rounded">
                                    <h4 className="text-sm font-semibold ">Comments ({conf.comments?.length})</h4>
                                    <ul className="mt-2 space-y-2">
                                        {conf.comments?.map((comment, idx) => (
                                            <li key={comment?._id} className="text-sm text-gray-700">
                                                {comment.user?.name}- {comment.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const commentText = e.target[0].value;
                                            handleComment(conf._id, commentText);
                                            e.target[0].value = "";
                                        }}
                                        className="mt-2   flex flex-col border-green-400 rounded gap-4 p-2 sm:flex-row "
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            className="flex-1 p-2   rounded-lg focus:outline-none  focus:border-white"
                                        />
                                        <button
                                            type="submit"
                                            className="  w-full sm:w-fit flex justify-center items-center  bg-[rgb(157,255,45)]  text-black px-4 py-2 rounded-lg  hover:text-black transition-colors"
                                        >
                                            <MdSend />
                                        </button>
                                    </form>
                                </div> */}
                            </motion.div>
                        ))}
                </div>
            </motion.div>
            <motion.div
                className=" sticky bottom-16  py-2 text-white font-semibold pr-20 flex justify-end "
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                <button
                    onClick={() => setShowConfessionForm(true)}
                    className="bg-[#271F44] py-2 flex gap-1 justify-center items-center  rounded-full text-white font-semibold px-5 cursor-pointer "
                >
                    <IoMdAdd size={20} /> Create Post
                </button>
            </motion.div>
        </div>
    );
};

// Example usage with a group name passed as a prop

export default GroupConfessionPage;
