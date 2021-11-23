import React from 'react';

const Comments = (Data) => {
    console.log(" Data Data", Data.Data)
    return (
        <div>
            <h1>Comments</h1>
            <h1>Comments</h1>
            <h1>{Data.Data.CommeterEmail}?</h1>
            <h1>{Data.Data.Comment}?</h1>
            <h1>{Data.Data.commentimage}?</h1>

        </div>
    );
};

export default Comments;