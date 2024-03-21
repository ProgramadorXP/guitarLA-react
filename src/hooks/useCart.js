import { useState, useEffect } from "react";
import { useMemo } from "react"; //Importamos 'useMemo' para mejorar un poco el performance de la app

//Hook personalizado que se encarga de tener toda la logica del carrito de compras
export const useCart = () => {//Exportamos hook personalizado

  //Declaramos el estado incial del cart para saber si se quedo con productos al salir ó no
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart"); //Obtenemos el valor de 'cart' del localStorage y lo guardamos en la variable 'localStorageCart'
    return localStorageCart ? JSON.parse(localStorageCart) : []; //Retornamos como valor inicial el arreglo con productos si tiene o arreglo vacío si no. Todo esto al momento de recargar la pagina
  };

  const [cart, setCart] = useState(initialCart); //Estado que almacena los productos de carrito
  const MIN_ITEMS = 1; //Limite de cantidad minima para decrementar en el carrito
  const MAX_ITEMS = 5; //Limite de cantidad maxima para incrementar en el carrito

  //Utilizamos un useEffect para ver cuando el 'cart' cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); //Creamos una llave llamada 'cart' en el localStorage con el state del cart
  }, [cart]); //Le decimos al useEffect que cada que cambie el state de cart, se modifique el localStorage de manera Asincrona como trabaja React

  const addCart = (item) => {
    //La funcion recibe el elemento del objeto al que se le da agregar al carrito
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id); //Se retorna un -1 si el id de la guitarra que se va recorriendo es igual al id del item que llega a la funcion por parametro
    if (itemExist >= 0) {
      //si 'itemExist' es igual o mayor a 0 se de por echo que exite
      if (cart[itemExist].quantity >= MAX_ITEMS) return; //Evitando bug de agregar mas productos de los permitidos
      const updateCart = [...cart]; // creamos una copia del arreglo original para no 'mutarlo'
      updateCart[itemExist].quantity++; //aumentamos 'quantity' en 1 para el producto
      setCart(updateCart); //Seteamos el carrito con la nueva cantidad del producto
    } else {
      //si 'itemExist' es igual a -1 es que no existe
      item.quantity = 1; //agregamos una nueva llave 'quantity' para cada producto y la iniciamos en 1
      setCart([...cart, item]); //actualizamos el carrito con el nuevo producto
    }
  };

  const removeFromCart = (id) => {
    //Funcion que recibe el id del producto a eliminar
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id)); //seteamos el estado del carrito con le id del producto que se quiere eliminar
  };

  const decreaseQuantity = (id) => {
    //Funcion que recibe el id del producto del cual se decrementa la cantidad
    const updatedCart = cart.map((item) => {
      //Mapemos el estado del carrito y guardamos la copta en 'updatedCart'
      if (item.id === id && item.quantity > MIN_ITEMS) {
        //Si id del item recorrido en el map es igual al id que se obtuvo en la funcion es igual y la cantidad del mismo es mayor a 1
        return {
          //Retornamos item donde la condicion se cumplió y decrementamos la cantidad en 1
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item; //Retornamos el item en el arreglo actualizado para mantenerlo
    });
    setCart(updatedCart); //seteamos el arreglo del carrito con el arreglo actualizado
  };

  const increaseQuantity = (id) => {
    //Funcion que recibe el id del producto de cual incrementamos su cantidad
    const updatedCart = cart.map((item) => {
      //Creamos una copia del arreglo original
      if (item.id === id && item.quantity < MAX_ITEMS) {
        //si el id del item en el que va el recorrido es igual al id que se dio click y la cantidad del mismo es menor a 5
        return {
          //Retornamos item donde la condicion se cumpló y aumentamo la cantidad de ese item en 1
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item; //Retornamos el item en el arreglo actualizado para mantenerlo
    });
    setCart(updatedCart); //seteamos el arreglo del carrito con el arreglo actualizado
  };

  const clearCart = () => {
    //funcion que se encarga de vaciar el carrito
    setCart([]); //seteamos el arreglo original para eliminar todos los productos dentro
  };

    //STATE DERIVADO
    //Utilizamos 'useMemo' para el performance de la app y ejecutar el renderizado siempre y cuando el estado de el carrito cambie
    const isEmpty = useMemo( () => cart.length === 0, [cart]);//Guardamos un boleando en la variable 'isEmpty' dependiendo si el carrito esta vacio o no
    const totalCart = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);//Guardamos el valor total de la suma de todos los productos multiplicando por la cantidad de cada uno

  return {
    cart,
    addCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    totalCart
  };
};
