
import "./Home.css";
import { useAuthContext } from './../../contexts/AuthContext.jsx';

function Header() {  
    const {user, admin} = useAuthContext();

    return (  
        <header className='header'>  
            {
                (!user && !admin) ?
                    <h2> Inicia sesión para comprar</h2> 
                : 
                    (!admin) ? 
                        <h2>Bienvenido usuario {user} !!!</h2> 
                    : 
                    <h2> Bienvenido admin !!!</h2>  
            }
        </header>  
    );  
} 

export default Header;