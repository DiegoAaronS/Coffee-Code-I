import { preguntar, color, db, listarProductos } from './datos.js';

export function prepararPedidoCocina(pedido) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const probabilidad = Math.random();
            
            if (probabilidad < 0.2) {
                reject("Error en cocina (Se quemó el café)");
            } else if (probabilidad >= 0.2 && probabilidad < 0.4) {
                reject("Falta ingrediente en inventario físico");
            } else {
                resolve(pedido); // Todo salió bien
            }
        }, 4500); 
    });
}

export async function menuCocina() {
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
                if (db.productos.length > 0) {
                    nuevoId = Math.max(...db.productos.map(p => p.id)) + 1;
                }
                
                db.productos.push({
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

                const indexEditar = db.productos.findIndex(p => p.id === idEditar);
                
                if (indexEditar !== -1) {
                    console.log(`${color.fondoBlanco}${color.verde} Deja en blanco si no quieres modificar un campo. ${color.reset}`);
                    const nuevoNombre = await preguntar(`${color.verde}Nuevo nombre: ${color.reset}`);
                    const nuevaCat = await preguntar(`${color.verde}Nueva categoria: ${color.reset}`);
                    const nuevaCantidad = await preguntar(`${color.verde}Nueva cantidad: ${color.reset}`);
                    const nuevoPrecio = await preguntar(`${color.verde}Nuevo precio: ${color.reset}`);
                    
                    if (nuevoNombre.trim() !== "") db.productos[indexEditar].nombre = nuevoNombre;
                    if (nuevaCat.trim() !== "") db.productos[indexEditar].categoria = nuevaCat;
                    
                    if (nuevaCantidad.trim() !== "") {
                        const cant = parseInt(nuevaCantidad);
                        if (!isNaN(cant) && cant >= 0) {
                            db.productos[indexEditar].cantidad = cant;
                        } else {
                            console.log(`${color.rojo}Cantidad ignorada: no es un numero valido.${color.reset}`);
                        }
                    }
                    
                    if (nuevoPrecio.trim() !== "") {
                        const prec = parseFloat(nuevoPrecio);
                        if (!isNaN(prec) && prec >= 0) {
                            db.productos[indexEditar].precio = prec;
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

                const indexEliminar = db.productos.findIndex(p => p.id === idEliminar);
                
                if (indexEliminar !== -1) {
                    db.productos.splice(indexEliminar, 1);
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

                if (filtro === '1') resultados = db.productos.filter(p => p.precio < 50);
                if (filtro === '2') resultados = db.productos.filter(p => p.precio >= 50);
                if (filtro === '3') resultados = db.productos.filter(p => p.categoria === 'bebida');
                if (filtro === '4') resultados = db.productos.filter(p => p.categoria === 'postre');
                
                if (filtro >= '1' && filtro <= '4') {
                    console.log(`\n${color.verde}Resultados encontrados:${color.reset}`);
                    resultados.forEach(p => console.log(`- ${p.nombre} ($${p.precio}) - Stock: ${p.cantidad}`));
                } else if (filtro === '5') {
                    const idBuscar = parseInt(await preguntar(`Ingresa el ID exacto: `));
                    const exacto = db.productos.find(p => p.id === idBuscar);
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