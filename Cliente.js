import { preguntar, color, db } from './datos.js';

function mostrarMenuCliente() {
    const disponibles = db.productos.filter(p => p.cantidad > 0);
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
    console.log(`\n${color.fondoBlanco}${color.rojo}  PROMOCIONES  ${color.reset}`);
    console.log(`${color.verde}* ¡PROMO 3x2! ${color.blanco}Lleva exactamente 3 unidades de cualquier artículo y la tercera es gratis.${color.reset}`);
    console.log(`${color.verde}* ¡DESCUENTO VOLUMEN! ${color.blanco}Si compras 4 o más unidades del mismo artículo, te descontamos el 10% en ese artículo.${color.reset}\n`);
}

function procesarPedido(nombreCliente, items) {
    let itemsDetalle = [];

    for (let item of items) {
        const { productoId, cantidad } = item; 
        const producto = db.productos.find(p => p.id === productoId); 
        
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
            id: db.contadorPedidos++,
            cliente: nombreCliente.trim(),
            items: itemsDetalle,
            subtotal: subtotalPedido,
            iva: iva,
            total: totalPedido
        };
        db.pedidos.push(nuevoPedido);
        db.totalAcumulado += totalPedido;
        
        console.log(`\n${color.fondoVerde}${color.blanco} Pedido #${nuevoPedido.id} procesado con exito ${color.reset}`);
        console.log(`Subtotal: $${subtotalPedido.toFixed(2)} | IVA (16%): $${iva.toFixed(2)} | ${color.fondoBlanco}${color.negro} TOTAL: $${totalPedido.toFixed(2)} ${color.reset}`);
        
        mostrarPromociones();
    }
}

function mostrarPedidosPorCliente(nombreCliente) {
    const pedidosCliente = db.pedidos.filter(p => p.cliente.toLowerCase() === nombreCliente.toLowerCase());
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

export async function menuCliente() {
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
                if (filtroCli === '1') resultadosCli = db.productos.filter(p => p.precio < 50 && p.cantidad > 0);
                if (filtroCli === '2') resultadosCli = db.productos.filter(p => p.precio >= 50 && p.cantidad > 0);
                if (filtroCli === '3') resultadosCli = db.productos.filter(p => p.categoria === 'bebida' && p.cantidad > 0);
                if (filtroCli === '4') resultadosCli = db.productos.filter(p => p.categoria === 'postre' && p.cantidad > 0);

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
                    const encontrados = db.productos.filter(p => p.nombre.toLowerCase().includes(nombreBuscar.toLowerCase()) && p.cantidad > 0);
                    
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