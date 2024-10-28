import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/RailwaySidebar"; // Adjust the import path based on your file structure
import "./RailwayTrainSchedule.css";

const TrainSchedule = () => {
    const [data, setTrainScheduleData] = useState([]);
    const [activePage, setActivePage] = useState("Train Schedule");
    const [editableRow, setEditableRow] = useState(null);
    const [updatedValues, setUpdatedValues] = useState({}); // To store updated values

    // Function to format date from ISO to desired format
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // Load train schedule data from API
    const loadTrainSchedule = async () => {
        const response = await axios.get("http://localhost:8080/mainmanager/getTrainSchedule");
        setTrainScheduleData(response.data);
    };

    useEffect(() => {
        loadTrainSchedule();
    }, []);

    const handleEditClick = (item) => {
        setEditableRow(item.schedule_ID); // Set the row that is currently being edited
        setUpdatedValues({
            departure_Time: item.departure_Time.split(' ')[1], // Get only the time part (HH:MM)
            arrival_Time: item.arrival_Time.split(' ')[1], // Get only the time part (HH:MM)
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        try {
            // Create a new Date object for the current date
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

            // Construct formatted date strings with seconds
            const formattedDepartureTime = `${currentDate} ${updatedValues.departure_Time}:00`;
            const formattedArrivalTime = `${currentDate} ${updatedValues.arrival_Time}:00`;

            // Send the updated times to the backend
            await axios.put(`http://localhost:8080/mainmanager/updateTrainSchedule`, {
                schedule_ID: editableRow, // Include the schedule ID
                departure_Time: formattedDepartureTime,
                arrival_Time: formattedArrivalTime,
            });

            // Update local state with the new values
            setTrainScheduleData((prevData) =>
                prevData.map((item) =>
                    item.schedule_ID === editableRow
                        ? { ...item, departure_Time: formattedDepartureTime, arrival_Time: formattedArrivalTime }
                        : item
                )
            );

            setEditableRow(null); // Exit edit mode
        } catch (error) {
            console.error("Error saving train schedule:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="content" style={{ marginTop: "10px", padding: "20px", flexGrow: 1 }}>
                <h1 className="text-2xl font-bold mb-4">Train Schedule</h1>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Schedule ID</th>
                                <th style={{ textAlign: "center" }}>Store ID</th>
                                <th style={{ textAlign: "center" }}>Departure Time</th>
                                <th style={{ textAlign: "center" }}>Arrival Time</th>
                                <th style={{ textAlign: "center" }}>Capacity</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr key={item.schedule_ID}>
                                        <td>{item.schedule_ID}</td>
                                        <td>{item.store_ID}</td>
                                        <td>
                                            {editableRow === item.schedule_ID ? (
                                                <>
                                                    <input
                                                        type="time"
                                                        name="departure_Time"
                                                        value={updatedValues.departure_Time} // HH:MM format
                                                        onChange={handleInputChange}
                                                        className="border p-1"
                                                    />
                                                </>
                                            ) : (
                                                formatDate(item.departure_Time) // Format date for display
                                            )}
                                        </td>
                                        <td>
                                            {editableRow === item.schedule_ID ? (
                                                <>
                                                    <input
                                                        type="time"
                                                        name="arrival_Time"
                                                        value={updatedValues.arrival_Time} // HH:MM format
                                                        onChange={handleInputChange}
                                                        className="border p-1"
                                                    />
                                                </>
                                            ) : (
                                                formatDate(item.arrival_Time) // Format date for display
                                            )}
                                        </td>
                                        <td>{item.capacity}</td>
                                        <td>
                                            {editableRow === item.schedule_ID ? (
                                                <button onClick={handleSaveClick}>Save</button>
                                            ) : (
                                                <button onClick={() => handleEditClick(item)}>Edit</button>
                                            )}
                                        </td>
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

export default TrainSchedule;
