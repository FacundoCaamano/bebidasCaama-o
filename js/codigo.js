class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

class elementoCarrito{
    constructor(producto, cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}


//arreglos de productos y carrito
const productos = []
const carritoCompras = [];

//modo
let modo;
if(localStorage.getItem("modo")){
    modo=localStorage.getItem("modo");
}else{
    modo="light";
}
let boton=document.getElementById("mode");
document.body.className=modo;

localStorage.setItem("modo", modo);

boton.onclick=()=>{
    if(modo=="light"){
        document.body.className="dark";
        modo="dark";
    }else{
        document.body.className="light";
        modo="light";
    }
    localStorage.setItem("modo", modo);
}

//elementos a referneciar

const contenedorProducto = document.querySelector("#contenedor-productos")
const contenedorCarrito = document.querySelector("#items")
const contenedorCarritoFooter = document.querySelector("#footer")
const btnEdad=document.getElementById("btnEdad")
const contenedorEdad=document.getElementById("contenedor-edad")
//ejecucion de funciones

btnEdad.onclick=()=>{
    mayorDeEdad();
}
function esMayor() {
cargaProductos();
dibujarCatalogo();
}


//declaracion de funciones

function mayorDeEdad(){
    let noValido=document.getElementById("noValido")
    let edad=document.getElementById("edad").value;
    edad > 17 ? esMayor() : esMenor();
}
function esMenor(){
    contenedorEdad.innerHTML='<h3 id="noValido">Necesita ser mayor de edad para comprar</h3>'
}
function cargaProductos() {
    productos.push(new Producto(1, 'Agua', 120, './img/agua.jpg'));
    productos.push(new Producto(2, 'Andes', 480,'./img/andes.png' ));
    productos.push(new Producto(3, 'Coca Cola', 480,'./img/cocacola.png'));
    productos.push(new Producto(4, 'Dr Lemon', 450,'./img/drlemon.jpg'));
    productos.push(new Producto(5, 'Fanta', 120,'./img/fanta.png'));
    productos.push(new Producto(6, 'Fernet Branca', 250,'./img/fernet-branca-1-litro.jpg'));
    productos.push(new Producto(7, 'heineken', 250,'./img/heineken.png'));
    productos.push(new Producto(8, 'Pepsi', 320,'./img/pepsi.jpeg'));
    productos.push(new Producto(9, 'Quilmes', 320,'./img/quilmes.jpg'));
    productos.push(new Producto(10, 'stella', 420,'./img/stella.jpg'));
}

function dibujarCatalogo(){
    contenedorProducto.innerHTML = "";
    productos.forEach(
        (producto) => {
            let carta =crearCartas(producto);
            contenedorProducto.append(carta)
        }
    );
}


function crearCartas(producto){
    let botonCartas = document.createElement("button");
    botonCartas.className="btn btn-success";
    botonCartas.innerText ="Comprar";

    let cuerpoCartas = document.createElement("div");
    cuerpoCartas.className="card-body";
    cuerpoCartas.innerHTML = `
                              <h5>${producto.nombre}</h5>
                              <p>${producto.precio}</p>  
                              `;
    cuerpoCartas.append(botonCartas);


    let foto = document.createElement("img");
    foto.src = producto.img;
    foto.className = "card-img-top";
    foto.alt = producto.nombre;


    let carta = document.createElement("div")
    carta.className = "card m-3 p-3";
    carta.append(foto);
    carta.append(cuerpoCartas);

    botonCartas.onclick=(e) =>{
        let elementoEnCarro = new elementoCarrito(producto, 1)
        carritoCompras.push(elementoEnCarro);
        dibujarCarrito();
    }

    return carta;

}

function dibujarCarrito(){
    contenedorCarrito.innerHTML ="";


    let precioTotal = 0;

    carritoCompras.forEach(
        (elemento)=>{
            let renglonCarro = document.createElement("tr");
            renglonCarro.innerHTML=`
                                    <td>${elemento.producto.id}</td>
                                    <td>${elemento.producto.nombre}</td>
                                    <td><input id="unidades${elemento.producto.id}"type="number" value="${elemento.cantidad}"min="1" max="100" step="1" /></td>
                                    <td>${elemento.producto.precio}</td>
                                    <td>${elemento.producto.precio*elemento.cantidad}</td>`;
                                    
                                    precioTotal+=elemento.producto.precio*elemento.cantidad;

                                    contenedorCarrito.append(renglonCarro);
                                    let inputCantidad = document.getElementById(`unidades${elemento.producto.id}`)

                                    inputCantidad.addEventListener("change", (e)=> {
                                       let nuevaCantidad = e.target.value;
                                       elemento.cantidad = nuevaCantidad;
                                       dibujarCarrito();
                                    })
        }
    );
    
    if(carritoCompras.length == 0){
        contenedorCarritoFooter.innerHTML = `<th scope="row" colspan="5">Carrito vacío!</th>
        </tr>`;
    } else{
        contenedorCarritoFooter.innerHTML = `<th scope="row" colspan="5">Precio total: ${precioTotal}</th>
        </tr>`;
    }

}




























































