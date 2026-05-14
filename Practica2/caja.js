// Objetivo del modulo caja.js:
// Crear: 
//  - Lista de pedidos
//  - total acumulado
//  -funcion agregarPedido()


let pedidos = [];
let totalAcumulado = 0;

function agregarPedido(producto, precio){
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


agregarPedido("Café Americano", 35);
agregarPedido("Cappuccino", 45);
agregarPedido("Pan de dulce", 20);
mostrarPedidos();


// module.exports = {
//     agregarPedido,
//     pedidos,
//     totalAcumulado
// }
