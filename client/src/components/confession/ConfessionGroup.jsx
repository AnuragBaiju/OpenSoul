import ConfessionGroupCard from "./ConfessionGroupCard";

const ConfessionGroups = ({ groups, allGroups }) => {
    console.log(groups);
    return (
        <div className="container mx-auto px-4 py-8     min-h-screen">
            <h1 className="text-3xl font- mt-8 mb-2  font-mono">{allGroups ? "All groups" : "Other groups"}</h1>
            <div className="flex flex-wrap -mx-4">
                {groups.map((group) => (
                    <ConfessionGroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default ConfessionGroups;
