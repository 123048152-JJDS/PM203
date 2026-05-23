let productos = [
    { nombre: "Leche",       precio: 40, categoria: "Alimentos" },
    { nombre: "Pan",         precio: 15, categoria: "Alimentos" },
    { nombre: "Huevos",      precio: 50, categoria: "Alimentos" },
    { nombre: "Tortas",      precio: 80, categoria: "Alimentos" },
    { nombre: "Quesadillas", precio: 50, categoria: "Alimentos" },
    { nombre: "Queso",       precio: 46, categoria: "Alimentos" },
    { nombre: "Frijoles",    precio: 30, categoria: "Alimentos" },
    { nombre: "Pay",         precio: 70, categoria: "Postres"   },
    { nombre: "Jugo",        precio: 35, categoria: "Bebidas"   },
];

function AgregarProducto() {
    let producto = prompt("Escribe tu producto");
    let precio   = prompt("Escribe tu precio");
    let opcion   = prompt(
        "Selecciona una categoría:\n1. Postres\n2. Bebidas\n3. Alimentos"
    );

    let categoria;
    switch (opcion) {
        case "1": categoria = "Postres";       break;
        case "2": categoria = "Bebidas";       break;
        case "3": categoria = "Alimentos";     break;
        default:  categoria = "Sin categoría"; break;
    }

    productos.push({ nombre: producto, precio: parseFloat(precio), categoria });
    localStorage.setItem("productos", JSON.stringify(productos));
    console.table(productos);
}

function EditarProducto() {
    let indice  = prompt("Escribe el índice del producto a editar");
    let producto = prompt("Escribe tu producto");
    let precio   = prompt("Escribe tu precio");
    let opcion   = prompt(
        "Selecciona una categoría:\n1. Postres\n2. Bebidas\n3. Alimentos"
    );

    let categoria;
    switch (opcion) {
        case "1": categoria = "Postres";       break;
        case "2": categoria = "Bebidas";       break;
        case "3": categoria = "Alimentos";     break;
        default:  categoria = "Sin categoría"; break;
    }

    productos[indice] = { nombre: producto, precio: parseFloat(precio), categoria };
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
        "Selecciona una categoría:\n1. Postres\n2. Bebidas\n3. Alimentos"
    );

    let cat;
    switch (opcion) {
        case "1": cat = "Postres";   break;
        case "2": cat = "Bebidas";   break;
        case "3": cat = "Alimentos"; break;
        default:  cat = "Sin categoría"; break;
    }

    let productosFiltrados = productos.filter(p => p.categoria === cat);
    console.table(productosFiltrados);
}

function productoscaros() {
    let productosCaros = productos.filter(p => p.precio >= 40);
    console.table(productosCaros);
}

function productosbaratos() {
    let productosBaratos = productos.filter(p => p.precio < 40);
    console.table(productosBaratos);
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