import React, { useEffect, useState } from 'react';
import Bugui from './Bugui';

const Filter = () => {
    const [status, setStatus] = useState("")
    console.log("setStatussetStatus" , status)

    // geting data from
    const [bugs, setBugs] = useState([])
    //Fetching Product.............................................
        useEffect(() => {
            fetch(`http://localhost:5000/bugs/status/${status}`)
                .then(res => res.json())
                .then(data => setBugs(data))
        }, [status])
        console.log("data data" , bugs)
    


    return (
        <div>
            <h1 className="">Filter By Status</h1>
            <select onChange={(e) => setStatus(e.target.value)} id = "dropdown">
                <option value="UnderReview">Under Review</option>
                <option value="Planned">Planned</option>
                <option value="InProgress">In Progress</option>
                <option value="Complete">Complete</option>
            </select>
            {
                bugs.map((item) =>(
                    <Bugui Data={item} />
                ))
            }
            {/* <button onClick={handleSubmit}>Filter</button> */}
        </div>
    );
};

export default Filter;