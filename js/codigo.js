AOS.init();
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
const carritoCompras = JSON.parse(localStorage.getItem("carrito"))||[];

let dolarVenta=JSON.parse(localStorage.getItem("dolar"))||[];

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
const precioDolar=document.getElementById("precioDolar")
const btnVaciar=document.getElementById("vaciar-carro")
const formulario=document.getElementById("formulario")
const direccionAEnviar=document.getElementById("direccionAEnviar")
const btnComprar=document.getElementById("btnComprar")




//ejecucion de funciones
btnComprar.onclick=()=>{
    terminarCompra()
   
}

btnEdad.onclick=()=>{
    mayorDeEdad();
}
function esMayor() {
cargaProductos();
dibujarCatalogo();
obtenerJsonLocal()

}


dibujarCarrito()


//declaracion de funciones




function mayorDeEdad(){
    
    let edad=document.getElementById("edad").value;
    edad > 17 ? esMayor() : esMenor();
}
function esMenor(){
    contenedorEdad.innerHTML='<h3 >Necesita ser mayor de edad para comprar</h3>'
}
function cargaProductos() {
    productos.push(new Producto(1, 'Schneider', 14, './img/schneider.png'));
    productos.push(new Producto(2, 'Andes', 16,'./img/andes.png' ));
    productos.push(new Producto(3, 'Coca Cola', 17,'./img/cocacola.png'));
    productos.push(new Producto(4, 'Dr Lemon', 15,'./img/drlemon.jpg'));
    productos.push(new Producto(5, 'Fanta', 5,'./img/fanta.png'));
    productos.push(new Producto(6, 'Fernet Branca', 40,'./img/fernet-branca-1-litro.jpg'));
    productos.push(new Producto(7, 'heineken', 10,'./img/heineken.png'));
    productos.push(new Producto(8, 'Pepsi', 11,'./img/pepsi.jpeg'));
    productos.push(new Producto(9, 'Quilmes', 11,'./img/quilmes.jpg'));
    productos.push(new Producto(10, 'stella', 14,'./img/stella.jpg'));
    productos.push(new Producto(11, 'Corona', 15,'./img/corona.png'));
    productos.push(new Producto(12, 'Budweiser', 14,'./img/budweiser.jpg'));
    productos.push(new Producto(13, 'Patagonia', 14,'./img/patagonia.png'));
    productos.push(new Producto(14, 'Imperial Ipa', 15,'./img/imperial.jpg'));
    productos.push(new Producto(15, 'Iguana', 13,'./img/iguana.png'));
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
                              <h5>${producto.nombre} x10</h5>
                              <p>U$ ${producto.precio}</p>  
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

        swal({
            title: "¡Producto agregado!",
            text: `se agrego al carrito :${producto.nombre}.`,
            icon: "success",
            buttons: 
                {cerrar: {
                    text: "Cerrar",
                    value: false
                    },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irAlCarro) => 
        {if(irAlCarro) {
            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
            const modalToggle = document.getElementById('toggleMyModal');myModal.show(modalToggle);
        }
    });
    localStorage.setItem("carrito",JSON.stringify(carritoCompras));
    
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
                                    <td><input id="unidades${elemento.producto.id}"type="number" value="${elemento.cantidad}"min="1" max="100" step="1" />  Recordar que las cantidades vienen de a 10</td>
                                    <td>U$ ${elemento.producto.precio}</td>
                                    <td>U$ ${elemento.producto.precio*elemento.cantidad}</td>
                                    <td>AR$ ${elemento.producto.precio*elemento.cantidad*dolarVenta}</td>
                                    
                                    `;
                                     
                                    
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
        return;
    } else{
        contenedorCarritoFooter.innerHTML = `<th scope="row" colspan="5">Precio total:U$ ${precioTotal} AR$ ${precioTotal*dolarVenta}</th>
        </tr>`;
    }
    
}

function terminarCompra(){
    let provincia=document.getElementById("provincia").value;
    let ciudadOBarrio=document.getElementById("ciudad/barrio").value
    let calle=document.getElementById("calle").value;
      
                                if(carritoCompras.length == 0){
                                    swal("Su carrito esta vacio")
                                }else if(provincia.length==0||ciudadOBarrio.length==0||calle.length==0){
                                    swal("Debe completar su direccion")
                                }
                                else{
                                    swal({
                                        title: "compra realizada con exito!!",
                                        text: `Su pedido se enviara a: ${provincia} ${ciudadOBarrio}  ${calle}  `,
                                        icon: "success",
                                        button: "ok",
                                        });
                                        
                                    direccionAEnviar.innerHTML=`
                                        <table class="table">
                                        <tr>
                                        <th scope="col">Su pedido se envio</th>
                                        </tr>
                                        <tr>
                                        <td >Provincia: ${provincia}</td>
                                        </tr>
                                        <tr>
                                        <td >Ciudad/Barrio: ${ciudadOBarrio}</td>
                                        </tr>
                                        <tr>
                                        <td >calle: ${calle}</td>
                                        </tr>
                                        </table>`; }

}


//vaciar carro
btnVaciar.onclick=()=>{
    carritoCompras.splice(0, carritoCompras.length);
    dibujarCarrito()
    localStorage.setItem("carrito",JSON.stringify(carritoCompras));
}



function obtenerJsonLocal(){
    const URLJSON="infoproductos.json"
    fetch(URLJSON)
    .then( resp => resp.json())
    .then( data => {
        const info=data.infoProductos
        info.forEach(infoProducto => {
            document.getElementById("productosInfo").innerHTML+=`
                <h2>${data.infoProductos[0].nombre}</h2>
                <img src="${data.infoProductos[0].foto}"  alt="">
                <p>${data.infoProductos[0].historia}</p>
            `
            
        });
        
    })
}






//api del precio del dolar
fetch('https://api-dolar-argentina.herokuapp.com/api/dolarblue')
    .then( (resp) => resp.json ())
    .then( (data)=>{
        precioDolar.innerHTML=`<h3 >Nuestro precios estan en dolares, el valor actual de U$ 1 es de $${data.venta}</h3>`
        dolarVenta=data.venta
        localStorage.setItem("dolar",JSON.stringify(dolarVenta));
        ;
    })
    




    





   

    function obtenerJsonLocal(){
        const URLJSON="infoproductos.json"
        fetch(URLJSON)
        .then( resp => resp.json())
        .then( data => {
            const info=data.infoProductos
            info.forEach(infoProducto => {
                document.getElementById("productosInfo").innerHTML+=`<h2>${infoProducto.nombre}</h2>
                <p>${infoProducto.historia}</p>
                <img src="${infoProducto.foto}" alt="">
                `
                
            });
            
        })
    }
    
    





































