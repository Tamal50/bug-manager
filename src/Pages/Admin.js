import React, { useEffect, useState } from 'react';
import BugComponent from '../Component/DashBoard/BugComponent';
import Navbar from '../Component/HomeComponent/Navbar';

const Admin = () => {
    
  // geting comments

  const [bugs, setbugs] = useState([{}]);
  useEffect(() => {
    fetch(`https://ancient-plateau-89548.herokuapp.com/bugs`)
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