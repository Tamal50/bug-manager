import React, { useEffect, useState } from 'react';
import Bugui from './Bugui';

const ListData = () => {
    const [bugs, setBugs] = useState([])
    //Fetching Product.............................................
    useEffect(() => {
        fetch(`http://localhost:5000/bugs`)
            .then(res => res.json())
            .then(data => setBugs(data))
    }, [])
    console.log("data data" , bugs)
    return (
        <div className="h-40 w-3/4">
            <div className="flex flex-row bg-red-500">
                <p className="mx-auto font-bold text-black">Under Review</p>
                <p className="mx-auto font-bold text-yellow-400">Planned</p>
                <p className="mx-auto font-bold text-green-600">In Progress</p>
                <p className="mx-auto font-bold text-white">Complete</p>
            </div>
            {
                bugs.map((item, index) =>(
                    <Bugui Data={item} />
                ))
            }
        </div>
    );
};

export default ListData;