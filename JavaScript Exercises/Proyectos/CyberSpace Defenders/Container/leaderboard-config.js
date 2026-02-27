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
    endpoint: '',
    // Compatibilidad directa con JSONBin (menos seguro que usar backend proxy).
    jsonbin: {
        _b: 'Njk5NDFhNDFkMGVhODgxZjQwYzA5MjIw',
        _k: 'JDJhJDEwJHVuOFZHVEVnY1dSVHpLZmUyaEJ0Z3VFaDBUdm1xZEs4QTNraWpUUlFzeHNycWZoS2lJazhl',
        get binId() { try { return atob(this._b); } catch (e) { return ''; } },
        get apiKey() { try { return atob(this._k); } catch (e) { return ''; } }
    }
};

const leaderboardRemoteEnabled = (
    typeof LEADERBOARD_CONFIG !== 'undefined' &&
    typeof LEADERBOARD_CONFIG.endpoint === 'string' &&
    LEADERBOARD_CONFIG.endpoint.trim() !== ''
) || (
    !!(LEADERBOARD_CONFIG &&
        LEADERBOARD_CONFIG.jsonbin &&
        LEADERBOARD_CONFIG.jsonbin.binId &&
        LEADERBOARD_CONFIG.jsonbin.apiKey)
);
