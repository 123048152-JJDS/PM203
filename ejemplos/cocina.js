let productos = [
    { nombre: "Leche", precio: 40, categoria: "Alimentos" },
    { nombre: "Pan", precio: 15, categoria: "Alimentos" },
    { nombre: "Huevos", precio: 50, categoria: "Alimentos" },
    { nombre: "Tortas", precio: 80, categoria: "Alimentos" },
    { nombre: "Quesadillas", precio: 50, categoria: "Alimentos" },
    { nombre: "Queso", precio: 46, categoria: "Alimentos" },
    { nombre: "Frijoles", precio: 30, categoria: "Alimentos" },
    { nombre: "Pay", precio: 70, categoria: "Postres" },
    { nombre: "Jugo", precio: 35, categoria: "Bebidas" },
];

function AgregarProducto() {

    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");
    let opcion = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );
    let categoria;
    switch (opcion) {
        case "1":
            categoria = "Postres";
            break;
        case "2":
            categoria = "Bebidas";
            break;
        case "3":
            categoria = "Alimentos";
            break;
        default:
            categoria = "Sin categoría";
    }

    productos.push({
        nombre: producto,
        precio: parseFloat(precio),
        categoria: categoria
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    console.table(productos)
}

function EditarProducto() {
    let indice = prompt("Escribe el índice del producto a editar");
    let producto = prompt("Escribe tu producto");
    let precio = prompt("Escribe tu precio");
    let opcion = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );
    let categoria;
    switch (opcion) {
        case "1":
            categoria = "Postres";
            break;
        case "2":
            categoria = "Bebidas";
            break;
        case "3":
            categoria = "Alimentos";
            break;
        default:
            categoria = "Sin categoría";
    }
    productos[indice] = {
        nombre: producto,
        precio: parseFloat(precio),
        categoria: categoria
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

function categoria() {
    let opcion = prompt(
        "Selecciona una categoría:\n" +
        "1. Postres\n" +
        "2. Bebidas\n" +
        "3. Alimentos"
    );
    let categoria;
    switch (opcion) {
        case "1":
            categoria = "Postres";
            break;
        case "2":
            categoria = "Bebidas";
            break;
        case "3":
            categoria = "Alimentos";
            break;
        default:
            categoria = "Sin categoría";
    }
    let productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    console.table(productosFiltrados)
}

function productoscaros() {
    let productosCaros = productos.filter(producto => producto.precio >= 40.0);
    console.table(productosCaros)
}

function productosbaratos() {
    let productosBaratos = productos.filter(producto => producto.precio < 40);
    console.table(productosBaratos)
}