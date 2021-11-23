import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Navbar from "../HomeComponent/Navbar";
import Comments from "./Comments";

const Bug = () => {
  const { id } = useParams();
  const [logInUser, setLogInUser] = useContext(UserContext);

  // facings data

  const [bug, setbug] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/bug/${id}`)
      .then((res) => res.json())
      .then((data) => setbug(data));
  }, []);
  console.log("console", id);

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

  const [data, setdata] = useState({
    comment: "",
  });

  const handleOnChange = (e) => {
    const dataInfo = {
      ...data,
    };
    dataInfo[e.target.name] = e.target.value;

    setdata(dataInfo);
  };

  //Post Data

  const Data = {
    bug: bug,
    image: imageURL,
    Email: logInUser.email,
    comment: data,
    date: new Date(),
  };
  console.log("check-----Data", Data);

  // Posting to databases

  const handleSubmit = (e) => {
    const url = `http://localhost:5000/addcomment`;
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
    fetch(`http://localhost:5000/comments`)
      .then((res) => res.json())
      .then((data) => setCommentData(data));
  }, []);
  console.log("CommentData CommentData", CommentData);

  return (
    <div>
      <Navbar />
      <h1>{bug.vote}</h1>
      <h1>{bug?.title} ?</h1>
      <h1>{bug?.description} ?</h1>
      <h1>{bug?.Email} ?</h1>
      <h1>{bug?.status} ?</h1>
      <h1>{bug?.status} ?</h1>
      <h1>{bug?.date} ?</h1>
      <img className="w-1/3 h-1/3" src={bug?.image}></img>

      <h1>Start commenting and Update</h1>
      <input
        onBlur={handleOnChange}
        name="comment"
        className="m-2 p-4"
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
      <button onClick={handleSubmit}  className="">
        Submit Comment
      </button>
      {CommentData.map((item) => (
        <Comments Data={item} />
      ))}
    </div>
  );
};

export default Bug;
