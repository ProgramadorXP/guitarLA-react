/* eslint-disable react/prop-types */

//Destructuramos el objeto de 'props' recibiendo estado y funciones para el carrito
const Header = ({ cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, totalCart }) => {

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div 
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                { isEmpty ? //Mostramos el parrafo siguiente en caso de que la variable 'isEmpty' sea true
                                    <p className="text-center">El carrito esta vacio</p>
                                :
                                    //Mostramos la tabla con los productos existentes en caso de que la variable 'isEmpty' sea false
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { cart.map( guitar => ( //Mapeamos el arreglo del carrito para mostrar el total de productos existentes
                                                    <tr key={guitar.id}>
                                                    <td>
                                                        {/*Cargamos la image de cada producto agregado segun el mapeo*/}
                                                        <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    {/*Cargamos el nombre de cada producto agregado segun el mapeo*/}
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">
                                                        {/*Cargamos el precio de cada producto agregado segun el mapeo*/}
                                                        ${guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            //Agregamos el evento click al boton para decrementar cantidad el cual llama la funcion 'decreaseQuantity' y le pasa el id de la guitarra segun el mapeo
                                                            onClick={() => decreaseQuantity(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                            {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            //Agregamos el evento click al boton para incrementar cantidad el cual llama la funcion 'increaseQuantity' y le pasa el id de la guitarra segun el mapeo
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            //Agregamos el evento click al boton para eliminar el producto el cual llama la funcion 'removeFromCart' y le pasa el id de la guitarra segun el mapeo
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/*Cargamos el total de todos los productos en el arreglo 'cart'*/}
                                        <p className="text-end">Total pagar: <span className="fw-bold">${totalCart}</span></p>
                                    </>}
                                <button 
                                    className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={clearCart}
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
     );
}
 
export default Header;