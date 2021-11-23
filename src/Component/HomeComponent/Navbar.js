import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navbar = () => {
    const [logInUser, setLogInUser] = useContext(UserContext);
    const [isAdmin , setIsAdmin] = useState(false)

    //.........Checking Admin.........
    useEffect(() => {
        fetch('http://localhost:5000/isAdmin', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email: logInUser?.email })
        })
        .then(res => res.json())
        .then(data => setIsAdmin(data))
    })
    console.log("CommentData CommentData", isAdmin);

    return (
        <div className="bg-red-900 h-40 w-full">
            
            <div className="flex flex-row h-10">
                <p className="mx-auto text-white">E-mail : {logInUser.email}</p>
                {
                    isAdmin && <Link  className="mx-auto text-white "to="/dashboard"> <p>Admin Panel</p></ Link>
                }
                {
                    logInUser ? <Link className="mx-auto text-white" to="/login"> <p>LogOut</p></ Link> :  <div><Link to="/login"> <p className="mx-auto text-white">Login</p></ Link>
                    <p className="mx-auto text-white">Signup</p></div>
                }
            </div>
            <div className="h-20 flex">
                <h1 className="text-4xl mx-auto italic font-bold text-white"><Link to="/"><span>Bugmanager...</span></Link></h1>
            </div>
            {/* <div className="flex flex-row">
                <p className="mx-auto font-bold text-black">Under Review</p>
                <p className="mx-auto font-bold text-yellow-400">Planned</p>
                <p className="mx-auto font-bold text-green-600">In Progress</p>
                <p className="mx-auto font-bold text-white">Complete</p>
            </div> */}
        </div>
    );
};

export default Navbar;