function mostrar_menu(productos){
    console.table(productos);
}

function mostrar_promociones(productos){
    let promos = hacerPromociones(productos);
    let promociones = promos.map(promocion => {
        return {
            producto: promocion.nombre,
            precio: promocion.precioPromo
        };
    });
    console.table(promociones);
}

function productos_disponibles(productos){
    let disponibles = [];
    productos.forEach(producto => {
        disponibles.push({
            producto: producto.nombre,
            categoria: producto.categoria
        });
    });
    console.table(disponibles);
}

function esperar(tiempo){
    return new Promise(resolve => {
        setTimeout(resolve, tiempo);
    });
}

async function mostrar_estado_pedido(pedidos){
    for(const pedido of pedidos){
        console.log(`
            Pedido
            Producto: ${pedido.producto}
            Estado: ${pedido.estatus}
        `);
        await esperar(2000);
    }
}