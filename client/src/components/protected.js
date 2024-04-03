import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ initialToken }) => {
    const [token, setToken] = useState(initialToken || "")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchData = async () => {
        setIsLoading(true)
        token = process.env.REACT_APP_YOUR_HOSTNAME
        try {
            const response = await fetch("https://interview-plus.onrender.com/api/protected", {
                method: "GET",
                headers: {
                    "x-access-token": token
                }
            })

            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`)
            }

            // Request was successful
            setIsLoading(false)
            window.alert("Protected route")
            navigate("/")
        } catch (error) {
            console.error("Error fetching protected data:", error)
            setError("Error fetching protected data")
            setIsLoading(false)
        }
    }

    const handleDeleteClick = () => {
        navigate("/delete")
    }

    const handleUpdateClick = () => {
        navigate("/update")
    }

    const handleItemsClick = () => {
        navigate("/items")
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ fontSize: "24px", color: "teal", marginBottom: "20px" }}>Protected Route</h1>
            <button
                onClick={handleDeleteClick}
                style={{ padding: "10px", border: "none", borderRadius: "5px", fontFamily: "Poppins, sans-serif", fontSize: "16px", color: "#fff", backgroundColor: "teal", marginRight: "10px", marginBottom: "10px", cursor: "pointer" }}
            >
                Delete
            </button>
            <button
                onClick={handleUpdateClick}
                style={{ padding: "10px", border: "none", borderRadius: "5px", fontFamily: "Poppins, sans-serif", fontSize: "16px", color: "#fff", backgroundColor: "teal", marginRight: "10px", marginBottom: "10px", cursor: "pointer" }}
            >
                Update
            </button>
            <button
                onClick={handleItemsClick}
                style={{ padding: "10px", border: "none", borderRadius: "5px", fontFamily: "Poppins, sans-serif", fontSize: "16px", color: "#fff", backgroundColor: "teal", marginRight: "10px", marginBottom: "10px", cursor: "pointer" }}
            >
                Items
            </button>
        </div>
    )
}

export default ProtectedRoute
