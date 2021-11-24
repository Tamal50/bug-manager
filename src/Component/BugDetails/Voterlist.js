import React from 'react';

const Voterlist = (props) => {
    console.log("Hello Hello 45",props.Data.voter)

    const data = props.Data.voter
    return (
        <div>
            {/* {
                data.map((voter) => {
                    return (
                    <h1>{voter.email}</h1> )
                })
            } */}
        </div>
    );
};

export default Voterlist;