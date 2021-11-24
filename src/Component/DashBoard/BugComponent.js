import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BugComponent = (data) => {
    const [status , setStatus] = useState(`${data.data?.status}`)
    console.log("ggsggsggsjfgsjgfsf",status);
    // let set = setStatus(`$`);
    console.log("ggsggsggsjfgsjgfsf",status , data.data?.status);

    //posting status

    const datass ={ 
        status : status,
    }
    const handleSubmit = (e) => {
        
        fetch(`https://ancient-plateau-89548.herokuapp.com/update/${data.data._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(datass)
        })
        .then(res => res.json())
        .then(result => {
               alert("Status Updateed")
        }, [status])
    
        e.preventDefault();
      };

    return (
        <div className="border-2 border-black	border-dashed mx-5 my-5 px-3 py-3">
            <h1>{data.data._id}</h1>
            <Link to={"/bug/"+data.data._id}><h1 className="font-bold cursor-pointer">{data.data.title}</h1></Link>
            <h1>{data.data.description}</h1>
            <h1>{data.data.Email}</h1>
            <h1>{data.data.status}</h1>
            <img className="w-2/4" src={data.data.image}></img>
            <select onChange={(e) => setStatus(e.target.value)} value ={data.data.status}  id = "dropdown">
                <option value="UnderReview">Under Review</option>
                <option value="Planned">Planned</option>
                <option value="InProgress">In Progress</option>
                <option value="Complete">Complete</option>
            </select>
            <button className="ml-8 bg-red-300 p-2 rounded-lg" onClick={handleSubmit} >Update</button>
            <h1>{data.data.vote}</h1>
        </div>
    );
};

export default BugComponent;