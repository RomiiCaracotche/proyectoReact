/* import "./Admin.css"; */
import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from 'react-router-dom';

function Admin() {

    const {admin} = useAuthContext();

    if(!admin) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="container-admin">
            <div className="admin">
                <h3>Estoy Logueado como Admin!</h3>
            </div>
        </div>
    )
}

export default Admin;