
export default function Denied() {
    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="bg-danger h-50 w-50 rounded d-flex flex-column justify-content-center align-items-center fw-bold">
                <h2>ACCESO DENEGADO!!!</h2>
                <h3>Debe ser Admin para realizar esta acción.</h3>
            </div>
        </div>
    )
}