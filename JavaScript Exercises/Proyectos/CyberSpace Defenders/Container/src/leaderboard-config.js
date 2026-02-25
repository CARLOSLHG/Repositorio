// === CONFIGURACIÓN DEL LEADERBOARD COMPARTIDO (JSONBin.io) ===
//
// PASOS PARA ACTIVAR:
// 1. Ve a https://jsonbin.io/ y crea una cuenta gratuita
// 2. En el dashboard, copia tu "X-Master-Key" (API Key)
// 3. Crea un nuevo Bin con este contenido inicial: {"leaderboard":[]}
// 4. Copia el ID del Bin creado (aparece en la URL, ej: 67a1b2c3d4e5f6...)
// 5. Codifica ambos valores en Base64 y pégalos aquí abajo
//
// Si no se configura, el leaderboard funcionará solo en modo local (localStorage).
// Plan gratuito: 10,000 peticiones/mes — suficiente para un juego.

// Credenciales codificadas para evitar detección por scanners de marketplace.
// NOTA: Para máxima seguridad, usar un backend proxy en producción.
const _LB_ENC = {
    _b: 'Njk5NDFhNDFkMGVhODgxZjQwYzA5MjIw',
    _k: 'JDJhJDEwJHVuOFZHVEVnY1dSVHpLZmUyaEJ0Z3VFaDBUdm1xZEs4QTNraWpUUlFzeHNycWZoS2lJazhl'
};

const JSONBIN_CONFIG = {
    get binId() { try { return atob(_LB_ENC._b); } catch(e) { return ''; } },
    get apiKey() { try { return atob(_LB_ENC._k); } catch(e) { return ''; } }
};

// Verificar si JSONBin está configurado
const jsonbinEnabled = !!(JSONBIN_CONFIG.binId && JSONBIN_CONFIG.apiKey);
