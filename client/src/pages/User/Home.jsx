import React from "react";
import ConfessionGroups from "../../components/confession/ConfessionGroup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    return (
        <div className=" bg-black bg-gradient-to-bl from-current to-blue-500">
            <Header/>
            <ConfessionGroups />
            <Footer/>
        </div>
    );
};

export default Home;
