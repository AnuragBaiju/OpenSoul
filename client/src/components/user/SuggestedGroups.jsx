const SuggestedGroups = ({ suggestedGroups }) => (
    <div className="bg-slate-100 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggested Groups</h3>
        <div className="space-y-4">
            {suggestedGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <img
                        src={group.image}
                        alt={group.name}
                        className="w-12 h-12 rounded-md object-cover"
                        loading="lazy"
                    />
                    <div>
                        <h4 className="text-gray-800 font-medium">{group.name}</h4>
                        <p className="text-gray-500 text-sm">{group.members} Members</p>
                    </div>
                    <button className="ml-auto text-blue-500 hover:underline">Join</button>
                </div>
            ))}
        </div>
    </div>
);

export default SuggestedGroups;
