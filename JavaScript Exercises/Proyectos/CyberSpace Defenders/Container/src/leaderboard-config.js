// === CONFIGURACION DEL LEADERBOARD REMOTO (PROXY/BACKEND) ===
//
// Importante:
// - No guardes API keys del proveedor en el frontend.
// - El backend/proxy debe manejar credenciales seguras en variables de entorno.
//
// Contrato esperado del endpoint:
// - GET  /api/leaderboard  -> { leaderboard: [...] } o [...]
// - PUT  /api/leaderboard  con body { leaderboard: [...] }
//
// Si endpoint es '', se usa solo localStorage.
const LEADERBOARD_CONFIG = {
    endpoint: ''
};

const leaderboardRemoteEnabled = typeof LEADERBOARD_CONFIG !== 'undefined' &&
    typeof LEADERBOARD_CONFIG.endpoint === 'string' &&
    LEADERBOARD_CONFIG.endpoint.trim() !== '';
