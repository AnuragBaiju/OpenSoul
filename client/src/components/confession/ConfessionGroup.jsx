import ConfessionGroupCard from "./ConfessionGroupCard";

const ConfessionGroups = () => {
    const groups = [
        {
            _id: "67d7ef07f44d02ffb6018c03",
            name: "Campus Secrets",
            description: "A place for students to share their deepest campus secrets anonymously…",
            createdBy: "67d3146a4b84e3829bf3aec5",
            isPublic: true,
        },
        {
            _id: "67d7ef07f44d02ffb6018c04",
            name: "Late Night Thoughts",
            description: "Confessions from those late-night study sessions.",
            createdBy: "67d3146a4b84e3829bf3aec5",
            isPublic: false,
        },
        {
            _id: "67d7ef07f44d02ffb6018c05",
            name: "Lecture Hall Whispers",
            description: "What really happens during those boring lectures.",
            createdBy: "67d3146a4b84e3829bf3aec5",
            isPublic: true,
        },
        {
            _id: "67d7ef07f44d02ffb6018c06",
            name: "Dorm Life Diaries",
            description: "Spill the tea about dorm experiences!",
            createdBy: "67d3146a4b84e3829bf3aec5",
            isPublic: true,
        },
        {
            _id: "67d7ef07f44d02ffb6018c07",
            name: "Exam Stress Confessions",
            description: "Let it all out about those stressful exam days.",
            createdBy: "67d3146a4b84e3829bf3aec5",
            isPublic: false,
        },
        
    ];

    return (
        <div className="container mt-[50px] mx-auto px-4 py-8  min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-white font-mono">Confession Groups</h1>
            <div className="flex flex-wrap -mx-4">
                {groups.map((group) => (
                    <ConfessionGroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default ConfessionGroups;
