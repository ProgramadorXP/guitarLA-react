import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db";
import { useCart } from "./hooks/useCart";

function App() {

  const { cart, addCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, totalCart } = useCart();
 
  return (
    <>

    <Header 
      cart={cart}//Enviamos por props el arreglo que guarda los productos del carrito
      removeFromCart={removeFromCart}//Enviamos la funcion que se encarga de eliminar el producto del carrito
      decreaseQuantity={decreaseQuantity}//Enviamos la funcion que se encarga de decrementar la cantidad del producto
      increaseQuantity={increaseQuantity}//Enviamos la funcion que se encarga de incrementar la cantidad del producto
      clearCart={clearCart}//Enviamos la funcion que se encarga de vaciar el carrito por completo
      isEmpty={isEmpty}//Enviamos esta funcion que viene desde el hook personalizado para tener problemas de instanzacion en el archivo del header
      totalCart={totalCart}//Enviamos esta funcion que viene desde el hook personalizado para tener problemas de instanzacion en el archivo del header
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            { db.map(guitar => <Guitar //Mapeamos el componente para mostrarlo segun la longitud del objeto que tiene los productos
                                    key={guitar.id} //Mandamos la llave key con el id que tiene cada producto y evitar mensaje de advertencia de react
                                    guitar={guitar} //Mandamos la info de cada guitarra como prop
                                    addCart={addCart} //Mandamos la funcion que se encarga de agregar el producto al carrito
                                  />
            )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
