
let pedidos = [];

function agregarPedido(producto, precio) {
  pedidos.push({ producto, precio });
  console.log(`Pedido agregado: ${producto} - $${precio}`);
}

function calcularTotales() {
  const subtotal = pedidos.reduce((acum, { precio }) => acum + precio, 0);
 
  const iva      = subtotal * 0.16;
  const total    = subtotal + iva;
 
  return { subtotal, iva, total };
}
 
function mostrarPedidos() {
  console.log("\n===== PEDIDOS =====");
  pedidos.forEach(({ producto, precio }, index) => {
    console.log(`  ${index + 1}. ${producto} - $${precio.toFixed(2)}`);
  });
 
  const { subtotal, iva, total } = calcularTotales();
 
  console.log("-------------------");
  console.log(`  Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`  IVA 16%:  $${iva.toFixed(2)}`);
  console.log(`  Total:    $${total.toFixed(2)}`);
  console.log("===================\n");
}

function mostrarPromociones(productos) {
  const promos = productos.map((p) => ({
    ...p,
    precioPromo: parseFloat((p.precio * 0.9).toFixed(2)),
    descuento:   "10% off",
  }));
 
  console.log("\n ===== PROMOCIONES =====");
  promos.forEach(({ nombre, precio, precioPromo, descuento }) => {
    console.log(`  ${nombre.padEnd(14)} $${precio} → $${precioPromo}  (${descuento})`);
  });
  console.log("=========================\n");
 
  return promos;
}

if (require.main === module) {
  const { productos } = require("./cocina");
  agregarPedido("Café", 1.5);
  agregarPedido("Pastel", 5.0);
  mostrarPedidos();
  mostrarPromociones(productos);
}


module.exports = { agregarPedido, mostrarPedidos, pedidos, calcularTotales, mostrarPromociones };
