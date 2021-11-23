import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BugComponent = (data) => {
    const [status , setStatus] = useState("")
    console.log("ggsggsggsjfgsjgfsf",status)

    //posting status
    const datass ={ 
        status : status,
    }
    const handleSubmit = (e) => {
        setStatus(e.target.value) 
        fetch(`http://localhost:5000/update/${data.data._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(datass)
        })
        .then(res => res.json())
        .then(result => {
               alert("Status Updateed")
        })
    
        e.preventDefault();
      };

    return (
        <div className="border-2 border-black	border-dashed mx-5 my-5 px-3 py-3">
            <h1>{data.data._id}</h1>
            <Link to={"/bug/"+data.data._id}><h1 className="font-bold cursor-pointer">{data.data.title}</h1></Link>
            <h1>{data.data.description}</h1>
            <h1>{data.data.Email}</h1>
            <img className="w-2/4" src={data.data.image}></img>
            <select onChange={handleSubmit} id = "dropdown">
                <option value="Under Review">Under Review</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
            </select>
            <h1>{data.data.vote}</h1>
        </div>
    );
};

export default BugComponent;