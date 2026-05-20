const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (texto) => new Promise(resolver => readline.question(texto, resolver));

const color = {
    reset: "\x1b[0m",
    
    // Color de texto
    negro: "\x1b[30m",
    rojo: "\x1b[31m",
    verde: "\x1b[32m",
    blanco: "\x1b[37m",
    
    // Color de fondo
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
    { id: 1, nombre: "Cafe Americano", cantidad: 50, precio: 35.00 },
    { id: 2, nombre: "Capuccino XL", cantidad: 40, precio: 48.00 },
    { id: 3, nombre: "Espresso Doble", cantidad: 30, precio: 40.00 },
    { id: 4, nombre: "Latte Frio de Vainilla", cantidad: 25, precio: 55.00 },
    { id: 5, nombre: "Frappe de Oreo", cantidad: 20, precio: 60.00 }
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

function procesarPedido(nombreCliente, items) {
    let itemsDetalle = [];
    let totalPedido = 0;

    for (let item of items) {
        const producto = productos.find(p => p.id === item.productoId);
        if (producto) {
            if (producto.cantidad >= item.cantidad && item.cantidad > 0) {
                producto.cantidad -= item.cantidad;
                const subtotal = producto.precio * item.cantidad;
                itemsDetalle.push({
                    nombre: producto.nombre,
                    cantidad: item.cantidad,
                    subtotal: subtotal
                });
                totalPedido += subtotal;
            } else {
                console.log(`${color.rojo}Stock insuficiente para el producto ID ${item.productoId}${color.reset}`);
            }
        } else {
            console.log(`${color.rojo}Producto ID ${item.productoId} no encontrado.${color.reset}`);
        }
    }

    if (itemsDetalle.length > 0) {
        const nuevoPedido = {
            id: contadorPedidos++,
            cliente: nombreCliente.trim(),
            items: itemsDetalle,
            total: totalPedido
        };
        pedidos.push(nuevoPedido);
        totalAcumulado += totalPedido;
        console.log(`\n${color.fondoVerde}${color.blanco} Pedido #${nuevoPedido.id} creado con exito. ${color.reset}`);
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
            console.log(`  - ${item.cantidad} x ${item.nombre} = ${color.verde}$${item.subtotal.toFixed(2)}${color.reset}`);
        });
        console.log(`  ${color.blanco}Total del pedido: ${color.fondoVerde}${color.blanco} $${pedido.total.toFixed(2)} ${color.reset}`);
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
        console.log(`${color.blanco}5. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                console.log(`\n${color.fondoBlanco}${color.verde} --- Nuevo Producto --- ${color.reset}`);
                const nombre = await preguntar(`${color.verde}Nombre: ${color.reset}`);
                
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
                    precio: precioValidado
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
                    const nuevaCantidad = await preguntar(`${color.verde}Nueva cantidad: ${color.reset}`);
                    const nuevoPrecio = await preguntar(`${color.verde}Nuevo precio: ${color.reset}`);
                    
                    if (nuevoNombre.trim() !== "") productos[indexEditar].nombre = nuevoNombre;
                    
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
                    console.log(`${color.rojo}Producto no encontrado. Regresando al menu de cocina...${color.reset}`);
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
        console.log(`${color.blanco}1. Consultar Productos${color.reset}`);
        console.log(`${color.blanco}2. Crear Pedido${color.reset}`);
        console.log(`${color.blanco}3. Listar Mis Pedidos${color.reset}`);
        console.log(`${color.blanco}4. Regresar al menu principal${color.reset}`);
        
        const opcion = await preguntar(`\n${color.verde}Elige una opcion: ${color.reset}`);
        
        switch (opcion.trim()) {
            case '1':
                listarProductos();
                break;
            case '2':
                listarProductos();
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
            case '3':
                const cliente = await preguntar(`\n${color.verde}Ingresa tu nombre para buscar: ${color.reset}`);
                mostrarPedidosPorCliente(cliente);
                break;
            case '4':
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
    console.clear(); // Limpia la consola antes de iniciar
    console.log(`${color.verde}${logoStarbucks}${color.reset}`); // Imprime el logo en verde
    
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