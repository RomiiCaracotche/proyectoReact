export const agregarProducto = async (producto) => {
    return(
        new Promise( async(res, rej) => {
            try {
                    const respuesta = await fetch('https://68100d8c27f2fdac24101f03.mockapi.io/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                    });
                    if (!respuesta.ok) {
                    throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                    res(data);
                    
                } catch (error) {
                    console.error(error.message);
                    rej('Hubo un problema al agregar el producto.');
                }
        })
    )
};
