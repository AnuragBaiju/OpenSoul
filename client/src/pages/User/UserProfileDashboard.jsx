import React from "react";

// Placeholder image imports (replace with your own)
import groupImg1 from "/src/assets/campus_secret.jpg";
import groupImg2 from "/src/assets/dom_life.jpg";
import ActivityFeed from "../../components/user/ActivityFeed";
import SuggestedGroups from "../../components/user/SuggestedGroups";
import UserGroups from "../../components/user/UserGroups";
import UserDetails from "../../components/user/UserDetails";
import { useSelector } from "react-redux";

// Sample Components

// Main Dashboard Component
const UserProfileDashboard = () => {

    const {user} = useSelector((state)=>state.auth)
   
    const userGroups = [
        { name: "Campus Secrets", members: 450, image: groupImg1 },
        { name: "Dorm Life Diaries", members: 230, image: groupImg2 },
    ];

    const suggestedGroups = [
        { name: "Late Night Thoughts", members: 320, image: groupImg1 },
        { name: "Exam Stress Confessions", members: 180, image: groupImg2 },
    ];

    return (
        <div className="min-h-screen  py-8">
            <div className="container mx-auto px-4">
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* User Details - Left Column */}
                    <div className="lg:col-span-1">
                        <UserDetails user={user} />
                    </div>

                    {/* Middle and Right Columns */}
                    <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* User Groups */}
                        <UserGroups groups={userGroups} />

                        {/* Suggested Groups */}
                        <SuggestedGroups suggestedGroups={suggestedGroups} />

                        {/* Activity Feed (spans full width on smaller screens) */}
                        <div className="md:col-span-2">
                            <ActivityFeed />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileDashboard;
