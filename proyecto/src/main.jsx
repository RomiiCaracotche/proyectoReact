import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const element = document.getElementById('root');
element.style.height="100vh";
element.style.display="flex";
element.style.flexDirection="column";

createRoot(document.getElementById('root')).render( 
 
  <StrictMode>
    <ProductsProvider>
      <AuthProvider>
        <CartProvider>
          <App/>
        </CartProvider>
      </AuthProvider>
    </ProductsProvider>
  </StrictMode>

)

