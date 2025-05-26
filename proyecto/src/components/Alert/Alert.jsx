import "./Alert.css";
import { useState, useEffect } from 'react';

function Alert( {alerta} ) {
    const [mensaje, setMensaje] = useState(alerta);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMensaje("");
        }, 2000);

        return () => clearTimeout(timer);
    }, []); 

    return (
        (mensaje &&
            <div className="alert">
                <p>{mensaje}</p>
            </div>
        )
    );
}

export default Alert