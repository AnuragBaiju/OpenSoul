import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { getConfessionGroups, getStudents } from "../../apis/adminApis";
import { checkAuthStatus } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [newStudent, setNewStudent] = useState({ studentId: "", name: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

   
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };

    // Fetch data (replace with your API base URL)
    const API_BASE_URL = "http://localhost:4000/admin"; // Adjust as needed

    useEffect(() => {
        fetchGroups();
        fetchStudents();
    }, []);

    const fetchGroups = async () => {
        const res = await getConfessionGroups();
        console.log(res);
        setGroups(res.data);
    };

    const fetchStudents = async () => {
        const res = await getStudents();
        console.log(res);
        setStudents(res.users);
    };

    const fetchGroupConfessions = async (groupId) => {
        const res = await axios.get(`${API_BASE_URL}/confession-group/${groupId}`);
        setSelectedGroup(res.data.data);
    };

    // Handlers
    const deleteConfession = async (groupId, confessionId) => {
        // Assuming confessions are nested in group data
        await axios.delete(`${API_BASE_URL}/confession-group/${groupId}/confession/${confessionId}`);
        fetchGroupConfessions(groupId);
    };

    const createStudent = async (e) => {
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/student`, newStudent);
        setNewStudent({ studentId: "", name: "" });
        setIsModalOpen(false);
        fetchStudents();
    };

    const blockStudent = async (studentId) => {
        await axios.put(`${API_BASE_URL}/student/${studentId}`, { blocked: true });
        fetchStudents();
    };

    const deleteGroup = async (groupId) => {
        await axios.delete(`${API_BASE_URL}/confession-group/${groupId}`);
        fetchGroups();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-700 to-black  py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome {user?.username}</h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Confession Groups */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">Confession Groups</h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {groups?.map((group) => (
                                <div
                                    key={group._id}
                                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                                >
                                    <span
                                        className="text-green-700 cursor-pointer hover:underline"
                                        onClick={() => fetchGroupConfessions(group._id)}
                                    >
                                        {group.name}
                                    </span>
                                    <button
                                        onClick={() => deleteGroup(group.id)}
                                        className="text-red-500 cursor-pointer hover:scale-110 transition duration-300 hover:text-red-600"
                                    >
                                        <FaTrashCan size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Selected Group Confessions */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">
                            {selectedGroup ? `${selectedGroup.name} Confessions` : "Select a Group"}
                        </h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {selectedGroup?.confessions?.map((conf) => (
                                <div
                                    key={conf.id}
                                    className="p-4 bg-green-50 rounded-lg flex justify-between items-start"
                                >
                                    <div>
                                        <p className="text-gray-800">{conf.text}</p>
                                        <p className="text-sm text-gray-500">By: {conf.author}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteConfession(selectedGroup.id, conf.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )) || <p className="text-gray-500">Select a group to view confessions.</p>}
                        </div>
                    </motion.div>

                    {/* Students Management */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 lg:col-span-3"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-green-800">Students</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Add Student
                            </button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {students.map((student) => (
                                <div
                                    key={student._id}
                                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                                >
                                    <div>
                                        <p className="text-green-700">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.studentId}</p>
                                    </div>
                                    <button
                                        onClick={() => blockStudent(student.id)}
                                        className={`px-3 py-1 rounded-lg ${
                                            student.blocked
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-red-500 text-white hover:bg-red-600"
                                        } transition-colors`}
                                        disabled={student.blocked}
                                    >
                                        {student.blocked ? "Blocked" : "Block"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Add Student Modal */}
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-green-800 mb-4">Add New Student</h3>
                            <form onSubmit={createStudent} className="space-y-4">
                                <div>
                                    <label className="block text-green-700 font-medium mb-1">Student ID</label>
                                    <input
                                        type="text"
                                        value={newStudent.studentId}
                                        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                                        className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-green-700 font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={newStudent.name}
                                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                        className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
