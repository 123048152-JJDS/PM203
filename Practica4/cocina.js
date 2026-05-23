let productos = [
        {nombre: "Leche", precio: 40, categoria: "Alimentos"},
        {nombre: "Pan", precio: 15, categoria: "Alimentos"},
        {nombre: "Huevos", precio: 50, categoria: "Alimentos"},
        {nombre: "Tortas", precio: 80, categoria: "Alimentos"},
        {nombre: "Quesadillas", precio: 50, categoria: "Alimentos"},
        {nombre: "Queso", precio: 46, categoria: "Alimentos"},
        {nombre: "Frijoles", precio: 30, categoria: "Alimentos"},
        {nombre: "Pay", precio: 70, categoria: "Postres"},
        {nombre: "Jugo", precio: 35, categoria: "Bebidas"},
        {nombre: "Cafe", precio: 45, categoria: "Bebidas"},
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

async function prepararPedido() {
    let pedidoEstatus;
    let pedido = parseInt(
        prompt("Selecciona el número del pedido:")
    ) - 1;
    console.log(`Pedido seleccionado: ${pedido}`);

    if (pedidos[pedido]) {
        let estatus = Math.floor(Math.random() * 4) + 1;
        const promesa = new Promise((resolve, reject) => {
            if (estatus === 3) {
                pedidos[pedido].estatus = "Faltan ingredientes";
                reject(
                    "Error: faltan ingredientes"
                );
            } else if (estatus === 4) {
                pedidos[pedido].estatus ="Error en la cocina";
                reject(
                    "Error en la cocina"
                );
            } else {
                resolve();
            }
        });

        try {
            await promesa;
            console.log("Pedido continúa...");
        } catch(error) {
            console.log(error);
            return;
        }

        estatus = prompt(
            "Selecciona su estatus:\n" +
            "1. Preparando\n" +
            "2. Listo\n"
        );

        switch (estatus) {
            case "1":
                pedidoEstatus = "Preparando";
                break;
            case "2":
                pedidoEstatus = "Listo";
                break;
            default:
                pedidoEstatus = "Error";
        }
        pedidos[pedido].estatus = pedidoEstatus;
        console.log(
            `Pedido actualizado a ${pedidoEstatus}`
        );
    } else {
        console.log("Pedido no encontrado");
    }
}