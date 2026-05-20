let pedidos = [];
let totalAcumulado = 0;

function agregarPedido(){

    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    pedidos.push({producto, precio});
    totalAcumulado += precio;
    console.log(`Pedido agregado: ${producto} - $${precio}`);
}

function mostrarPedidos(){
    console.log("Pedidos actuales:");
    pedidos.forEach((pedido, index) => {
        console.log(`${index + 1}. ${pedido.producto} - $${pedido.precio}`);
    });
    console.log(`Total acumulado: $${totalAcumulado}`);
}

let productos = [
        {nombre: "Leche", precio: 2.5},
        {nombre: "Pan", precio: 1.0},
        {nombre: "Huevos", precio: 3.0},
        {nombre: "Tortas", precio: 2.0},
        {nombre: "Quesadillas", precio: 3.5},
        {nombre: "Queso", precio: 4.0},
        {nombre: "Frijoles", precio: 2.5},
    ];

function AgregarProducto() {

    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    productos.push({
        nombre: producto,
        precio: parseFloat(precio)
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}

function EditarProducto() {

    let indice = prompt("Escribe el índice del producto a editar");
    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");

    productos[indice] = {
        nombre: producto,
        precio: parseFloat(precio)
    };

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}

function EliminarProducto() {

    let indice = prompt("Escribe el índice del producto a eliminar");

    productos.splice(indice, 1);

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)

}

function mostrar_prod(productos){

    console.log("Menú")
    for(let i = 0; i < productos.length; i++){


        console.log(`
            nombre: ${productos[i].nombre}
            precio: ${productos[i].precio}
            --------------------
            
            `);

    }
    
}