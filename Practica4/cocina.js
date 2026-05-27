let productos = [
    {nombre: "Leche",       precio: 40, categoria: "Alimentos"},
    {nombre: "Pan",         precio: 15, categoria: "Alimentos"},
    {nombre: "Huevos",      precio: 50, categoria: "Alimentos"},
    {nombre: "Tortas",      precio: 80, categoria: "Alimentos"},
    {nombre: "Quesadillas", precio: 50, categoria: "Alimentos"},
    {nombre: "Queso",       precio: 46, categoria: "Alimentos"},
    {nombre: "Frijoles",    precio: 30, categoria: "Alimentos"},
    {nombre: "Pay",         precio: 70, categoria: "Postres"  },
    {nombre: "Jugo",        precio: 35, categoria: "Bebidas"  },
    {nombre: "Cafe",        precio: 45, categoria: "Bebidas"  },
];

function prepararEnCocina(pedido) {
    return new Promise((resolve, reject) => {
        pedido.estatus = "En preparación";
        console.log(`Cocina recibió: ${pedido.producto} - (${pedido.estatus})`);

        let azar = Math.floor(Math.random() * 4) + 1;

        if (azar === 3) {
            pedido.estatus = "Faltan ingredientes";
            reject("Error: faltan ingredientes");
        } else if (azar === 4) {
            pedido.estatus = "Error en la cocina";
            reject("Error en la cocina");
        } else {
            pedido.estatus = "Listo";
            resolve(`${pedido.producto} está listo`);
        }
    });
}

function AgregarProducto() {
    let nombre  = prompt("Escribe el nombre del producto");
    let precio  = prompt("Escribe el precio");
    let opcion  = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );

    let categoria;
    switch (opcion) {
        case "1": categoria = "Postres";       break;
        case "2": categoria = "Bebidas";       break;
        case "3": categoria = "Alimentos";     break;
        default:  categoria = "Sin categoría"; break;
    }

    productos.push({ nombre, precio: parseFloat(precio), categoria });
    localStorage.setItem("productos", JSON.stringify(productos));
    console.table(productos);
}

function EditarProducto() {
    let indice  = prompt("Escribe el índice del producto a editar");
    let nombre  = prompt("Escribe el nuevo nombre");
    let precio  = prompt("Escribe el nuevo precio");
    let opcion  = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );

    let categoria;
    switch (opcion) {
        case "1": categoria = "Postres";       break;
        case "2": categoria = "Bebidas";       break;
        case "3": categoria = "Alimentos";     break;
        default:  categoria = "Sin categoría"; break;
    }

    productos[indice] = { nombre, precio: parseFloat(precio), categoria };
    localStorage.setItem("productos", JSON.stringify(productos));
    console.table(productos);
}

function EliminarProducto() {
    let indice = prompt("Escribe el índice del producto a eliminar");
    productos.splice(indice, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    console.table(productos);
}

function categoria() {
    let opcion = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );

    let cat;
    switch (opcion) {
        case "1": cat = "Postres";       break;
        case "2": cat = "Bebidas";       break;
        case "3": cat = "Alimentos";     break;
        default:  cat = "Sin categoría"; break;
    }

    console.table(productos.filter(p => p.categoria === cat));
}

function productoscaros() {
    console.table(productos.filter(p => p.precio >= 40));
}

function productosbaratos() {
    console.table(productos.filter(p => p.precio < 40));
}

function buscarProducto() {
    let nombre     = prompt("¿Qué producto buscas?");
    let encontrado = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (encontrado) {
        console.log("Producto encontrado:", encontrado);
        alert(`${encontrado.nombre} — $${encontrado.precio} (${encontrado.categoria})`);
    } else {
        alert("Producto no encontrado");
    }
}