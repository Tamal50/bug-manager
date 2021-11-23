import React, { useState } from "react";
import { Link } from 'react-router-dom';


const Bugui = (Data) => {
  const item = Data.Data;
  const [postVote , setPostVote] =useState()
  console.log("number" , postVote)
  let voter = false ;
  const handleOnChange = ()  => {
      if(voter){
       const  min = item.vote - 1
       setPostVote(min);
      };
      if(voter === false){
        const plus = item.vote + 1
        setPostVote(plus)
      };
  }
  return (
    <div className="w-full flex flex-row">
      <div className="mx-2 my-1 w-8 border-2 flex flex-col p-2 text-xl">
        <p onClick={handleOnChange}>+</p>
        <p>{item.vote}</p>
      </div>
      <div className="w-10/12 flex flex-col gap-2">
      <p className="text-sm font-bold   text-red-500">{item.status}</p>

        <p className="text-md text-gray-800 cursor-pointer"><Link to={"/bug/"+item._id}>{item.title} ?</Link></p>
        <p className="text-sm text-gray-500">{item.description}</p>

      </div>
      <div className="w-1/12">0</div>
    </div>
  );
};

export default Bugui;
