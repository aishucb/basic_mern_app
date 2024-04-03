import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    function updateForm(value) {
        setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    async function onSubmit(e) {
        e.preventDefault()

        const newUser = { ...form }
        const response = await fetch("https://interview-plus.onrender.com/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })

        if (!response.ok) {
            const errorMessage = `An error occurred: ${response.statusText}`
            console.error(errorMessage)
            window.alert(errorMessage)
            return
        }

        try {
            const data = await response.json()
            const token = data.token // Assuming the response contains a 'token' field

            // Handle successful registration, you can store the token in localStorage or Context API for later use
            window.alert("User registered successfully with token:", token)

            setForm({ name: "", email: "", password: "" })
            navigate("/") // Redirect to home page after successful registration
        } catch (error) {
            console.error("Error parsing JSON response:", error)
            window.alert("Error parsing JSON response")
        }
    }

    return (
        <div>
            <h3>Register Now!!</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Register"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
