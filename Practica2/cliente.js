const { productos } = require("./cocina");
 
function mostrar_prod(productos) {
  console.table(productos);
 
  // console.log("Menú")
  // for(let i = 0; i < productos.length; i++){
  //   console.log(`
  //     nombre: ${productos[i].nombre}
  //     precio: ${productos[i].precio}
  //     --------------------
  //   `);
  // }
}
 
if (require.main === module) {
  mostrar_prod(productos);
}
 
module.exports = { mostrar_prod };
 