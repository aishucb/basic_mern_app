import React from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import RecordList from "./components/recordList"
import UpdateUserForm from "./components/updateuserform"
import Create from "./components/create"
import Login from "./components/login"
import ProtectedRoute from "./components/protected"
import DeleteUserComponent from "./components/delete"
import ItemsComponent from "./components/items"

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/update" element={<UpdateUserForm />} />
                <Route path="/register" element={<Create />} />
                <Route path="/login" element={<Login />} />
                <Route path="/protected" element={<ProtectedRoute />} />
                <Route path="/delete" element={<DeleteUserComponent />} />
                <Route path="/items" element={<ItemsComponent />} />

            </Routes>
        </div>
    )
}

export default App