import * as readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const preguntar = (texto) => new Promise(resolver => rl.question(texto, resolver));

export const color = {
    reset: "\x1b[0m",
    negro: "\x1b[30m",
    rojo: "\x1b[31m",
    verde: "\x1b[32m",
    blanco: "\x1b[37m",
    fondoVerde: "\x1b[42m",
    fondoBlanco: "\x1b[47m"
};

export const logoStarbucks = `
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

export const db = {
    productos: [
        { id: 1, nombre: "Cafe Americano", cantidad: 50, precio: 35.00, categoria: "bebida" },
        { id: 2, nombre: "Capuccino XL", cantidad: 40, precio: 48.00, categoria: "bebida" },
        { id: 3, nombre: "Espresso Doble", cantidad: 30, precio: 40.00, categoria: "bebida" },
        { id: 4, nombre: "Latte Frio de Vainilla", cantidad: 25, precio: 55.00, categoria: "bebida" },
        { id: 5, nombre: "Frappe de Oreo", cantidad: 20, precio: 60.00, categoria: "bebida" },
        { id: 6, nombre: "Cheesecake de Frambuesa", cantidad: 10, precio: 75.00, categoria: "postre" },
        { id: 7, nombre: "Muffin de Arandano", cantidad: 15, precio: 45.00, categoria: "postre" }
    ],
    pedidos: [],
    totalAcumulado: 0,
    contadorPedidos: 1
};

export function listarProductos() {
    if (db.productos.length === 0) {
        console.log(`\n${color.rojo}El inventario esta vacio.${color.reset}`);
        return;
    }
    console.log(`\n${color.fondoVerde}${color.blanco} --- INVENTARIO DISPONIBLE --- ${color.reset}`);
    db.productos.forEach(p => {
        console.log(`${color.fondoBlanco}${color.negro}[ID: ${color.verde}${p.id}${color.negro}] ${p.nombre} | Stock: ${color.verde}${p.cantidad}${color.negro} | Precio: ${color.verde}$${p.precio.toFixed(2)}${color.reset}`);
    });
}