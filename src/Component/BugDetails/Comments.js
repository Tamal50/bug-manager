import React from 'react';

const Comments = (Data) => {
    console.log(" Data Data", Data)
    return (
        <div>
            
            {
                Data.bugid === Data.Data.bugid && <div> <h1><span className="font-bold" >User : </span> {Data.Data.CommeterEmail}</h1>
                <h1><span className="font-bold" >Comment : </span> {Data.Data.Comment}</h1>
                <img src={Data.Data.commentimage}></img></div>
            }

        </div>
    );
};

export default Comments;