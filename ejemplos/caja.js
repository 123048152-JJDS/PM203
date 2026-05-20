
let pedidos = [];

function agregarPedido() {
    console.table(productos);

    let indice = parseInt(prompt(
        "Escribe el índice del producto a pedir\n" + "(revisa la consola para ver el catálogo)"
    ));

    if (isNaN(indice) || indice < 0 || indice >= productos.length) {
        alert("Índice inválido");
        return;
    }

    const { nombre, precio } = productos[indice];

    pedidos.push({ producto: nombre, precio });
    console.log(`Pedido agregado: ${nombre} - $${precio}`);
    mostrarPedidos();
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
        console.log(`${index + 1}. ${producto} - $${precio.toFixed(2)}`);
    });

    const { subtotal, iva, total } = calcularTotales();

    console.log("-------------------");
    console.log(`  Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`  IVA 16%:  $${iva.toFixed(2)}`);
    console.log(`  Total:    $${total.toFixed(2)}`);
    console.log("===================\n");
}

function hacerPromociones(productos) {
    const promos = productos.map((p) => ({
        ...p,
        precioPromo: parseFloat((p.precio * 0.9).toFixed(2)),
        descuento:   "10% off",
    }));
    return promos;
}