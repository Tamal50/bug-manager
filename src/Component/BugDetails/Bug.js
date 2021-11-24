import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../HomeComponent/Navbar";
import Comments from "./Comments";
import Voterlist from "./Voterlist";

const Bug = () => {
  const { id } = useParams();
  const [logInUser, setLogInUser] = useContext(UserContext);

  // facings data
  const [bugsss, setbugsss] = useState([]);
  const [voters , setvoter] = useState([]);

  useEffect(() => {
    fetch(`https://ancient-plateau-89548.herokuapp.com/bug/${id}`)
      .then((res) => res.json())
      .then((data) => setbugsss(data));      
  },[]);
  console.log("console", bugsss);

  // Image load

  const [imageURL, setImageURL] = useState(null);
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

  // state

  const [data2, setdata] = useState({
    comment: "",
  });

  const handleOnChange = (e) => {
    const dataInfo = {
      ...data2,
    };
    dataInfo[e.target.name] = e.target.value;

    setdata(dataInfo);
  };

  //Post Data
  const Data = {
    bug: bugsss,
    image: imageURL,
    Email: logInUser.email,
    comment: data2,
    date: new Date(),
  };
  console.log("check-----Data", Data);

  // Posting to databases

  const handleSubmit = (e) => {
    const url = `https://ancient-plateau-89548.herokuapp.com/addcomment`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("comment added successfully.");
          // e.target.reset();
        }
      });

    e.preventDefault();
  };

  // geting comments

  const [CommentData, setCommentData] = useState([{}]);
  useEffect(() => {
    fetch(`https://ancient-plateau-89548.herokuapp.com/comments`)
      .then((res) => res.json())
      .then((data) => setCommentData(data));
  }, []);
  console.log("CommentData CommentData 4", voters);

  

  return (
    <div>
      <Navbar />
       
      <Voterlist Data={bugsss} />
      
          
      <h1 className="text-3xl my-4 mx-4">Bug Report by : {bugsss?.Email}</h1>
      <div className="flex flex-row ml-4"><h1 className="border-4 py-4 w-12 px-4">{bugsss.voter?.length}</h1>
      <div className="flex flex-col pl-4"><h1>{bugsss?.title} </h1>
      <h1>{bugsss?.description}</h1></div></div>
      <h1><span className="font-bold">Bug Report Date : </span>{(new Date(bugsss.date).toLocaleDateString())} </h1>
      {bugsss.image && <img className="w-1/3 h-1/3" src={bugsss?.image}></img>}
      

      <h1 className="text-xl my-4 mx-4 font-bold">Start commenting and Update</h1>
      <input
        onBlur={handleOnChange}
        name="comment"
        className="m-2 p-4 border-2 border-black"
        placeholder="Leave a comment"
        type="text"
      ></input>
      {imageURL && <img src={imageURL} className="w-1/3 h-1/3"></img>}
      <input
        className="m-2 p-4"
        name="image"
        placeholder="image"
        onChange={handleImageUpload}
        type="file"
      ></input>
      <button onClick={handleSubmit}  className=" bg-gray-300 p-4">
        Submit Comment
      </button>

      <h1 className="text-md my-4 mx-4 font-bold">Start commenting and Update</h1>
     
      {CommentData.map((item) => (
        
        <Comments Data={item} bugid ={bugsss._id} />
      ))}
    </div>
  );
};

export default Bug;
