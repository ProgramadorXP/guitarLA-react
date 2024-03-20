/* eslint-disable react/prop-types */
//Destructuramos el objeto props y obtenemos los productos de las guitarras y la funcion para agregarlas al carrito
const Guitar = ({guitar, addCart }) => {
    
    //Destructuramos el objeto para obtener cada llave del objeto de las guitarras
    const { name, image, description, price } = guitar;

    return ( 
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                {/*Pasamos el nombre de cada guitarra al siguiente h3 en orden*/}
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                {/*Pasamos la descripcion de cada guitarra al siguiente p en orden*/}
                <p>{description}</p>
                {/*Pasamos el precio de cada guitarra al siguiente p en orden*/}
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    //Creamos evento click al boton que se encarga de agregar al carrito y le pasamos la funcion 'addCart' y le pasamos como argumento el objeto completo de la guitarra a la que se le da agregar
                    onClick={() => addCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
     );
}
 
export default Guitar;