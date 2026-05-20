// ============================================
// INTEGRACIÓN - CAFETERÍA ☕
// Practica No. 2: Reto General
// El sistema debe:
//  - mostrar productos (cocina)
//  - guardar pedidos   (caja)
//  - mostrar info del cliente (cliente)
// ============================================

const { productos, AgregarProducto } = require("./cocina");
const { agregarPedido, mostrarPedidos } = require("./caja");
const { mostrar_prod } = require("./cliente");

console.log("\n🍽️  ====== COCINA: CATÁLOGO ======");
console.table(productos);

console.log("\n👤 ====== CLIENTE: MENÚ ======");
mostrar_prod(productos);

console.log("\n🧾 ====== CAJA: PEDIDOS ======");
agregarPedido("Tortas",      productos[3].precio);
agregarPedido("Quesadillas", productos[4].precio);
agregarPedido("Café",        3.0);
mostrarPedidos();