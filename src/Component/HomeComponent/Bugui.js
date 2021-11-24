import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../App";


const Bugui = (Data) => {
  const [logInUser, setLogInUser] = useContext(UserContext);
  const item = Data.Data;
 
  
  const voter = {
    votert : {email  : logInUser.email,
    isVoter : true,}
  }
  const handleSubmit = (e) => {
        
    fetch(`https://ancient-plateau-89548.herokuapp.com/vote/${item._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(voter)
    })
    .then(res => res.json())
    .then(result => {
           alert("vote added")
    })

    e.preventDefault();
  };
 
  return (
    <div className="w-full flex flex-row">
      <div className="mx-2 my-1 w-8 border-2 flex flex-col p-2 text-xl cursor-pointer" onClick={handleSubmit}>
        <p>+</p>
        <p>{item.voter.length}</p>
      </div>
      <div className="w-10/12 flex flex-col gap-2">
      <p className="text-sm font-bold   text-red-500">{item.status === "UnderReview" ? "Under Review": ""} {item.status === "Planned" ? "Planned": ""} {item.status === "InProgress" ? "In Progress": ""}{item.status === "Complete" ? "Complete": ""}</p>

        <p className="text-md text-gray-800 cursor-pointer"><Link to={"/bug/"+item._id}>{item.title} ?</Link></p>
        <p className="text-sm text-gray-500">{item.description}</p>

      </div>
    </div>
  );
};

export default Bugui;
