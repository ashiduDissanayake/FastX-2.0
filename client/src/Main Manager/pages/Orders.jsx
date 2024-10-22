import React, {useState, useEffect} from 'react';
//import {Link} from "react-router-dom";
import "./Orders.css";
//import {toast} from "react-toastify";
import axios from "axios";
import Sidebar from "../components/Sidebar";

// const Orders = () => {
//     const [data, setData] = useState([]);

//     // Sample static data, replace with dynamic data if needed later
//     const loadData = async () => {
//         const response = await axios.get("http://localhost:8080/mainmanager/getorder");
//         setData(response.data);
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//   return (
//     <div style={{marginTop: "150px"}}>
    
//       <table className="styled-table">
//         <thead>
//             <tr>
//                 <th style={{textAlign: "center"}}>Order ID</th>
//                 <th style={{textAlign: "center"}}>Cart ID</th>
//                 <th style={{textAlign: "center"}}>Route ID</th>
//                 <th style={{textAlign: "center"}}>Status</th>
//                 <th style={{textAlign: "center"}}>Order Date Time</th>
//                 <th style={{textAlign: "center"}}>Capacity</th>
//                 <th style={{textAlign: "center"}}>Store ID</th>
                
//             </tr>
//         </thead>
//         <tbody>
//             {data.map((item) => {
//                 return (
//                     <tr key={item.order_ID}>
//                         <td>{item.order_ID}</td>
//                         <td>{item.cart_ID}</td>
//                         <td>{item.route_ID}</td>
//                         <td>
//                             <button className="btn btn-shipped">{item.status}</button>
//                         </td>
//                         <td>{item.order_Date_Time}</td>
//                         <td>{item.capacity}</td>
//                         <td>{item.store_ID}</td>
                        
//                     </tr>
//                 );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;


const Orders = () => {
    const [data, setData] = useState([]);
    const [activePage, setActivePage] = useState("Orders"); // State for active page

    // Load order data from API
    const loadData = async () => {
        const response = await axios.get("http://localhost:8080/mainmanager/getorder");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} /> {/* Sidebar component */}
            <div className="content" style={{ marginTop: "10px", padding: "20px", flexGrow: 1 }}>
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Order ID</th>
                                <th style={{ textAlign: "center" }}>Cart ID</th>
                                <th style={{ textAlign: "center" }}>Route ID</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                                <th style={{ textAlign: "center" }}>Order Date Time</th>
                                <th style={{ textAlign: "center" }}>Capacity</th>
                                <th style={{ textAlign: "center" }}>Store ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr key={item.order_ID}>
                                        <td>{item.order_ID}</td>
                                        <td>{item.cart_ID}</td>
                                        <td>{item.route_ID}</td>
                                        <td>
                                            <button className="btn btn-shipped">{item.status}</button>
                                        </td>
                                        <td>{item.order_Date_Time}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.store_ID}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;

