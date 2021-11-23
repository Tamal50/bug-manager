import React, { useState } from 'react';
import Navbar from '../HomeComponent/Navbar';
import From from './From';



const Login = () => {




    return (
        <div className="p-24 h-screen w-screen bg-gradient-to-r from-blue-400 via-purple-500 to-blue-700">
            <Navbar />
            <From  />
            {/* <h1 className="w-1/3 m-2 p-4 bg-white">Google</h1>
            <div className="w-1/3 justify-center align-middle" >
                <input className="m-2 p-4" type="email" placeholder="Enter your email address"></input>
                <input className="m-2 p-4" type="password" placeholder="Enter your password"></input> 
                <div className="flex flex-row">
                <h1 className="m-2 p-4 bg-white">Register</h1>
                <h1 className="m-2 p-4 bg-black text-white">Login</h1>
                </div>
            </div> */}
        </div>
    );
};

export default Login;