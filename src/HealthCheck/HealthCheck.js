import React, { useState, useEffect } from "react";

const HealthCheck = () => {
const [status, setStatus] = useState("Checking...");
const [data, setData] = useState(null);
const [error, setError] = useState(null);

// const backendURL = "http://127.0.0.1:8080/healthcheck"; 
const backendURL = "https://app-787be4c4-3ac8-43da-a1e2-e869e769344d.cleverapps.io/healthcheck"; 

useEffect(() => {
    const fetchHealthCheck = async () => {
    try {
        const response = await fetch(backendURL);
        const result = await response.json();
        
        setStatus(response.ok ? "✅ Backend is Online" : "❌ Backend Error");
        setData(result);
    } catch (err) {
        setStatus("❌ Cannot reach backend");
        setError(err.message);
    }
    };

    fetchHealthCheck();
}, []);

return (
    <div>
    <strong>Backend Status:</strong> {status}
    {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )}
    {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
);
};

const styles = {
};

export default HealthCheck;
