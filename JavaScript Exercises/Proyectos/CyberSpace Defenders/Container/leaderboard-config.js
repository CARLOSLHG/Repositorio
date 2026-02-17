// === CONFIGURACIÓN DEL LEADERBOARD COMPARTIDO (JSONBin.io) ===
//
// PASOS PARA ACTIVAR:
// 1. Ve a https://jsonbin.io/ y crea una cuenta gratuita
// 2. En el dashboard, copia tu "X-Master-Key" (API Key)
// 3. Crea un nuevo Bin con este contenido inicial: {"leaderboard":[]}
// 4. Copia el ID del Bin creado (aparece en la URL, ej: 67a1b2c3d4e5f6...)
// 5. Pega ambos valores aquí abajo
//
// Si no se configura, el leaderboard funcionará solo en modo local (localStorage).
// Plan gratuito: 10,000 peticiones/mes — suficiente para un juego.

const JSONBIN_CONFIG = {
    binId: "69941a41d0ea881f40c09220",
    apiKey: "$2a$10$un8VGTEgcWRTzKfe2hBtguEh0TvmqdK8A3kijTRQsxsrqfhKiIk8e"
};

// Verificar si JSONBin está configurado
const jsonbinEnabled = !!(JSONBIN_CONFIG.binId && JSONBIN_CONFIG.apiKey);

if (jsonbinEnabled) {
    console.log('JSONBin conectado - Leaderboard compartido activo');
} else {
    console.log('JSONBin no configurado - Leaderboard en modo local');
}
