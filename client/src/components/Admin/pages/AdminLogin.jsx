import React from 'react';
import { useState } from 'react';
import img2 from './assets/bg.jpg';
import axios from "axios" // Background image



export default function AdminLogin() {
  

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    console.log("HIII");
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/admin/adminLogin",
      {
        params: {
          username: email,
          password: password
        }
      }
      );
      console.log(response.data);
      if(response.data.success){
        console.log("Login successful");
        window.location.href = "/admin";}
    } catch (error) {
      console.error("Error:", error);
    }
  }

   



  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="w-[420px] bg-transparent border-2 border-white/20 backdrop-blur-md shadow-lg text-white rounded-lg p-8">
        <form action="" onSubmit={ handleSubmit}>
          <h1 className="text-3xl text-center mb-6">Login</h1>
          <div className="relative w-full h-[50px] mb-8">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              className="w-full h-full bg-transparent border border-white/20 rounded-full text-white px-5 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
          </div>
          <div className="relative w-full h-[50px] mb-8">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className="w-full h-full bg-transparent border border-white/20 rounded-full text-white px-5 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt absolute right-5 top-1/2 transform -translate-y-1/2 text-xl"></i>
          </div>
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="text-white mr-2" />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline">Forgot password?</a>
          </div>
          <button 
            type="submit" 
            className="w-full h-[45px] bg-white text-gray-800 rounded-full shadow hover:shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300"
            
          >
            Login
          </button>
          <div className="text-center text-sm mt-6">
            {/* <p>
              Don't have an account? 
              <a href="#" className="ml-1 text-white font-semibold hover:underline">Register</a>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}
