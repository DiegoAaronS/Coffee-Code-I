const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (texto) => new Promise(resolver => readline.question(texto, resolver));

const color = {
    reset: "\x1b[0m",
    negro: "\x1b[30m",
    rojo: "\x1b[31m",
    verde: "\x1b[32m",
    blanco: "\x1b[37m",
    fondoVerde: "\x1b[42m",
    fondoBlanco: "\x1b[47m"
};

const logoStarbucks = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⣤⣤⣤⣤⣠⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣿⣿⣿⣿⡟⢿⣿⣿⣿⣿⣿⣿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠟⠀⠈⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠉⠉⠻⣿⠇⠀⣠⡀⠀⢹⡿⠟⠉⠁⣰⣿⣿⣿⣿⣿⣿⣿⣿⣷⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣦⡉⠙⠻⡄⠀⠀⠈⠐⠚⠛⠛⠓⠀⠀⠀⠀⡰⠛⠉⢉⣼⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀
⠀⠀⠀⣰⣿⡏⠻⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⣀⣠⣤⣤⣶⡶⢶⣤⣤⣤⣀⣀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⡿⠋⣿⣿⡄⠀⠀
⠀⠀⣰⣿⣿⠇⠀⠘⣿⡿⠿⠿⠿⢿⣿⣷⣶⢿⡟⣽⠟⠉⠀⠀⠀⠀⠉⠻⣝⢿⡻⣶⣿⣿⠿⠿⠿⠿⣿⡿⠁⠀⢻⣿⣿⡄⠀
⠀⢠⣿⣿⡟⠀⠀⠀⠁⠀⠀⢀⣤⣾⢟⡟⣱⠏⣼⡧⠒⢶⣤⡀⢀⣴⠶⠲⣿⡆⢿⡜⢯⢻⣷⣄⠀⠀⠀⠁⠀⠀⠈⢿⣿⣷⡀
⠀⣾⣿⠏⠀⠀⠀⠀⠀⠀⣴⣿⣿⠏⣾⢠⣿⠀⣿⡗⠿⠿⠻⠄⢸⡟⠿⠟⢿⡇⠘⣿⠘⣇⢻⣿⣷⣄⠀⠀⠀⠀⠀⠈⢻⣿⡇
⠀⡿⠃⢀⣠⣴⣶⣾⣷⣾⣿⣿⣿⠰⣯⠸⣿⡀⢻⡇⠀⠀⠀⣤⣤⠀⠀⠀⣸⠇⢰⣿⠀⣿⢈⣿⣿⣿⣷⣾⣷⣶⣤⣀⡀⠙⢿
⢸⣿⠿⠟⠋⠁⠀⢀⣾⣿⣿⣿⣿⠀⢿⡄⢻⣧⠀⢿⡄⠀⠢⣤⣤⠆⠀⣰⡏⢀⣾⠇⢸⡏⢨⣿⣿⣿⣿⣧⠀⠀⠈⠛⠻⢿⣿
⠈⠉⠀⢀⣤⣶⣶⣾⣿⣿⣿⣿⣿⡆⢸⣇⠈⣿⡄⠘⣷⣄⠀⠉⠉⠀⣠⡿⠁⣸⡿⠀⣾⠇⣸⣿⣿⣿⣿⣿⣶⣶⣦⣄⡀⠈⠉
⠸⣿⠿⠟⠋⠁⣀⣿⣿⣿⣿⣿⣿⡿⢨⣿⠀⣿⡷⠀⣿⡿⠿⢷⠾⠿⢿⡇⠀⣿⡇⢸⣿⠀⣿⣿⣿⣿⣿⣿⣷⠀⠈⠛⠿⢿⣿
⠀⣀⣀⣤⣶⡿⣿⣿⣿⣿⣿⣿⠟⢁⡾⠃⣰⡿⠁⣰⡿⠁⠀⠀⠀⠀⠘⣿⡄⠙⣿⡄⠹⣧⡙⢿⣿⣿⣿⣿⣿⡿⣷⣶⣄⣀⡀
⠀⠻⠟⠛⠁⣀⣼⣿⣿⣿⣿⠋⣰⡟⢁⣾⠟⢀⣼⠟⠁⠀⠀⠀⠀⠀⠀⠈⢿⣦⠈⢻⣦⠘⢷⡄⢻⣿⣿⣿⣿⣧⣀⠉⠛⠿⠇
⠀⠀⣤⣶⡿⠿⢻⣿⣿⣿⠇⠀⣿⠀⢸⣏⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣿⡇⠀⣿⡇⢸⣿⠀⠿⣿⣿⣿⠛⠿⣿⣦⡄⠀
⠀⠀⠘⠉⣠⣴⣶⠉⠉⠀⠀⠀⢻⣦⠘⣿⣆⠈⢿⣆⠀⠀⠀⠀⠀⠀⠀⢀⣼⡟⠀⣼⡿⢁⣼⠏⠀⠀⠈⠉⢙⣶⣤⡈⠙⠁⠀
⠀⠀⠀⠘⠿⠛⣁⣤⠀⠀⠀⣠⣴⣿⣧⠈⢿⣦⠈⢻⣧⡀⠀⠀⠀⠀⢠⣿⠏⢀⣼⡟⢠⣾⣿⣦⣀⠀⠀⠀⣄⡉⠻⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠲⣿⠟⢳⣾⣿⣿⣿⡟⣹⡇⠈⣿⣇⠀⢻⣧⠀⠀⠀⠀⣿⡏⠀⣾⡿⠀⣾⡇⣿⣿⣿⣿⣶⡚⠿⣿⠆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠁⢴⣿⠟⣿⣿⡟⢠⣿⠃⢰⣿⠇⠀⣾⡟⠀⠀⠀⠀⢿⣇⠀⢻⣿⡀⠹⣧⡘⢿⣿⡿⢻⣿⠆⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠁⠰⣿⠏⢠⣿⠃⢠⣿⠏⢀⣾⡟⠁⠀⠀⠀⠀⠘⣿⣆⠀⢻⣷⡀⠹⣷⡀⢿⡿⠆⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⠏⢠⣿⡏⠀⣼⣿⠁⠀⠀⠀⠀⠀⠀⠸⣿⡆⠀⢻⣷⠀⠻⠗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠀⠀⠿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣿⠿⠀⠘⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

let productos = [
    { id: 1, nombre: "Cafe Americano", cantidad: 50, precio: 35.00, categoria: "bebida" },
    { id: 2, nombre: "Capuccino XL", cantidad: 40, precio: 48.00, categoria: "bebida" },
    { id: 3, nombre: "Espresso Doble", cantidad: 30, precio: 40.00, categoria: "bebida" },
    { id: 4, nombre: "Latte Frio de Vainilla", cantidad: 25, precio: 55.00, categoria: "bebida" },
    { id: 5, nombre: "Frappe de Oreo", cantidad: 20, precio: 60.00, categoria: "bebida" },
    { id: 6, nombre: "Cheesecake de Frambuesa", cantidad: 10, precio: 75.00, categoria: "postre" },
    { id: 7, nombre: "Muffin de Arandano", cantidad: 15, precio: 45.00, categoria: "postre" }
];

let pedidos = [];
let totalAcumulado = 0;
let contadorPedidos = 1;

function listarProductos() {
    if (productos.length === 0) {
        console.log(`\n${color.rojo}El inventario esta vacio.${color.reset}`);
        return;
    }
    console.log(`\n${color.fondoVerde}${color.blanco} --- INVENTARIO DISPONIBLE --- ${color.reset}`);
    productos.forEach(p => {
        console.log(`${color.fondoBlanco}${color.negro}[ID: ${color.verde}${p.id}${color.negro}] ${p.nombre} | Stock: ${color.verde}${p.cantidad}${color.negro} | Precio: ${color.verde}$${p.precio.toFixed(2)}${color.reset}`);
    });
}

function mostrarMenuCliente() {
    const disponibles = productos.filter(p => p.cantidad > 0);
    if (disponibles.length === 0) {
        console.log(`\n${color.rojo}Lo sentimos, no hay productos disponibles por el momento.${color.reset}`);
        return false;
    }

    console.log(`\n${color.fondoVerde}${color.blanco} ╭──────────────────────────────────────────────────────────╮ ${color.reset}`);
    console.log(`${color.fondoVerde}${color.blanco} │                    NUESTRO MENÚ                          │ ${color.reset}`);
    console.log(`${color.fondoVerde}${color.blanco} ╰──────────────────────────────────────────────────────────╯ ${color.reset}`);
    
    disponibles.forEach(p => {
        let idFormat = p.id.toString().padStart(2, '0');
        let nombreFormat = p.nombre.padEnd(25, ' ');
        let catFormat = p.categoria.toUpperCase().padEnd(7, ' ');
        console.log(`  ${color.fondoBlanco}${color.negro} [${idFormat}] ${color.reset} ${color.fondoBlanco}${color.verde} ${nombreFormat}${color.reset} | ${color.fondoBlanco}${color.negro}${catFormat}${color.reset} | ${color.fondoBlanco}${color.verde} $${p.precio.toFixed(2)} ${color.reset}`);
    });
    return true;
}

function mostrarPromociones() {
    console.log(`\n${color.fondoBlanco}${color.rojo}  PROMOCIONES AUTOMÁTICAS  ${color.reset}`);
    console.log(`${color.verde}* ¡PROMO 3x2! ${color.blanco}Lleva exactamente 3 unidades de cualquier artículo y la tercera es gratis.${color.reset}`);
    console.log(`${color.verde}* ¡DESCUENTO VOLUMEN! ${color.blanco}Si compras 4 o más unidades del mismo artículo, te descontamos el 10% en ese artículo.${color.reset}\n`);
}

function procesarPedido(nombreCliente, items) {
    let itemsDetalle = [];

    for (let item of items) {
        const { productoId, cantidad } = item; 
        const producto = productos.find(p => p.id === productoId); 
        
        if (producto) {
            if (producto.cantidad >= cantidad && cantidad > 0) {
                producto.cantidad -= cantidad;
                
                let subtotalItem = producto.precio * cantidad;
                let notaPromo = "";

                if (cantidad === 3) {
                    subtotalItem = producto.precio * 2;
                    notaPromo = ` ${color.verde}[PROMO 3x2]${color.reset}`;
                } else if (cantidad > 3) {
                    subtotalItem = subtotalItem * 0.90;
                    notaPromo = ` ${color.verde}[-10% DESC]${color.reset}`;
                }

                itemsDetalle.push({
                    nombre: producto.nombre + notaPromo,
                    cantidad: cantidad,
                    subtotalItem: subtotalItem
                });
            } else {
                console.log(`${color.rojo}Stock insuficiente para el producto ID ${productoId}${color.reset}`);
            }
        } else {
            console.log(`${color.rojo}Producto ID ${productoId} no encontrado.${color.reset}`);
        }
    }

    if (itemsDetalle.length > 0) {
        const subtotalPedido = itemsDetalle.reduce((acumulador, itemActual) => acumulador + itemActual.subtotalItem, 0);
        const iva = subtotalPedido * 0.16;
        const totalPedido = subtotalPedido + iva;

        const nuevoPedido = {
            id: contadorPedidos++,
            cliente: nombreCliente.trim(),
            items: itemsDetalle,
            subtotal: subtotalPedido,
            iva: iva,
            total: totalPedido
        };
        pedidos.push(nuevoPedido);
        totalAcumulado += totalPedido;
        
        console.log(`\n${color.fondoVerde}${color.blanco} Pedido #${nuevoPedido.id} procesado con exito ${color.reset}`);
        console.log(`Subtotal: $${subtotalPedido.toFixed(2)} | IVA (16%): $${iva.toFixed(2)} | ${color.fondoBlanco}${color.negro} TOTAL: $${totalPedido.toFixed(2)} ${color.reset}`);
        
        mostrarPromociones();
    }
}

function mostrarPedidosPorCliente(nombreCliente) {
    const pedidosCliente = pedidos.filter(p => p.cliente.toLowerCase() === nombreCliente.toLowerCase());
    if (pedidosCliente.length === 0) {
        console.log(`\n${color.rojo}No se encontraron pedidos para este cliente.${color.reset}`);
        return;
    }
    pedidosCliente.forEach(pedido => {
        console.log(`\n${color.fondoBlanco}${color.verde} Pedido #${pedido.id} ${color.reset}`);
        pedido.items.forEach(item => {
            console.log(`  - ${item.cantidad} x ${item.nombre} = ${color.verde}$${item.subtotalItem.toFixed(2)}${color.reset}`);
        });
        console.log(`  ${color.blanco}Subtotal: $${pedido.subtotal.toFixed(2)} | IVA: $${pedido.iva.toFixed(2)} | Total: ${color.fondoVerde}${color.blanco} $${pedido.total.toFixed(2)} ${color.reset}`);
    });
}

async function menuCocina() {
    let salir = false;
    while (!salir) {
        console.log(`\n${color.fondoVerde}${color.blanco} --- MODULO COCINA --- ${color.reset}`);
        console.log(`${color.blanco}1. Ver lista de productos${color.reset}`);
        console.log(`${color.blanco}2. Agregar un producto${color.reset}`);
        console.log(`${color.blanco}3. Editar un producto${color.reset}`);
        console.log(`${color.blanco}4. Eliminar un producto${color.reset}`);
        console.log(`${color.blanco}5. Filtros y Busquedas Inteligentes${color.reset}`);
        console.log(`${color.blanco}6. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                console.log(`\n${color.fondoBlanco}${color.verde} --- Nuevo Producto --- ${color.reset}`);
                const nombre = await preguntar(`${color.verde}Nombre: ${color.reset}`);
                const categoria = await preguntar(`${color.verde}Categoria (bebida/postre): ${color.reset}`);
                
                const cantidadStr = await preguntar(`${color.verde}Cantidad (solo numeros): ${color.reset}`);
                const cantidadValidada = parseInt(cantidadStr);
                if (isNaN(cantidadValidada) || cantidadValidada < 0) {
                    console.log(`${color.rojo}Error: La cantidad debe ser un numero valido. Regresando al menu...${color.reset}`);
                    break;
                }

                const precioStr = await preguntar(`${color.verde}Precio (solo numeros): ${color.reset}`);
                const precioValidado = parseFloat(precioStr);
                if (isNaN(precioValidado) || precioValidado < 0) {
                    console.log(`${color.rojo}Error: El precio debe ser un numero valido. Regresando al menu...${color.reset}`);
                    break;
                }
                
                let nuevoId = 1;
                if (productos.length > 0) {
                    nuevoId = Math.max(...productos.map(p => p.id)) + 1;
                }
                
                productos.push({
                    id: nuevoId,
                    nombre: nombre,
                    cantidad: cantidadValidada,
                    precio: precioValidado,
                    categoria: categoria.toLowerCase()
                });
                console.log(`${color.fondoVerde}${color.blanco} Producto agregado correctamente con el ID automatico: ${nuevoId} ${color.reset}`);
                break;
            case '3':
                listarProductos();
                const inputIdEditar = await preguntar(`\n${color.verde}Ingresa el ID del producto a editar: ${color.reset}`);
                const idEditar = parseInt(inputIdEditar);
                
                if (isNaN(idEditar)) {
                    console.log(`${color.rojo}ID invalido. Regresando al menu...${color.reset}`);
                    break;
                }

                const indexEditar = productos.findIndex(p => p.id === idEditar);
                
                if (indexEditar !== -1) {
                    console.log(`${color.fondoBlanco}${color.verde} Deja en blanco si no quieres modificar un campo. ${color.reset}`);
                    const nuevoNombre = await preguntar(`${color.verde}Nuevo nombre: ${color.reset}`);
                    const nuevaCat = await preguntar(`${color.verde}Nueva categoria: ${color.reset}`);
                    const nuevaCantidad = await preguntar(`${color.verde}Nueva cantidad: ${color.reset}`);
                    const nuevoPrecio = await preguntar(`${color.verde}Nuevo precio: ${color.reset}`);
                    
                    if (nuevoNombre.trim() !== "") productos[indexEditar].nombre = nuevoNombre;
                    if (nuevaCat.trim() !== "") productos[indexEditar].categoria = nuevaCat;
                    
                    if (nuevaCantidad.trim() !== "") {
                        const cant = parseInt(nuevaCantidad);
                        if (!isNaN(cant) && cant >= 0) {
                            productos[indexEditar].cantidad = cant;
                        } else {
                            console.log(`${color.rojo}Cantidad ignorada: no es un numero valido.${color.reset}`);
                        }
                    }
                    
                    if (nuevoPrecio.trim() !== "") {
                        const prec = parseFloat(nuevoPrecio);
                        if (!isNaN(prec) && prec >= 0) {
                            productos[indexEditar].precio = prec;
                        } else {
                            console.log(`${color.rojo}Precio ignorado: no es un numero valido.${color.reset}`);
                        }
                    }
                    console.log(`${color.fondoVerde}${color.blanco} Producto actualizado exitosamente. ${color.reset}`);
                } else {
                    console.log(`${color.rojo}Producto no encontrado. Regresando al menu...${color.reset}`);
                }
                break;
            case '4':
                listarProductos();
                const inputIdEliminar = await preguntar(`\n${color.verde}Ingresa el ID del producto a eliminar: ${color.reset}`);
                const idEliminar = parseInt(inputIdEliminar);
                
                if (isNaN(idEliminar)) {
                    console.log(`${color.rojo}ID invalido. Regresando al menu...${color.reset}`);
                    break;
                }

                const indexEliminar = productos.findIndex(p => p.id === idEliminar);
                
                if (indexEliminar !== -1) {
                    productos.splice(indexEliminar, 1);
                    console.log(`${color.fondoVerde}${color.blanco} Producto eliminado exitosamente. ${color.reset}`);
                } else {
                    console.log(`${color.rojo}El producto con ese ID no existe. Regresando al menu...${color.reset}`);
                }
                break;
            case '5':
                console.log(`\n${color.fondoBlanco}${color.verde} --- BUSQUEDAS AUTOMATICAS (COCINA) --- ${color.reset}`);
                console.log("1. Productos Baratos (Menos de $50)");
                console.log("2. Productos Caros ($50 o mas)");
                console.log("3. Solo Bebidas");
                console.log("4. Solo Postres");
                console.log("5. Buscar producto exacto por ID");
                
                const filtro = await preguntar(`\n${color.verde}Aplica un filtro: ${color.reset}`);
                let resultados = [];

                if (filtro === '1') resultados = productos.filter(p => p.precio < 50);
                if (filtro === '2') resultados = productos.filter(p => p.precio >= 50);
                if (filtro === '3') resultados = productos.filter(p => p.categoria === 'bebida');
                if (filtro === '4') resultados = productos.filter(p => p.categoria === 'postre');
                
                if (filtro >= '1' && filtro <= '4') {
                    console.log(`\n${color.verde}Resultados encontrados:${color.reset}`);
                    resultados.forEach(p => console.log(`- ${p.nombre} ($${p.precio}) - Stock: ${p.cantidad}`));
                } else if (filtro === '5') {
                    const idBuscar = parseInt(await preguntar(`Ingresa el ID exacto: `));
                    const exacto = productos.find(p => p.id === idBuscar);
                    if (exacto) console.log(`\n¡Encontrado! ${exacto.nombre} - Stock: ${exacto.cantidad}`);
                    else console.log(`${color.rojo}Producto no encontrado.${color.reset}`);
                } else {
                    console.log(`${color.rojo}Opcion no valida.${color.reset}`);
                }
                break;
            case '6':
                salir = true;
                break;
            default:
                console.log(`${color.rojo}Opcion no valida.${color.reset}`);
        }
    }
}

async function menuCliente() {
    let salir = false;
    while (!salir) {
        console.log(`\n${color.fondoVerde}${color.blanco} --- MODULO CLIENTE --- ${color.reset}`);
        console.log(`${color.blanco}1. Ver Menu y Promociones${color.reset}`);
        console.log(`${color.blanco}2. Filtrar/Buscar Productos${color.reset}`);
        console.log(`${color.blanco}3. Crear Pedido${color.reset}`);
        console.log(`${color.blanco}4. Listar Mis Pedidos${color.reset}`);
        console.log(`${color.blanco}5. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                mostrarMenuCliente();
                mostrarPromociones();
                break;
            case '2':
                console.log(`\n${color.fondoBlanco}${color.verde} --- BUSQUEDA DE PRODUCTOS --- ${color.reset}`);
                console.log("1. Productos Accesibles (Menos de $50)");
                console.log("2. Productos Premium ($50 o mas)");
                console.log("3. Solo Bebidas");
                console.log("4. Solo Postres");
                console.log("5. Buscar por nombre exacto o palabra clave");

                const filtroCli = await preguntar(`\n${color.verde}Elige una opcion de busqueda: ${color.reset}`);
                let resultadosCli = [];
                if (filtroCli === '1') resultadosCli = productos.filter(p => p.precio < 50 && p.cantidad > 0);
                if (filtroCli === '2') resultadosCli = productos.filter(p => p.precio >= 50 && p.cantidad > 0);
                if (filtroCli === '3') resultadosCli = productos.filter(p => p.categoria === 'bebida' && p.cantidad > 0);
                if (filtroCli === '4') resultadosCli = productos.filter(p => p.categoria === 'postre' && p.cantidad > 0);

                if (filtroCli >= '1' && filtroCli <= '4') {
                    if (resultadosCli.length > 0) {
                        console.log(`\n${color.fondoVerde}${color.blanco} RESULTADOS DE TU BUSQUEDA ${color.reset}`);
                        resultadosCli.forEach(p => {
                            let idF = p.id.toString().padStart(2, '0');
                            let nomF = p.nombre.padEnd(25, ' ');
                            console.log(`  ${color.fondoBlanco}${color.negro} [${idF}] ${color.reset} ${color.fondoBlanco}${color.verde} ${nomF}${color.reset} | ${color.fondoBlanco}${color.verde} $${p.precio.toFixed(2)} ${color.reset}`);
                        });
                    } else {
                        console.log(`\n${color.rojo}No hay productos disponibles para este filtro en este momento.${color.reset}`);
                    }
                } else if (filtroCli === '5') {
                    const nombreBuscar = await preguntar(`\n${color.verde}Ingresa el nombre del producto que buscas: ${color.reset}`);
                    const encontrados = productos.filter(p => p.nombre.toLowerCase().includes(nombreBuscar.toLowerCase()) && p.cantidad > 0);
                    
                    if (encontrados.length > 0) {
                        console.log(`\n${color.fondoVerde}${color.blanco} ¡ENCONTRAMOS ESTO PARA TI! ${color.reset}`);
                        encontrados.forEach(p => {
                            let idF = p.id.toString().padStart(2, '0');
                            let nomF = p.nombre.padEnd(25, ' ');
                            console.log(`  ${color.fondoBlanco}${color.negro} [${idF}] ${color.reset} ${color.fondoBlanco}${color.verde} ${nomF}${color.reset} | ${color.fondoBlanco}${color.verde} $${p.precio.toFixed(2)} ${color.reset}`);
                        });
                    } else {
                        console.log(`\n${color.rojo}Lo sentimos, no encontramos un producto disponible con ese nombre.${color.reset}`);
                    }
                } else {
                    console.log(`${color.rojo}Opcion no valida.${color.reset}`);
                }
                break;
            case '3':
                const hayProductos = mostrarMenuCliente();
                if (!hayProductos) break;

                const nombreCliente = await preguntar(`\n${color.verde}Ingresa tu nombre: ${color.reset}`);
                let items = [];
                let agregando = true;
                console.log(`${color.fondoBlanco}${color.verde} Agrega productos con el formato ID,cantidad (ejemplo: 1,2) ${color.reset}`);
                console.log(`${color.verde}Escribe 'listo' para terminar.${color.reset}`);
                
                while (agregando) {
                    const entrada = await preguntar(`${color.verde}Producto (ID,cantidad): ${color.reset}`);
                    if (entrada.toLowerCase() === "listo") {
                        agregando = false;
                        break;
                    }
                    const partes = entrada.split(",");
                    if(partes.length === 2) {
                        const pid = parseInt(partes[0]);
                        const pcant = parseInt(partes[1]);
                        if (!isNaN(pid) && !isNaN(pcant) && pcant > 0) {
                            items.push({ productoId: pid, cantidad: pcant });
                        } else {
                            console.log(`${color.rojo}Valores invalidos. Asegurate de ingresar numeros y una cantidad mayor a 0.${color.reset}`);
                        }
                    } else {
                        console.log(`${color.rojo}Formato incorrecto. Usa ID,cantidad${color.reset}`);
                    }
                }
                if (items.length > 0) {
                    procesarPedido(nombreCliente, items);
                }
                break;
            case '4':
                const cliente = await preguntar(`\n${color.verde}Ingresa tu nombre para buscar: ${color.reset}`);
                mostrarPedidosPorCliente(cliente);
                break;
            case '5':
                salir = true;
                break;
            default:
                console.log(`${color.rojo}Opcion no valida.${color.reset}`);
        }
    }
}

async function menuCaja() {
    let salir = false;
    while (!salir) {
        console.log(`\n${color.fondoVerde}${color.blanco} --- MODULO CAJA --- ${color.reset}`);
        console.log(`${color.blanco}1. Mostrar inventario${color.reset}`);
        console.log(`${color.blanco}2. Mostrar todos los pedidos${color.reset}`);
        console.log(`${color.blanco}3. Ver total acumulado${color.reset}`);
        console.log(`${color.blanco}4. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                if (pedidos.length === 0) {
                    console.log(`\n${color.rojo}No hay pedidos registrados.${color.reset}`);
                } else {
                    console.log(`\n${color.fondoBlanco}${color.verde} --- HISTORIAL DE PEDIDOS --- ${color.reset}`);
                    pedidos.forEach(pedido => {
                        console.log(`Pedido #${color.verde}${pedido.id}${color.reset} | Cliente: ${color.blanco}${pedido.cliente}${color.reset} | Total: ${color.verde}$${pedido.total.toFixed(2)}${color.reset}`);
                    });
                }
                break;
            case '3':
                console.log(`\n${color.fondoVerde}${color.blanco} Total acumulado en caja: $${totalAcumulado.toFixed(2)} ${color.reset}`);
                break;
            case '4':
                salir = true;
                break;
            default:
                console.log(`${color.rojo}Opcion no valida.${color.reset}`);
        }
    }
}

async function iniciar() {
    console.clear(); 
    console.log(`${color.verde}${logoStarbucks}${color.reset}`); 
    
    let salir = false;
    while (!salir) {
        console.log(`\n${color.fondoVerde}${color.blanco}=============================${color.reset}`);
        console.log(`${color.fondoVerde}${color.blanco}         STARBUCKS           ${color.reset}`);
        console.log(`${color.fondoVerde}${color.blanco}=============================${color.reset}`);
        console.log(`${color.blanco}1. Acceder a Cocina (Gestion)${color.reset}`);
        console.log(`${color.blanco}2. Acceder a Cliente${color.reset}`);
        console.log(`${color.blanco}3. Acceder a Caja${color.reset}`);
        console.log(`${color.rojo}4. Salir del programa${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Selecciona un modulo: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                await menuCocina();
                break;
            case '2':
                await menuCliente();
                break;
            case '3':
                await menuCaja();
                break;
            case '4':
                salir = true;
                console.log(`${color.fondoBlanco}${color.verde} Cerrando sistema... ${color.reset}`);
                readline.close();
                break;
            default:
                console.log(`${color.rojo}Opcion no valida. Intenta de nuevo.${color.reset}`);
        }
    }
}

iniciar();