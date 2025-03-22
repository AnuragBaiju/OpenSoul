import avatar from "/src/assets/campus_secret.jpg";

const UserDetails = ({ user }) => (
    <div className="bg-slate-100  rounded-lg h-full shadow-lg p-6 flex flex-col justify-center items-center">
        <img src={avatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4 object-cover" loading="lazy" />
        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-gray-600"><span>StudentID : </span>{user?.studentId}</p>
        {/* <p className="text-gray-500 text-sm mt-2">{user.bio}</p> */}
        
        <button className="mt-6 ring-2  text-black rounded-full px-4 py-2  hover:bg-blue-600 transition-colors">
            Edit Profile
        </button>
    </div>
);

export default UserDetails;
