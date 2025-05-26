import "./Login.css";

function Login( {adminLogueado, userLogueado, administrarAdmin, administrarUser} ) {

    return (
        <div className="container-login">
            <div className="login">
                <h3>Loguearse</h3>
                <div>
                    { (!userLogueado) ? <button onClick={administrarAdmin} className="buttonLogin"> { adminLogueado ? <span>Desloguear Admin</span> : <span>Loguear Admin</span> } </button> : <></> }
                    { (!adminLogueado) ? <button onClick={administrarUser} className="buttonLogin"> { userLogueado ? <span>Desloguear User</span> : <span>Loguear User</span> } </button> : <></> }
                </div>
                <div>
                    { (adminLogueado && !userLogueado) ? <h4>Te logueaste como Admin.</h4> : <></> }
                    { (userLogueado && !adminLogueado) ? <h4>Te logueaste como User.</h4> : <></> }   
                </div>
            </div>
        </div>
    )
}

export default Login;