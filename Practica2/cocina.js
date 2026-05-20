let productos = [
  { nombre: "Leche",       precio: 2.5 },
  { nombre: "Pan",         precio: 1.0 },
  { nombre: "Huevos",      precio: 3.0 },
  { nombre: "Tortas",      precio: 2.0 },
  { nombre: "Quesadillas", precio: 3.5 },
  { nombre: "Queso",       precio: 4.0 },
  { nombre: "Frijoles",    precio: 2.5 },
];

function AgregarProducto(nombre, precio) {
  productos.push({ nombre, precio: parseFloat(precio) });
  console.log(`✅ Producto agregado: ${nombre} - $${precio}`);
}

function EditarProducto(indice, nombre, precio) {
  if (indice < 0 || indice >= productos.length) {
    console.log("❌ Índice inválido."); return;
  }
  productos[indice] = { nombre, precio: parseFloat(precio) };
  console.log(`✏️  Producto editado en posición ${indice}.`);
}

function EliminarProducto(indice) {
  if (indice < 0 || indice >= productos.length) {
    console.log("❌ Índice inválido."); return;
  }
  const eliminado = productos.splice(indice, 1);
  console.log(`🗑️  Producto eliminado: ${eliminado[0].nombre}`);
}

if (require.main === module) {
  AgregarProducto("Café", 3.0);
  EditarProducto(0, "Leche entera", 2.8);
  EliminarProducto(2);
  console.table(productos);
}

module.exports = { productos, AgregarProducto, EditarProducto, EliminarProducto };