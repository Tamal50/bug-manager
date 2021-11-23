import React from 'react';
import Filter from '../Component/HomeComponent/Filter';
import From from '../Component/HomeComponent/From';
import ListData from '../Component/HomeComponent/ListData';
import Navbar from '../Component/HomeComponent/Navbar';

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <From />
                <div className="flex flex-col">
                    <Filter />
                    <h1 className="text-3xl font-bold m-4 p-2">All Bugs</h1>
                    <ListData />
                </div>
            </div>
        </div>
    );
};

export default Homepage;