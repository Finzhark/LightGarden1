// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({
    children
}) {
    const id = localStorage.getItem("id")
    return id ? children : <Navigate to="/login" replace/>
}