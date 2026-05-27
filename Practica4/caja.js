let pedidos = [];

function procesarPedido(pedido, onListo, onCancelado) {
    prepararEnCocina(pedido)
        .then((msg) => onListo(msg))
        .catch((msg) => onCancelado(msg));
}

function agregarPedido() {
    mostrar_menu();

    let indice = parseInt(prompt("Elige el número del producto (0 a " + (productos.length - 1) + "):"));

    if (isNaN(indice) || indice < 0 || indice >= productos.length) {
        alert("Selección inválida");
        return;
    }

    let { nombre: producto, precio } = productos[indice];
    let pedido = { producto, precio, estatus: "Pendiente" };
    pedidos.push(pedido);
    console.log(`Pedido agregado: ${producto} - $${precio} - (${pedido.estatus})`);

    procesarPedido(
        pedido,
        (msg) => {                              // onListo
            console.log(`LISTO: ${msg}`);
            alert(`Pedido listo: ${msg}`);
            mostrarPedidos();
            console.table(pedidos);
        },
        (msg) => {                              // onCancelado
            console.log(`CANCELADO: ${msg}`);
            alert(`Pedido cancelado: ${msg}`);
            pedidos = pedidos.filter(p => p !== pedido);  // no se cobra
            mostrarPedidos();
            console.table(pedidos);
        }
    );

    mostrarPedidos();
    console.table(pedidos);
}

function calcularTotales() {
    const subtotal = pedidos.reduce((acum, { precio }) => acum + precio, 0);
    const iva      = subtotal * 0.16;
    const total    = subtotal + iva;
    return { subtotal, iva, total };
}

function mostrarPedidos() {
    console.log("\n===== PEDIDOS =====");
    pedidos.forEach(({ producto, precio, estatus }, index) => {
        console.log(`${index + 1}. ${producto} - $${precio.toFixed(2)} - (${estatus})`);
    });

    const { subtotal, iva, total } = calcularTotales();
    console.log("-------------------");
    console.log(`  Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`  IVA 16%:  $${iva.toFixed(2)}`);
    console.log(`  Total:    $${total.toFixed(2)}`);
    console.log("===================\n");
}

function mostrarPedidosPorEstatus() {
    const listos     = pedidos.filter(p => p.estatus === "Listo");
    const cancelados = pedidos.filter(p => p.estatus === "Faltan ingredientes" || p.estatus === "Error en la cocina");
    const pendientes = pedidos.filter(p => p.estatus === "Pendiente" || p.estatus === "En preparación");

    console.log("\n===== PEDIDOS LISTOS =====");
    listos.length === 0
        ? console.log("  Sin pedidos listos")
        : listos.forEach(({ producto, precio }) => console.log(`  ${producto} - $${precio.toFixed(2)}`));

    console.log("\n===== PEDIDOS CANCELADOS =====");
    cancelados.length === 0
        ? console.log("  Sin pedidos cancelados")
        : cancelados.forEach(({ producto, estatus }) => console.log(`  ${producto} - (${estatus})`));

    console.log("\n===== PEDIDOS PENDIENTES =====");
    pendientes.length === 0
        ? console.log("  Sin pedidos pendientes")
        : pendientes.forEach(({ producto, estatus }) => console.log(`  ${producto} - (${estatus})`));

    console.log("\n==============================");
    console.log(`  Total:      ${pedidos.length}`);
    console.log(`  Listos:     ${listos.length}`);
    console.log(`  Cancelados: ${cancelados.length}`);
    console.log(`  Pendientes: ${pendientes.length}`);
    console.log("==============================\n");
}

function hacerPromociones(productos) {
    return productos.map((p) => ({
        ...p,
        precioPromo: parseFloat((p.precio * 0.9).toFixed(2)),
        descuento:   "10% off",
    }));
}