import React from "react";
import campusSecret from "/src/assets/campus_secret.jpg";
import domLife from "/src/assets/dom_life.jpg";
import examStress from "/src/assets/exam_stress.jpg";
import whispering from "/src/assets/whispering.jpg";

const ConfessionGroupCard = ({ group }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="relative group rounded-xl overflow-hidden text-white shadow-lg transition-all duration-700 h-full flex flex-col justify-between">
                {/* Background Image Layer */}

                <img
                    src={group?.bgImage}
                    alt={`${group?.name} background`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-110"
                    loading="lazy" // Native lazy loading
                />

                {/* Foreground Content */}
                <div className="relative font-semibold bg-[rgba(29,28,28,0.6)] w-full h-full p-6 flex flex-col justify-between">
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold mb-2 line-clamp-1">{group?.name}</h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{group?.description}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-white">
                        <span>Created by: {group?.createdBy.substring(0, 8)}...</span>
                        <button className=" hover:scale-105  bg-gradient-to-br from-blue-600 to-blue-900 whitespace-nowrap bg-opacity-20 duration-300 cursor-pointer transition hover:bg-opacity-30 px-3 py-1 rounded-md">
                            Join Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfessionGroupCard;
