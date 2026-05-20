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