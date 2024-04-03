import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [form, setForm] = useState({
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

        const userLogin = { ...form }
        const response = await fetch("https://interview-plus.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
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

            // Handle successful login, you can store the token in localStorage or Context API for later use
            window.alert(token)
            console.log(token)
            setForm({ email: "", password: "" })

            // Save token to the existing a.txt file
            

            // Send token with navigate
            navigate("/protected", { state: { token } }) // Redirect to home page with token
        } catch (error) {
            console.error("Error parsing JSON response:", error)
            window.alert("Error parsing JSON response")
        }
    }

    // Function to save token to the existing a.txt file
  

    return (
        <div>
            <h3>Login Now!!</h3>
            <form onSubmit={onSubmit}>
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
