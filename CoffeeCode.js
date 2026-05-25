import { preguntar, color, logoStarbucks, rl } from './datos.js';
import { menuCocina } from './cocina.js';
import { menuCliente } from './cliente.js';
import { menuCaja } from './caja.js';

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
                rl.close(); 
                break;
            default:
                console.log(`${color.rojo}Opcion no valida. Intenta de nuevo.${color.reset}`);
        }
    }
}

iniciar();