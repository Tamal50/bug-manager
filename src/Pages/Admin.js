import React, { useEffect, useState } from 'react';
import BugComponent from '../Component/DashBoard/BugComponent';
import Navbar from '../Component/HomeComponent/Navbar';

const Admin = () => {
    
  // geting comments

  const [bugs, setbugs] = useState([{}]);
  useEffect(() => {
    fetch(`http://localhost:5000/bugs`)
      .then((res) => res.json())
      .then((data) => setbugs(data));
  }, []);
  console.log("CommentData CommentData", bugs);
    return (
        <div className="w-screen">
            <Navbar />
            <div className="">
            {
                bugs.map((item) =>(
                    <BugComponent className="" data={item} />
                ))
            }
            </div>
        </div>
    );
};

export default Admin;