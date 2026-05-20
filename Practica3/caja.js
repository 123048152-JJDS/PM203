// ============================================
// MÓDULO 01 - CAJA 🧾
// Investigar: reduce(), destructuring
// Objetivo: calcular subtotal, iva, total
// ============================================

let pedidos = [];
let totalAcumulado = 0;

function agregarPedido(producto, precio){
    pedidos.push({producto, precio});
    totalAcumulado += precio;
    console.log(`Pedido agregado: ${producto} - $${precio}`);
}

function mostrarPedidos(){
    console.log("Pedidos actuales:");
    console.table(pedidos);
    // pedidos.forEach((pedido, index) => {
    //     console.log(`${index + 1}. ${pedido.producto} - $${pedido.precio}`);
    // });
    console.log(`Total acumulado: $${totalAcumulado}`);
    
}


if (require.main === module) {
  agregarPedido("Café Americano", 35);
  agregarPedido("Cappuccino", 45);
  agregarPedido("Pan de dulce", 20);
  mostrarPedidos();
}


// module.exports = { agregarPedido, mostrarPedidos, pedidos, totalAcumulado };
