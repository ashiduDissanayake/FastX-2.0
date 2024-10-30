import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img2 from './assets/bg.jpeg';

const Driverlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [driverId, setDriverId] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/driver/driverlogin', {
                username,
                password,
            },{
                withCredentials: true,
            });

            if (response.data.message === 'Login successful') {
                setDriverId(response.data.driver_ID);
                setMessage('Login successful!');
                window.location.href = '/driver-profile';
            } else {
                setMessage(response.data.message);
                setDriverId(null);
            }
        } catch (error) {
            console.error(error);
            setMessage('Error occurred during login.');
            setDriverId(null);
        }
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${img2})` }}
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-white/20 border border-white/20 rounded-lg shadow-lg backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center text-white">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 bg-transparent border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium bg-white text-gray-800 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Login
                    </button>
                </form>

                {message && (
                    <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                {driverId && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-200">Driver ID: {driverId}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Driverlogin;
