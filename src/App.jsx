import { useState } from "react";
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db";

function App() {

  const [ cart, setCart ] = useState([]);
  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  const addCart = (item) => {
    const itemExist = cart.findIndex( guitar => guitar.id === item.id );
    if( itemExist >= 0) {  //si existe en el carrito
      if(cart[itemExist].quantity >= MAX_ITEMS) return
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
 
  return (
    <>

    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      clearCart={clearCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            { db.map((guitar) => <Guitar 
                                    key={guitar.id} 
                                    guitar={guitar} 
                                    addCart={addCart}
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
