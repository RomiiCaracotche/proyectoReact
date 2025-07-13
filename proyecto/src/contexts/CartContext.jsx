import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const agregarCarrito = (producto, contador) => {
            
            //verifico si existe
            const productoExiste = carrito.find(prod => prod.id === producto.id)

            //si el producto existe sumo la cantidad
            if(productoExiste) {
                const carritoActualizado = carrito.map(prod => {
                    if(prod.id === producto.id) {
                      const nuevoProd = {...prod, cantidad: prod.cantidad + contador}
                      return nuevoProd
                    }
                    return prod
                })

                setCarrito(carritoActualizado)
            }
            else {
                //si no existe, lo agrego
                const prodModif = {...producto, cantidad: contador}
                setCarrito([...carrito, prodModif])
            }          
    }
    
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const borrarCarrito = (id) => {
        const nuevoCarrito = carrito.filter(producto => producto.id !== id);
        setCarrito(nuevoCarrito);
    }

    return (
        <CartContext.Provider value={{ carrito, agregarCarrito, borrarCarrito }}>
            {children}
        </CartContext.Provider>
    );
}
