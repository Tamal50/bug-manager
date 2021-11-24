import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

const From = () => {
  const [logInUser, setLogInUser] = useContext(UserContext);

  const [vote , setVote] = useState(0)
  const [imageURL, setImageURL] = useState(null)
  const [imageURLStatus, setImageURLStatus] = useState();
  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "c7c42b59b6af70b89d202802a28d7aef");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.url);
        setImageURLStatus(true);
        if (response) {
          alert("Image Uploaded Successfully");
        }
      })
      .catch(function (error) {});
  };
  const [bug, setBug] = useState({
    title: "",
    description: "",
    
    date: new Date(),
    
    vote: 0,
    
});

const voteeer = {
  email: "",
  isVoter: false,
 } 
const Data = {
  bug: bug,
  image : imageURL,
  Email : logInUser.email ,
  status : "UnderReview",
  voter: voteeer
}

  const handleSubmit = e => {
    

    const url = `https://ancient-plateau-89548.herokuapp.com/addbug`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert('Bug added successfully.')
                // e.target.reset();
            }
        })

    e.preventDefault();
}

const handleOnChange = (e) => {
  const bugInfo = {
      ...bug
    };
    bugInfo[e.target.name] = e.target.value;

    setBug(bugInfo);
}
console.log("data data" , bug)
console.log("data image" , imageURL)
console.log("data data" , Data)

  return (
    <div className=" w-1/4 bg-gray-300">
      <h3 className="text-xl font-bold text-center">Bug Report</h3>
      <h6 className="text-md p-2 text-center">
        Report bugs you've encountered on the Bugmanager website
      </h6>
      <input onBlur={handleOnChange}   name="title" placeholder="Title" type="text" className="w-80 h-20 m-5 "></input>
      <input  onBlur={handleOnChange} name="description" placeholder="Description" type="text" className="w-80 h-20 m-5 "></input>
      {
        imageURL && <img src={imageURL} />
      }
      <div className="flex flex-row gap-2 m-2">
        <input
          type="file"
          name="image"
          placeholder="image"
          onChange={handleImageUpload}
          className="w-28 mr-3 h-12"
        ></input>
        <button onClick={handleSubmit} className="w-32 bg-red-400 p-2 rounded-lg">Report buug</button>
      </div>
    </div>
  );
};

export default From;
