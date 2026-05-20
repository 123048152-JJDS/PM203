
function mostrar_menu() {
    console.table(productos);
}

function menuDinamico() {
    let menu = productos.map(({ nombre, precio }) => `${nombre} - $${precio}`);
    menu.forEach(linea => console.log(linea));
}

function mostrar_promociones() {
    let promos = hacerPromociones(productos);

    let resultado = promos.map(p => ({
        producto:   p.nombre,
        original:   `$${p.precio}`,
        promocion:  `$${p.precioPromo}`,
        descuento:  p.descuento,
    }));

    console.table(resultado);
}

function productos_disponibles() {
    let disponibles = [];
    productos.forEach(({ nombre, categoria }) => {
        disponibles.push({ producto: nombre, categoria });
    });
    console.table(disponibles);
}