const UserGroups = ({ groups }) => (
    <div className="bg-slate-100 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Groups</h3>
        <div className="space-y-4">
            {groups?.map((group, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <img
                        src={group.bgImage}
                        alt={group.name}
                        className="w-12 h-12 rounded-md object-cover"
                        loading="lazy"
                    />
                    <div>
                        <h4 className="text-gray-800 font-medium">{group.name}</h4>
                        <p className="text-gray-500 text-sm">{group.members} Members</p>
                    </div>
                </div>
            ))}
        </div>
        <button className="mt-4 text-blue-500 hover:underline">View All</button>
    </div>
);

export default UserGroups;
    