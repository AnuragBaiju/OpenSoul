import React from "react";
import campusSecret from "/assets/campus_secret.jpg?url";
// import domLife from "../../assets/dom_life.jpg";
// import examStress from "../../assets/exam_stress.jpg";
// import whispering from "../../assets/whispering.jpg";

const ConfessionGroupCard = ({ group }) => {
    // Background styles based on group name/theme
    const getBackgroundStyle = (name) => {
        switch (name) {
            case "Campus Secrets":
                return campusSecret;
            case "Late Night Thoughts":
                return "bg-gradient-to-br from-gray-900 to-blue-900 bg-opacity-80";
            case "Lecture Hall Whispers":
                return "bg-gradient-to-br from-gray-800 to-green-900 bg-opacity-80";
            case "Dorm Life Diaries":
                return "bg-gradient-to-br from-orange-900 to-red-900 bg-opacity-80";
            case "Exam Stress Confessions":
                return "bg-gradient-to-br from-blue-900 to-teal-900 bg-opacity-80";
            default:
                return "bg-gradient-to-br from-gray-900 to-gray-700 bg-opacity-80";
        }
    };

    console.log(campusSecret);

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div
                // style={{backgroundImage:`url('/assets/campus_secret.jpg')`}}
                className={`rounded-xl bg-[url('/assets/campus_secret.jpg')] bg-center bg-cover overflow-hidden  text-white shadow-lg transform hover:bg-blend-screen transition-all duration-700 h-full flex flex-col justify-between`}
            >
                <div className=" bg-[rgba(79,78,78,0.4)] w-full h-full p-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                    group.isPublic
                                        ? "bg-green-500 bg-opacity-30 text-green-200"
                                        : "bg-red-500 bg-opacity-30 text-red-200"
                                }`}
                            >
                                {group.isPublic ? "Public" : "Private"}
                            </span>
                        </div>
                        <p className="text-gray-200 text-sm mb-4 line-clamp-3">{group.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-300">
                        <span>Created by: {group.createdBy.substring(0, 8)}...</span>
                        <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-md transition-colors">
                            Join Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfessionGroupCard;
