    (function() {
        // Versión 3.0 - Sistema de misiles + Packs de munición

        // --- Utilidades de seguridad ---
        function escapeHTML(str) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        // Hash SHA-256 para verificación de clave admin (nunca almacenar en texto plano)
        const ADMIN_HASH = 'c7d33c0557ab5572dca8cabb712c2c22551f5d2259ee37b200e4df273efe13d6';
        async function sha256(text) {
            const data = new TextEncoder().encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        }

        // --- Descarga del sticker de rango ---
        function downloadRankSticker() {
            const img = document.getElementById('rank-sticker-img');
            if (!img || !img.src) return;
            var a = document.createElement('a');
            a.href = img.src;
            var parts = img.src.split('/');
            a.download = parts[parts.length - 1] || 'rank-sticker.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // --- Zoom del sticker de rango (click para agrandar/cerrar) ---
        function toggleStickerZoom() {
            var existing = document.getElementById('sticker-zoom-overlay');
            if (existing) {
                existing.remove();
                return;
            }
            var img = document.getElementById('rank-sticker-img');
            if (!img || !img.src) return;
            var overlay = document.createElement('div');
            overlay.id = 'sticker-zoom-overlay';
            overlay.className = 'sticker-zoom-overlay';
            var bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.alt = img.alt;
            bigImg.draggable = false;
            overlay.appendChild(bigImg);
            overlay.addEventListener('click', function() { overlay.remove(); });
            document.body.appendChild(overlay);
        }

        const playerScreen = document.getElementById('player-screen');
        const playerNameInput = document.getElementById('player-name-input');
        const startGameButton = document.getElementById('start-game-button');
        const gameContainer = document.getElementById('game-container');
        const spaceship = document.getElementById('spaceship');
        const playerDisplay = document.getElementById('player-display');
        let playerName = '';
        let gameStarted = false;
        let gameOver = false;
        let lightYears = 0;
        let asteroidCount = 0;
        let cyberattackCount = 0;
        let threatsEscaped = 0;      // amenazas dejadas pasar
        let totalPenalty = 0;         // total de amenazas perdidas por penalización
        let musicPlaying = true;
        let asteroidGenerationInterval;
        let gameStartTime = null;
        let currentEntryId = null;

        // --- Sistema de misiles ---
        let missileCount = 50;
        let ammoPackTimeout = null;
        let missilesUsed = 0;
        let packsCollected = 0;
        const AMMO_PACK_TYPES = [
            { amount: 25,  label: 'PATCH',    color: '#22cc66', glowColor: '#22cc66', darkColor: '#178a44', img: './img/pack-25.png', probability: 0.50 },
            { amount: 50,  label: 'FIREWALL', color: '#d4a017', glowColor: '#d4a017', darkColor: '#9a7510', img: './img/pack-50.png', probability: 0.30 },
            { amount: 75,  label: 'ENCRYPT',  color: '#f0c040', glowColor: '#f0c040', darkColor: '#c89a20', img: './img/pack-75.png', probability: 0.15 },
            { amount: 100, label: 'ZERO-DAY', color: '#00bfff', glowColor: '#00bfff', darkColor: '#0088bb', img: './img/pack-100.png', probability: 0.05 }
        ];

        // --- Super Capsule: God Mode ---
        let godModeActive = false;
        let godModeTimer = null;
        let godModeBlinkTimer = null;
        let godModeAutoFireInterval = null;
        let godModeHaloEl = null;
        let superCapsuleSpawnTimeout = null;
        let activeSuperCapsules = [];
        let storedSuperCapsules = 0;
        const GOD_MODE_DURATION = 10000;       // 10 segundos
        const GOD_MODE_WARN_AT = 5000;         // parpadeo a los 5s restantes
        const GOD_MODE_AUTOFIRE_RATE = 120;    // ms entre disparos automáticos

        // --- Life Pack: Vidas extra ---
        const INITIAL_EXTRA_LIVES = 2;
        let storedLives = INITIAL_EXTRA_LIVES;
        let activeLifePacks = [];
        let lifePackSpawnTimeout = null;

        // --- Dual Shoot: disparo doble (activo hasta morir) ---
        let dualShootActive = false;
        let storedDualShoots = 0;
        let activeDualShootPacks = [];
        let dualShootSpawnTimeout = null;

        // --- Laser Point: mira láser con línea guía (activo hasta morir) ---
        let laserPointActive = false;
        let storedLaserPoints = 0;
        let laserPointGuideEl = null;
        let activeLaserPointPacks = [];
        let laserPointSpawnTimeout = null;

        // --- Triple Shoot: disparo triple en abanico (activo hasta morir) ---
        let tripleShootActive = false;
        let storedTripleShoots = 0;
        let activeTripleShootPacks = [];
        let tripleShootSpawnTimeout = null;
        const TRIPLE_SHOOT_ANGLE = Math.tan(30 * Math.PI / 180); // tan(30°) ≈ 0.577

        // --- Sistema de dificultad progresiva ---
        let maxDifficultyLevel = 0;
        let asteroidSpawnTimeout = null;

        const DIFFICULTY_LEVELS = [
            { name: 'SEGURO',      color: '#22cc66', threshold: 0 },
            { name: 'ALERTA',      color: '#ffcc00', threshold: 30 },
            { name: 'PELIGRO',     color: '#ff8800', threshold: 60 },
            { name: 'CRÍTICO',     color: '#ff3b3f', threshold: 120 },
            { name: 'EXTREMO',     color: '#cc00ff', threshold: 180 },
            { name: 'APOCALIPSIS', color: '#ff0066', threshold: 300 }
        ];

        // Calcula todos los parámetros de dificultad basado en tiempo transcurrido
        function getDifficulty(elapsedSeconds) {
            // Progresión suave de 0 a 1 en 300 segundos (5 min) con curva acelerada
            const progress = Math.min(1, elapsedSeconds / 300);
            const factor = Math.pow(progress, 1.4);

            // Determinar nivel visual
            let level = 0;
            for (let i = DIFFICULTY_LEVELS.length - 1; i >= 0; i--) {
                if (elapsedSeconds >= DIFFICULTY_LEVELS[i].threshold) {
                    level = i;
                    break;
                }
            }

            return {
                level: level,
                levelName: DIFFICULTY_LEVELS[level].name,
                levelColor: DIFFICULTY_LEVELS[level].color,

                // Intervalo de spawn de amenazas: 1500ms → 500ms
                spawnInterval: 1500 - (1000 * factor),

                // Probabilidad de cyberattack por cada spawn: 0.40 → 0.75
                cyberProbability: 0.40 + (0.35 * factor),

                // Velocidad asteroides (duración animación): 3-6s → 1.5-3s
                asteroidSpeedMin: 3 - (1.5 * factor),
                asteroidSpeedRange: 3 - (1.5 * factor),

                // Velocidad cyberattacks: 5-9s → 2.5-5s
                cyberSpeedMin: 5 - (2.5 * factor),
                cyberSpeedRange: 4 - (1.5 * factor),

                // Velocidad packs: 4-7s → 3-5.5s
                packSpeedMin: 4 - (1 * factor),
                packSpeedRange: 3 - (0.5 * factor),

                // Delay base de packs: 10.8s → 18s (−10% más frecuentes)
                packBaseDelay: 10800 + (7200 * factor),

                // Delay máximo de packs: 40.5s → 49.5s (−10%)
                packMaxDelay: 40500 + (9000 * factor),

                // Incremento de delay por segundo: 45ms → 81ms (−10%)
                packMsPerSecond: 45 + (36 * factor),

                // Probabilidad de multi-spawn (2 asteroides a la vez): 0% → 40%
                multiSpawnChance: 0.40 * factor,

                // Shift de probabilidad de packs: los mejores packs se vuelven más raros
                packProbabilityShift: factor * 0.15,

                // Velocidad del fondo: 20s → 8s
                backgroundSpeed: 20 - (12 * factor)
            };
        }

        function getDifficultyLevel(elapsedSeconds) {
            for (let i = DIFFICULTY_LEVELS.length - 1; i >= 0; i--) {
                if (elapsedSeconds >= DIFFICULTY_LEVELS[i].threshold) return i;
            }
            return 0;
        }

        // --- Actualizar display de misiles ---
        function updateMissileDisplay() {
            const countEl = document.getElementById('missile-count-text');
            const barEl = document.getElementById('missile-bar');
            if (!countEl || !barEl) return;

            countEl.textContent = missileCount;
            const barPercent = Math.min(100, (missileCount / 200) * 100);
            barEl.style.width = barPercent + '%';

            if (missileCount > 50) {
                barEl.style.background = 'linear-gradient(90deg, #22cc66, #00ffcc)';
                countEl.style.color = '#22cc66';
                countEl.classList.remove('missile-low');
            } else if (missileCount > 25) {
                barEl.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc44)';
                countEl.style.color = '#ffaa00';
                countEl.classList.remove('missile-low');
            } else {
                barEl.style.background = 'linear-gradient(90deg, #ff3b3f, #ff6666)';
                countEl.style.color = '#ff3b3f';
                countEl.classList.add('missile-low');
            }
        }

        // --- Leaderboard: remoto por proxy (opcional) + localStorage (fallback) ---
        const LEADERBOARD_REMOTE_URL = (typeof LEADERBOARD_CONFIG !== 'undefined' && LEADERBOARD_CONFIG.endpoint)
            ? LEADERBOARD_CONFIG.endpoint.trim()
            : '';
        const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/';
        const JSONBIN_BIN_ID = (LEADERBOARD_CONFIG && LEADERBOARD_CONFIG.jsonbin && LEADERBOARD_CONFIG.jsonbin.binId)
            ? LEADERBOARD_CONFIG.jsonbin.binId
            : '';
        const JSONBIN_API_KEY = (LEADERBOARD_CONFIG && LEADERBOARD_CONFIG.jsonbin && LEADERBOARD_CONFIG.jsonbin.apiKey)
            ? LEADERBOARD_CONFIG.jsonbin.apiKey
            : '';
        const JSONBIN_ENABLED = !!(JSONBIN_BIN_ID && JSONBIN_API_KEY);

        function getLocalLeaderboard() {
            try {
                const board = JSON.parse(localStorage.getItem('cyberspace_leaderboard')) || [];
                return normalizeBoard(board);
            } catch (e) {
                return [];
            }
        }

        function saveLocalLeaderboard(board) {
            localStorage.setItem('cyberspace_leaderboard', JSON.stringify(board));
        }

        function normalizeEntry(entry) {
            const safeThreats = Math.max(0, parseInt(entry && entry.threats, 10) || 0);
            const safeTime = Math.max(0, parseInt(entry && entry.time, 10) || 0);
            return {
                id: String((entry && entry.id) || ''),
                name: String((entry && entry.name) || '').slice(0, 32),
                threats: safeThreats,
                time: safeTime,
                score: safeThreats * 100000 + safeTime,
                date: String((entry && entry.date) || ''),
                godRank: !!(entry && entry.godRank)
            };
        }

        function normalizeBoard(board) {
            if (!Array.isArray(board)) return [];
            return board.map(normalizeEntry);
        }

        function sortAndTrimBoard(board) {
            board.sort((a, b) => (b.score || 0) - (a.score || 0));
            if (board.length > 100) board.length = 100;
            return board;
        }

        async function fetchRemoteLeaderboard() {
            if (LEADERBOARD_REMOTE_URL) {
                const res = await fetch(LEADERBOARD_REMOTE_URL, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('Leaderboard GET ' + res.status);
                const data = await res.json();
                const board = Array.isArray(data) ? data : data.leaderboard;
                return normalizeBoard(board || []);
            }

            if (JSONBIN_ENABLED) {
                const res = await fetch(JSONBIN_URL + JSONBIN_BIN_ID + '/latest', {
                    headers: { 'X-Master-Key': JSONBIN_API_KEY }
                });
                if (!res.ok) throw new Error('JSONBin GET ' + res.status);
                const data = await res.json();
                return normalizeBoard((data && data.record && data.record.leaderboard) || []);
            }

            throw new Error('No remote leaderboard configured');
        }

        async function saveRemoteLeaderboard(board) {
            if (LEADERBOARD_REMOTE_URL) {
                const res = await fetch(LEADERBOARD_REMOTE_URL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ leaderboard: board })
                });
                if (!res.ok) throw new Error('Leaderboard PUT ' + res.status);
                return;
            }

            if (JSONBIN_ENABLED) {
                const res = await fetch(JSONBIN_URL + JSONBIN_BIN_ID, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': JSONBIN_API_KEY
                    },
                    body: JSON.stringify({ leaderboard: board })
                });
                if (!res.ok) throw new Error('JSONBin PUT ' + res.status);
                return;
            }

            throw new Error('No remote leaderboard configured');
        }

        async function getLeaderboard() {
            if (leaderboardRemoteEnabled) {
                try {
                    const board = await fetchRemoteLeaderboard();
                    saveLocalLeaderboard(board);
                    return board;
                } catch (e) {
                    // Remote read fallback silencioso
                }
            }
            return getLocalLeaderboard();
        }

        async function addToLeaderboard(name, threats, time) {
            const entryId = Date.now().toString();
            const entry = {
                id: entryId,
                name: name,
                threats: threats,
                time: time,
                score: threats * 100000 + time,
                date: new Date().toLocaleDateString(),
                godRank: isGodRank(threats)
            };

            currentEntryId = entryId;

            if (leaderboardRemoteEnabled) {
                try {
                    const remoteBoard = await fetchRemoteLeaderboard();
                    remoteBoard.push(entry);
                    const sorted = sortAndTrimBoard(remoteBoard);
                    await saveRemoteLeaderboard(sorted);
                    saveLocalLeaderboard(sorted);
                    return sorted;
                } catch (e) {
                    // Remote write fallback silencioso
                }
            }

            // Fallback: solo localStorage
            const localBoard = getLocalLeaderboard();
            localBoard.push(entry);
            const sorted = sortAndTrimBoard(localBoard);
            saveLocalLeaderboard(sorted);
            return sorted;
        }

        async function clearRemoteLeaderboard() {
            if (!leaderboardRemoteEnabled) return;
            try {
                await saveRemoteLeaderboard([]);
            } catch (e) {
                // Remote clear fallback silencioso
            }
        }

        // --- Sistema de rangos sci-fi + ciberseguridad (basado en amenazas neutralizadas) ---
        // Primer umbral: 50, cada siguiente +20% del anterior
        const RANK_TABLE = [
            { name: 'Script Kiddie',              color: '#667788', img: './img/script-kiddie.png' },
            { name: 'Cadete Firewall',             color: '#5599aa', img: './img/cadete-firewall.png' },
            { name: 'Analista de Paquetes',        color: '#44aacc', img: './img/analista-de-paquetes.png' },
            { name: 'Operador SOC Estelar',        color: '#33bbdd', img: './img/operador-soc-estelar.png' },
            { name: 'Pentester Cuántico',          color: '#22cc88', img: './img/pentester-cuantico.png' },
            { name: 'Centinela Zero-Day',          color: '#44dd55', img: './img/centinela-zero-day.png' },
            { name: 'Agente del Rootkit',          color: '#aacc22', img: './img/agente-del-rootkit.png' },
            { name: 'Criptógrafo Interestelar',    color: '#ddbb11', img: './img/criptografo-interestelar.png' },
            { name: 'Comandante Exploit',          color: '#ff9922', img: './img/comandante-exploit.png' },
            { name: 'Red Team Galáctico',          color: '#ff6633', img: './img/red-team-galactico.png' },
            { name: 'Capitán del Kernel',          color: '#ff3355', img: './img/capitan-del-kernel.png' },
            { name: 'Almirante Ransomware Hunter', color: '#dd22aa', img: './img/almirante-ransomware-hunter.png' },
            { name: 'Guardián de la Blockchain',   color: '#bb33ff', img: './img/guardian-de-la-blockchain.png' },
            { name: 'Archon del Deep Web',         color: '#8855ff', img: './img/archon-del-deep-web.png' },
            { name: 'Leyenda del CyberVoid',       color: '#00ffcc', img: './img/leyenda-del-cybervoid.png' },
            { name: 'Dios del Ciberespacio',       color: '#ffdd00', img: './img/dios-del-ciberespacio.png' }
        ];

        function getRank(threats) {
            let threshold = 50;
            for (let i = 0; i < RANK_TABLE.length - 1; i++) {
                if (threats < threshold) return { ...RANK_TABLE[i], index: i };
                threshold = Math.ceil(threshold * 1.2);
            }
            return { ...RANK_TABLE[RANK_TABLE.length - 1], index: RANK_TABLE.length - 1 };
        }

        function isGodRank(threats) {
            return getRank(threats).index === RANK_TABLE.length - 1;
        }

        function buildLeaderboardHTML(board) {
            let rows = '';
            board.forEach((entry, i) => {
                const isCurrent = (entry.id === currentEntryId);
                const medal = i === 0 ? ' ★' : '';
                const rank = getRank(entry.threats || 0);
                const isGod = entry.godRank || isGodRank(entry.threats || 0);
                const godClass = isGod ? ' god-rank' : '';
                const godIcon = isGod ? ' &#9889;' : '';
                rows += `<tr class="${isCurrent ? 'current-player' : ''}${godClass}">
                    <td>${i + 1}${medal}</td>
                    <td>${escapeHTML(entry.name || '')}${godIcon}</td>
                    <td>${parseInt(entry.threats, 10) || 0}</td>
                    <td>${parseInt(entry.time, 10) || 0}s</td>
                    <td style="color:${rank.color};text-shadow:0 0 6px ${rank.color}40;">${rank.name}</td>
                    <td>${escapeHTML(entry.date || '')}</td>
                </tr>`;
            });
            const modeLabel = leaderboardRemoteEnabled ? '🌐 Global' : '💻 Local';
            return `
                <div id="leaderboard-container">
                    <h2>Leaderboard - Top 100 <span style="font-size:0.6em;color:#5577aa;">${modeLabel}</span></h2>
                    <table id="leaderboard-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Defensor</th>
                                <th>Amenazas</th>
                                <th>Tiempo</th>
                                <th>Rango</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            `;
        }

        // --- Volver al menú principal (reemplaza window.close/about:blank) ---
        function returnToMainMenu() {
            // Salir de fullscreen si está activo
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(function() {});
            }
            // Recargar la página para volver al estado inicial limpio
            window.location.reload();
        }

        // --- Modal in-game para clave admin (reemplaza prompt/alert) ---
        function showAdminModal(onSuccess) {
            // Evitar múltiples modales
            if (document.getElementById('admin-modal')) return;

            const overlay = document.createElement('div');
            overlay.id = 'admin-modal';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center;';

            const box = document.createElement('div');
            box.style.cssText = 'background:#0a1628;border:1px solid rgba(0,200,255,0.3);border-radius:12px;padding:20px 24px;max-width:320px;width:90%;text-align:center;';

            const title = document.createElement('p');
            title.textContent = 'Clave de administrador';
            title.style.cssText = 'color:#00ccff;font-size:14px;margin:0 0 12px;font-weight:bold;letter-spacing:1px;';

            const input = document.createElement('input');
            input.type = 'password';
            input.autocomplete = 'off';
            input.style.cssText = 'width:100%;box-sizing:border-box;padding:8px 12px;background:#020814;border:1px solid rgba(0,200,255,0.2);border-radius:6px;color:#fff;font-size:16px;text-align:center;outline:none;';

            const error = document.createElement('p');
            error.style.cssText = 'color:#ff4466;font-size:12px;margin:8px 0 0;min-height:18px;';

            const btnRow = document.createElement('div');
            btnRow.style.cssText = 'display:flex;gap:8px;margin-top:12px;justify-content:center;';

            const btnCancel = document.createElement('button');
            btnCancel.textContent = 'Cancelar';
            btnCancel.style.cssText = 'padding:6px 16px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#aaa;border-radius:6px;cursor:pointer;font-size:13px;';

            const btnOk = document.createElement('button');
            btnOk.textContent = 'Confirmar';
            btnOk.style.cssText = 'padding:6px 16px;border:none;background:#00ccff;color:#000;border-radius:6px;cursor:pointer;font-weight:bold;font-size:13px;';

            function closeModal() { overlay.remove(); }

            btnCancel.addEventListener('click', closeModal);
            btnOk.addEventListener('click', async function() {
                const hash = await sha256(input.value);
                if (hash === ADMIN_HASH) {
                    closeModal();
                    onSuccess();
                } else {
                    error.textContent = 'Clave incorrecta';
                    input.value = '';
                    input.focus();
                }
            });
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') btnOk.click();
                if (e.key === 'Escape') closeModal();
            });

            box.appendChild(title);
            box.appendChild(input);
            box.appendChild(error);
            btnRow.appendChild(btnCancel);
            btnRow.appendChild(btnOk);
            box.appendChild(btnRow);
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            input.focus();
        }

        // --- Pantalla de inicio: ingreso de alias ---
        const pregameScreen = document.getElementById('pregame-screen');
        const launchGameButton = document.getElementById('launch-game-button');

        function initPlayerScreen() {
            // Recuperar último alias usado
            const lastAlias = localStorage.getItem('cyberspace_last_alias') || '';
            if (lastAlias) {
                playerNameInput.value = lastAlias;
            }
            playerNameInput.focus();

            function goToTutorial(e) {
                e.stopPropagation();
                e.preventDefault();

                // Sanitizar: solo alfanuméricos, espacios, guiones y guiones bajos
                const name = playerNameInput.value.trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ _\-]/g, '').substring(0, 16);
                if (!name) {
                    playerNameInput.style.borderColor = '#ff3b3f';
                    playerNameInput.setAttribute('placeholder', '¡Debes ingresar un alias!');
                    playerNameInput.focus();
                    return;
                }
                playerName = name;
                localStorage.setItem('cyberspace_last_alias', playerName);

                // Ocultar pantalla de alias, mostrar tutorial
                playerScreen.style.display = 'none';
                const tutorialScreen = document.getElementById('tutorial-screen');
                tutorialScreen.style.display = 'flex';

                // --- Inicializar carrusel del tutorial ---
                const TOTAL_SLIDES = 10;
                let currentSlide = 0;
                const track = document.getElementById('tutorial-track');
                const dotsContainer = document.getElementById('tutorial-dots');
                const prevBtn = document.getElementById('tutorial-prev');
                const nextBtn = document.getElementById('tutorial-next');
                const skipBtn = document.getElementById('tutorial-skip');

                // Clonar botones para limpiar listeners anteriores (previene acumulación)
                var newPrev = prevBtn.cloneNode(true);
                prevBtn.parentNode.replaceChild(newPrev, prevBtn);
                var newNext = nextBtn.cloneNode(true);
                nextBtn.parentNode.replaceChild(newNext, nextBtn);
                var newSkip = skipBtn.cloneNode(true);
                skipBtn.parentNode.replaceChild(newSkip, skipBtn);

                // Crear dots (limpia anteriores)
                dotsContainer.innerHTML = '';
                for (let i = 0; i < TOTAL_SLIDES; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('tutorial-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                    dot.addEventListener('click', function() { goToSlide(i); });
                    dotsContainer.appendChild(dot);
                }

                // Reset al primer slide
                track.style.transform = 'translateX(0%)';
                newPrev.disabled = true;
                newNext.innerHTML = 'Siguiente &#9654;';
                newNext.classList.remove('tutorial-finish');

                function goToSlide(index) {
                    currentSlide = index;
                    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

                    var dots = dotsContainer.querySelectorAll('.tutorial-dot');
                    dots.forEach(function(d, idx) {
                        d.classList.toggle('active', idx === currentSlide);
                    });

                    newPrev.disabled = (currentSlide === 0);

                    if (currentSlide === TOTAL_SLIDES - 1) {
                        newNext.innerHTML = 'Iniciar &#9654;';
                        newNext.classList.add('tutorial-finish');
                    } else {
                        newNext.innerHTML = 'Siguiente &#9654;';
                        newNext.classList.remove('tutorial-finish');
                    }
                }

                newPrev.addEventListener('click', function() {
                    if (currentSlide > 0) goToSlide(currentSlide - 1);
                });

                newNext.addEventListener('click', function() {
                    if (currentSlide < TOTAL_SLIDES - 1) {
                        goToSlide(currentSlide + 1);
                    } else {
                        exitTutorial();
                    }
                });

                newSkip.addEventListener('click', function() {
                    exitTutorial();
                });

                // Soporte swipe táctil
                let touchStartX = 0;
                function onTouchStart(ev) {
                    if (ev.target.closest('button')) return;
                    touchStartX = ev.changedTouches[0].clientX;
                }
                function onTouchEnd(ev) {
                    if (ev.target.closest('button')) return;
                    var diff = touchStartX - ev.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0 && currentSlide < TOTAL_SLIDES - 1) {
                            goToSlide(currentSlide + 1);
                        } else if (diff < 0 && currentSlide > 0) {
                            goToSlide(currentSlide - 1);
                        }
                    }
                }
                tutorialScreen.addEventListener('touchstart', onTouchStart, { passive: true });
                tutorialScreen.addEventListener('touchend', onTouchEnd, { passive: true });

                // Soporte teclado (flechas + Escape)
                function tutorialKeyHandler(ev) {
                    if (ev.key === 'ArrowRight' && currentSlide < TOTAL_SLIDES - 1) {
                        goToSlide(currentSlide + 1);
                    } else if (ev.key === 'ArrowLeft' && currentSlide > 0) {
                        goToSlide(currentSlide - 1);
                    } else if (ev.key === 'Escape') {
                        exitTutorial();
                    }
                }
                document.addEventListener('keydown', tutorialKeyHandler);

                function exitTutorial() {
                    // Limpiar TODOS los listeners del tutorial
                    document.removeEventListener('keydown', tutorialKeyHandler);
                    tutorialScreen.removeEventListener('touchstart', onTouchStart);
                    tutorialScreen.removeEventListener('touchend', onTouchEnd);
                    tutorialScreen.style.display = 'none';
                    goToLeaderboard();
                }
            }

            function goToLeaderboard() {
                pregameScreen.style.display = 'flex';

                const welcomeEl = document.getElementById('pregame-welcome');
                welcomeEl.innerHTML = `Bienvenido, <strong>${escapeHTML(playerName)}</strong>`;

                const lbContainer = document.getElementById('pregame-leaderboard');
                getLeaderboard().then(board => {
                    if (board.length === 0) {
                        lbContainer.innerHTML = '<p style="color:#5577aa;">Aún no hay registros. ¡Sé el primero!</p>';
                    } else {
                        lbContainer.innerHTML = buildLeaderboardHTML(board);
                    }
                }).catch(() => {
                    lbContainer.innerHTML = '<p style="color:#ff6666;">Error cargando leaderboard</p>';
                });
            }

            function launchGame() {
                pregameScreen.style.display = 'none';
                gameContainer.style.display = 'block';
                if (playerDisplay) playerDisplay.textContent = `Defensor: ${playerName}`;
                const storageNameEl = document.getElementById('storage-player-name');
                if (storageNameEl) storageNameEl.textContent = playerName;
                gameStartTime = Date.now();
                gameStarted = true;

                // Activar aviso de rotación solo ahora que el juego inicia
                const rotateNotice = document.getElementById('rotate-notice');
                if (rotateNotice) rotateNotice.classList.add('rotate-active');

                // Pantalla completa + forzar landscape al iniciar el juego
                const el = document.documentElement;
                const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
                if (rfs) {
                    const fsPromise = rfs.call(el);
                    if (fsPromise && fsPromise.then) {
                        fsPromise.then(() => {
                            if (screen.orientation && screen.orientation.lock) {
                                screen.orientation.lock('landscape').catch(() => {});
                            }
                        }).catch(() => {});
                    }
                }

                // Manejar cambio de fullscreen: si el jugador sale de fullscreen
                // accidentalmente (ESC, barra del navegador), re-solicitar
                document.addEventListener('fullscreenchange', function() {
                    if (!document.fullscreenElement && gameStarted && !gameOver) {
                        // Re-solicitar fullscreen automáticamente al hacer click
                        const reEnter = function() {
                            if (rfs && !document.fullscreenElement && gameStarted) {
                                rfs.call(el).catch(() => {});
                            }
                            document.removeEventListener('click', reEnter);
                        };
                        document.addEventListener('click', reEnter);
                    }
                });

                initGame();
            }

            startGameButton.addEventListener('click', goToTutorial);
            playerNameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                    goToTutorial(e);
                }
            });
            launchGameButton.addEventListener('click', launchGame);

            // --- Toggle de música en pantalla pre-juego ---
            const pregameMusicBtn = document.getElementById('pregame-music-btn');
            const pregameMusicText = document.getElementById('pregame-music-text');
            const pregameMusicIcon = document.getElementById('pregame-music-icon');
            if (pregameMusicBtn) {
                pregameMusicBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    musicPlaying = !musicPlaying;
                    if (musicPlaying) {
                        pregameMusicText.textContent = 'Música: ON';
                        pregameMusicBtn.classList.remove('music-off');
                    } else {
                        pregameMusicText.textContent = 'Música: OFF';
                        pregameMusicBtn.classList.add('music-off');
                    }
                });
            }
        }

        // --- Inicialización del juego (se ejecuta tras ingresar alias) ---

        // Arrays para rastrear entidades activas (game loop centralizado)
        let activeMissiles = [];
        let activeHazards = [];  // asteroides + cyberattacks
        let activePacks = [];
        let gameLoopId = null;
        let lastFrameTime = 0;
        let distanceInterval = null;

        // --- Smooth touch movement ---
        let touchTargetBottom = -1;
        let shipCurrentBottom = -1;
        let isTouchControlled = false;
        let lastMobileFireTime = 0;
        // iOS reporta deltas más agresivos (ProMotion 120Hz + mayor frecuencia de eventos)
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const touchSensitivity = isIOSDevice ? 0.65 : 1.0;

        // --- Desktop mouse (zero-delay via game loop) ---
        let cachedContainerHeight = 0;
        let cachedSpaceshipHeight = 0;
        let mouseTargetBottom = -1;
        let isMouseControlled = false;

        // --- Background scroll fluido (controlado desde game loop) ---
        let bgScrollX = 0;          // posición actual (0 a -50, en %)
        let bgCurrentSpeed = 20;    // velocidad actual (segundos para recorrer el ciclo)
        let bgTargetSpeed = 20;     // velocidad objetivo (se interpola hacia esta)
        // Factor de escala: compensa que el elemento ahora mide 600vh en vez de 200vw.
        // Mantiene la misma velocidad visual (px/s) que con width:200%.
        let bgSpeedScale = 1;
        function updateBgSpeedScale() {
            // oldElementWidth = 2 * vw, newElementWidth = 6 * vh
            // scale = oldWidth / newWidth = (2 * vw) / (6 * vh)
            bgSpeedScale = (2 * window.innerWidth) / (6 * window.innerHeight);
        }

        function initGame() {
            // Añadir música al juego (respetar preferencia del pregame)
            const audio = new Audio('./mp3/sound.mp3');
            audio.loop = true;
            audio.volume = 0.08;
            if (musicPlaying) {
                audio.play().catch(() => {});
            }

            // Detección de dispositivo táctil (necesario antes de configurar botones)
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

            // Función para alternar música
            const toggleMusicButton = document.getElementById('toggle-music-button');
            function toggleMusic() {
                if (musicPlaying) {
                    audio.pause();
                    toggleMusicButton.textContent = isTouchDevice ? 'Encender Música' : 'Encender Música (M)';
                } else {
                    audio.play().catch(() => {});
                    toggleMusicButton.textContent = isTouchDevice ? 'Apagar Música' : 'Apagar Música (M)';
                }
                musicPlaying = !musicPlaying;
            }

            // Texto inicial según preferencia del pregame y tipo de dispositivo
            if (musicPlaying) {
                toggleMusicButton.textContent = isTouchDevice ? 'Apagar Música' : 'Apagar Música (M)';
            } else {
                toggleMusicButton.textContent = isTouchDevice ? 'Encender Música' : 'Encender Música (M)';
            }

            // Botón para apagar/encender la música (desktop click)
            toggleMusicButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMusic();
            });

            // Handlers táctiles dedicados para el botón de música (evita interferir con controles de nave)
            toggleMusicButton.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMusic();
                toggleMusicButton.blur();
            }, { passive: false });

            toggleMusicButton.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });

            toggleMusicButton.addEventListener('touchcancel', function(e) {
                e.stopPropagation();
            });

            // Teclas rápidas: música + inventario de power-ups
            document.addEventListener('keydown', (e) => {
                if (e.key === 'm' || e.key === 'M') {
                    toggleMusic();
                }
                if (e.key === 's' || e.key === 'S') {
                    useSuperCapsule();
                }
                if (e.key === 'd' || e.key === 'D') {
                    useDualShootFromStorage();
                }
                if (e.key === 'l' || e.key === 'L') {
                    useLaserPointFromStorage();
                }
                if (e.key === 't' || e.key === 'T') {
                    useTripleShootFromStorage();
                }
            });

            // Click derecho para activar super capsule (PC/Mac)
            function useSuperCapsule() {
                if (storedSuperCapsules > 0 && !godModeActive && !gameOver && gameStarted) {
                    storedSuperCapsules--;
                    updateInventoryUI();
                    activateGodMode();
                }
            }

            // Bloquear menú contextual SIEMPRE dentro del juego
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (gameStarted && !gameOver) {
                    useSuperCapsule();
                }
            });

            const distanceCounter = document.getElementById('distance-counter');
            distanceCounter.textContent = `Ciberpasos: ${lightYears}`;

            const asteroidCounter = document.getElementById('asteroid-counter');
            asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;

            const cyberattackCounter = document.getElementById('cyberattack-counter');
            cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;

            // Inicializar display de misiles
            updateMissileDisplay();

            // Cache de dimensiones del contenedor para evitar layout thrashing
            let cachedScreenWidth = window.innerWidth;
            function updateCachedDimensions() {
                cachedContainerHeight = gameContainer.clientHeight;
                cachedSpaceshipHeight = spaceship.clientHeight;
                cachedScreenWidth = window.innerWidth;
                updateBgSpeedScale();
            }
            window.addEventListener('resize', updateCachedDimensions, { passive: true });
            // Manejar cambios de orientación en móviles (iOS puede tardar en reportar resize)
            window.addEventListener('orientationchange', function() {
                setTimeout(updateCachedDimensions, 150);
            });
            updateCachedDimensions();

            // Incrementar la distancia recorrida cada segundo + chequeo de misiles + actualizar dificultad
            const difficultyDisplay = document.getElementById('difficulty-display');
            const backgroundEl = document.getElementById('background');

            function updateDifficultyHUD(elapsed) {
                const diff = getDifficulty(elapsed);
                const level = diff.level;
                if (level > maxDifficultyLevel) maxDifficultyLevel = level;

                if (difficultyDisplay) {
                    difficultyDisplay.textContent = `Nivel ${diff.level + 1}: ${diff.levelName}`;
                    difficultyDisplay.style.color = diff.levelColor;
                    difficultyDisplay.style.textShadow = `0 0 8px ${diff.levelColor}, 0 0 16px ${diff.levelColor}40`;
                }

                // Actualizar velocidad objetivo del fondo (se interpola en el game loop)
                bgTargetSpeed = diff.backgroundSpeed;
            }

            function startDistanceCounter() {
                distanceInterval = setInterval(() => {
                    if (!gameOver) {
                        lightYears += 1;
                        distanceCounter.textContent = `Ciberpasos: ${lightYears}`;

                        // Actualizar indicador de dificultad
                        updateDifficultyHUD(lightYears);

                        // Seguridad: si los misiles llegan a 0, forzar game over
                        if (missileCount <= 0) {
                            gameOver = true;
                            showGameOverMessage('¡Has agotado tus misiles!');
                        }
                    }
                }, 1000);
            }

            startDistanceCounter();

            // Movimiento de la nave con el mouse para desktop
            // Solo captura posición objetivo; se aplica en el game loop (zero-delay, sin layout thrashing)
            // Margen superior para evitar activar la barra de salida de pantalla completa del navegador
            const MOUSE_TOP_MARGIN = 30; // px de margen seguro en la parte superior
            document.addEventListener('mousemove', function(event) {
                if (!gameOver && gameStarted) {
                    isMouseControlled = true;
                    const maxBottom = cachedContainerHeight - cachedSpaceshipHeight - MOUSE_TOP_MARGIN;
                    const newBottom = cachedContainerHeight - event.clientY - (cachedSpaceshipHeight / 2);
                    mouseTargetBottom = Math.max(0, Math.min(maxBottom, newBottom));
                }
            });

            // --- Controles táctiles para móviles (movimiento relativo, disparo via botón) ---
            let touching = false;

            if (isTouchDevice) {
                // Posicionar nave en el primer cuarto de pantalla para mayor maniobrabilidad
                spaceship.style.left = '25%';

                let moveTouchId = null; // ID del dedo que controla la nave
                let lastTouchY = 0;     // Última posición Y del dedo (para calcular delta)

                gameContainer.addEventListener('touchstart', function(event) {
                    if (gameOver || !gameStarted) return;
                    if (event.target.closest('button') || event.target.closest('#game-over-message') || event.target.closest('#mobile-fire-button')) return;
                    const newTouch = event.changedTouches[0];
                    if (newTouch.clientX > cachedScreenWidth * 0.5) return;
                    event.preventDefault();
                    touching = true;
                    moveTouchId = newTouch.identifier;
                    lastTouchY = newTouch.clientY;
                    // Activar control táctil sin mover la nave (solo registrar posición inicial)
                    if (!isTouchControlled) {
                        isTouchControlled = true;
                        shipCurrentBottom = parseFloat(spaceship.style.bottom) || (cachedContainerHeight / 2);
                        touchTargetBottom = shipCurrentBottom;
                    }
                }, { passive: false });

                gameContainer.addEventListener('touchmove', function(event) {
                    if (!touching || gameOver || !gameStarted) return;
                    event.preventDefault();
                    for (let i = 0; i < event.touches.length; i++) {
                        if (event.touches[i].identifier === moveTouchId) {
                            const currentY = event.touches[i].clientY;
                            const rawDelta = lastTouchY - currentY; // positivo = dedo sube = nave sube
                            lastTouchY = currentY;
                            // Aplicar sensibilidad (iOS recibe deltas más grandes/frecuentes)
                            const deltaY = rawDelta * touchSensitivity;
                            // Aplicar delta a la posición objetivo de la nave
                            touchTargetBottom = Math.max(0, Math.min(
                                cachedContainerHeight - cachedSpaceshipHeight,
                                touchTargetBottom + deltaY
                            ));
                            break;
                        }
                    }
                }, { passive: false });

                gameContainer.addEventListener('touchend', function(event) {
                    // Solo soltar control si se levantó el dedo que controla la nave
                    for (let i = 0; i < event.changedTouches.length; i++) {
                        if (event.changedTouches[i].identifier === moveTouchId) {
                            touching = false;
                            moveTouchId = null;
                            break;
                        }
                    }
                });

                gameContainer.addEventListener('touchcancel', function(event) {
                    for (let i = 0; i < event.changedTouches.length; i++) {
                        if (event.changedTouches[i].identifier === moveTouchId) {
                            touching = false;
                            moveTouchId = null;
                            break;
                        }
                    }
                });
            }

            // Verificación de colisiones (AABB)
            function isCollision(element1, element2) {
                const rect1 = element1.getBoundingClientRect();
                const rect2 = element2.getBoundingClientRect();

                return !(
                    rect1.top > rect2.bottom ||
                    rect1.bottom < rect2.top ||
                    rect1.right < rect2.left ||
                    rect1.left > rect2.right
                );
            }

            // ========== GAME LOOP CENTRALIZADO (requestAnimationFrame) ==========
            // Fases separadas: WRITE (mover) → READ (leer rects) → COLLIDE (math pura)
            // Esto evita layout thrashing (no intercalar writes/reads).

            function gameLoop(timestamp) {
                if (gameOver) {
                    activeMissiles.length = 0;
                    activeHazards.length = 0;
                    activePacks.length = 0;
                    activeSuperCapsules.length = 0;
                    activeLifePacks.length = 0;
                    activeDualShootPacks.length = 0;
                    activeLaserPointPacks.length = 0;
                    activeTripleShootPacks.length = 0;
                    return;
                }

                // Delta time normalizado a 60fps (dt=1 a 60fps, dt=2 a 30fps)
                const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.67, 3) : 1;
                lastFrameTime = timestamp;

                const screenWidth = cachedScreenWidth;

                // === MOBILE: Movimiento suave de la nave (interpolación lerp) ===
                if (isTouchControlled && touchTargetBottom >= 0) {
                    const smoothing = isIOSDevice ? 0.28 : 0.35; // iOS más suave para compensar deltas agresivos
                    const lerpFactor = 1 - Math.pow(1 - smoothing, dt);
                    shipCurrentBottom += (touchTargetBottom - shipCurrentBottom) * lerpFactor;
                    // Snap cuando está muy cerca para evitar micro-movimientos infinitos
                    if (Math.abs(touchTargetBottom - shipCurrentBottom) < 0.5) {
                        shipCurrentBottom = touchTargetBottom;
                    }
                    spaceship.style.bottom = shipCurrentBottom + 'px';
                }

                // === DESKTOP: Aplicar posición del mouse directamente (zero-delay) ===
                if (isMouseControlled && mouseTargetBottom >= 0) {
                    spaceship.style.bottom = mouseTargetBottom + 'px';
                }

                // === MOBILE: Disparo con botón dedicado (sin auto-fire al tocar) ===
                // El disparo móvil se maneja via #mobile-fire-button (ver evento abajo)

                // === GOD MODE HALO: seguir la nave desde el game loop ===
                if (godModeActive && godModeHaloEl) {
                    const shipRect = spaceship.getBoundingClientRect();
                    const containerRect = gameContainer.getBoundingClientRect();
                    godModeHaloEl.style.left = (shipRect.left - containerRect.left + shipRect.width / 2) + 'px';
                    godModeHaloEl.style.top = (shipRect.top - containerRect.top + shipRect.height / 2) + 'px';
                }

                // === FONDO: scroll fluido con velocidad interpolada ===
                // Interpolar suavemente hacia la velocidad objetivo (lerp ~10% por frame a 60fps)
                const bgLerp = 1 - Math.pow(0.90, dt);
                bgCurrentSpeed += (bgTargetSpeed - bgCurrentSpeed) * bgLerp;
                // Suavizar dt para el fondo: evita saltos por picos de frame
                const bgDt = dt > 1.8 ? 1 + (dt - 1) * 0.3 : dt;
                // Avanzar posición: -50% en bgCurrentSpeed segundos → por frame a 60fps
                // bgSpeedScale compensa width:1400vh vs antiguo width:200%
                bgScrollX -= (50 / (bgCurrentSpeed * 60)) * bgDt * bgSpeedScale;
                if (bgScrollX <= -50) bgScrollX += 50; // loop continuo
                if (backgroundEl) {
                    backgroundEl.style.transform = `translate3d(${bgScrollX}%, 0, 0)`;
                }

                // === FASE WRITE: mover misiles con transform (NO dispara layout) ===
                for (let i = activeMissiles.length - 1; i >= 0; i--) {
                    const m = activeMissiles[i];
                    const dir = m.direction || 1;
                    const spd = m.speed || 1;
                    m.tx += 6 * dt * dir * spd;
                    // Movimiento vertical para misiles angulados (triple-shoot)
                    if (m.dirY) {
                        m.ty = (m.ty || 0) + 6 * dt * spd * m.dirY;
                    }
                    // Fuera de pantalla por la derecha o por la izquierda
                    if (m.originX + m.tx > screenWidth || m.originX + m.tx < -60) {
                        m.element.remove();
                        activeMissiles.splice(i, 1);
                        continue;
                    }
                    if (m.ty) {
                        var rot = m.rotation ? ' rotate(' + m.rotation + ')' : '';
                        m.element.style.transform = 'translate(' + m.tx + 'px,' + m.ty + 'px)' + rot;
                    } else {
                        m.element.style.transform = 'translateX(' + m.tx + 'px)';
                    }
                }

                // === FASE READ: leer TODAS las posiciones en un solo batch ===
                // (una sola recalculación de layout para todo el frame)
                const spaceshipRect = spaceship.getBoundingClientRect();

                for (let i = 0; i < activeMissiles.length; i++) {
                    activeMissiles[i]._r = activeMissiles[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeHazards.length; i++) {
                    activeHazards[i]._r = activeHazards[i].destroyed ? null : activeHazards[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activePacks.length; i++) {
                    activePacks[i]._r = activePacks[i].destroyed ? null : activePacks[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeSuperCapsules.length; i++) {
                    activeSuperCapsules[i]._r = activeSuperCapsules[i].destroyed ? null : activeSuperCapsules[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeLifePacks.length; i++) {
                    activeLifePacks[i]._r = activeLifePacks[i].destroyed ? null : activeLifePacks[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeDualShootPacks.length; i++) {
                    activeDualShootPacks[i]._r = activeDualShootPacks[i].destroyed ? null : activeDualShootPacks[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeLaserPointPacks.length; i++) {
                    activeLaserPointPacks[i]._r = activeLaserPointPacks[i].destroyed ? null : activeLaserPointPacks[i].element.getBoundingClientRect();
                }
                for (let i = 0; i < activeTripleShootPacks.length; i++) {
                    activeTripleShootPacks[i]._r = activeTripleShootPacks[i].destroyed ? null : activeTripleShootPacks[i].element.getBoundingClientRect();
                }

                // === FASE COLLIDE: solo matemática, sin tocar el DOM ===

                // Misiles ↔ cyberattacks + packs (super cápsulas y life packs son inmunes)
                for (let i = activeMissiles.length - 1; i >= 0; i--) {
                    const mR = activeMissiles[i]._r;
                    let hit = false;

                    // Misil ↔ super cápsulas, life packs y dual-shoot: el misil las atraviesa sin efecto
                    let overlapsImmune = false;
                    for (let j = 0; j < activeSuperCapsules.length; j++) {
                        const sc = activeSuperCapsules[j];
                        if (sc.destroyed || !sc._r) continue;
                        if (!(mR.top > sc._r.bottom || mR.bottom < sc._r.top ||
                              mR.right < sc._r.left || mR.left > sc._r.right)) {
                            overlapsImmune = true;
                            break;
                        }
                    }
                    if (!overlapsImmune) {
                        for (let j = 0; j < activeLifePacks.length; j++) {
                            const lp = activeLifePacks[j];
                            if (lp.destroyed || !lp._r) continue;
                            if (!(mR.top > lp._r.bottom || mR.bottom < lp._r.top ||
                                  mR.right < lp._r.left || mR.left > lp._r.right)) {
                                overlapsImmune = true;
                                break;
                            }
                        }
                    }
                    if (!overlapsImmune) {
                        for (let j = 0; j < activeDualShootPacks.length; j++) {
                            const ds = activeDualShootPacks[j];
                            if (ds.destroyed || !ds._r) continue;
                            if (!(mR.top > ds._r.bottom || mR.bottom < ds._r.top ||
                                  mR.right < ds._r.left || mR.left > ds._r.right)) {
                                overlapsImmune = true;
                                break;
                            }
                        }
                    }
                    if (!overlapsImmune) {
                        for (let j = 0; j < activeLaserPointPacks.length; j++) {
                            const lp2 = activeLaserPointPacks[j];
                            if (lp2.destroyed || !lp2._r) continue;
                            if (!(mR.top > lp2._r.bottom || mR.bottom < lp2._r.top ||
                                  mR.right < lp2._r.left || mR.left > lp2._r.right)) {
                                overlapsImmune = true;
                                break;
                            }
                        }
                    }
                    if (!overlapsImmune) {
                        for (let j = 0; j < activeTripleShootPacks.length; j++) {
                            const ts = activeTripleShootPacks[j];
                            if (ts.destroyed || !ts._r) continue;
                            if (!(mR.top > ts._r.bottom || mR.bottom < ts._r.top ||
                                  mR.right < ts._r.left || mR.left > ts._r.right)) {
                                overlapsImmune = true;
                                break;
                            }
                        }
                    }

                    if (!overlapsImmune) {
                        for (let j = activeHazards.length - 1; j >= 0; j--) {
                            const h = activeHazards[j];
                            if (h.type !== 'cyber' || h.destroyed || !h._r) continue;
                            if (!(mR.top > h._r.bottom || mR.bottom < h._r.top ||
                                  mR.right < h._r.left || mR.left > h._r.right)) {
                                h.element.src = './img/exploit.png';
                                h.element.classList.add('destroyed');
                                h.destroyed = true;
                                setTimeout(() => {
                                    h.element.remove();
                                    const idx = activeHazards.indexOf(h);
                                    if (idx !== -1) activeHazards.splice(idx, 1);
                                }, 500);
                                cyberattackCount += 1;
                                cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;
                                // Victoria: alcanzó rango máximo
                                if (isGodRank(cyberattackCount) && !gameOver) {
                                    gameOver = true;
                                    showVictoryMessage();
                                }
                                hit = true;
                                break;
                            }
                        }
                    }

                    if (!hit && !overlapsImmune) {
                        for (let j = activePacks.length - 1; j >= 0; j--) {
                            const p = activePacks[j];
                            if (p.destroyed || !p._r) continue;
                            if (!(mR.top > p._r.bottom || mR.bottom < p._r.top ||
                                  mR.right < p._r.left || mR.left > p._r.right)) {
                                p.element.innerHTML = '<img src="./img/exploit.png" style="width:100%;height:auto;">';
                                p.element.classList.add('destroyed');
                                p.destroyed = true;
                                setTimeout(() => {
                                    p.element.remove();
                                    const idx = activePacks.indexOf(p);
                                    if (idx !== -1) activePacks.splice(idx, 1);
                                }, 500);
                                hit = true;
                                break;
                            }
                        }
                    }

                    if (hit) {
                        activeMissiles[i].element.remove();
                        activeMissiles.splice(i, 1);
                    }
                }

                // Nave ↔ hazards (god mode: destruye al contacto en vez de morir)
                for (let i = activeHazards.length - 1; i >= 0; i--) {
                    const h = activeHazards[i];
                    if (h.destroyed || !h._r) continue;
                    if (!(spaceshipRect.top > h._r.bottom || spaceshipRect.bottom < h._r.top ||
                          spaceshipRect.right < h._r.left || spaceshipRect.left > h._r.right)) {
                        if (godModeActive) {
                            // God mode: destruir el hazard al contacto
                            h.element.classList.add('destroyed');
                            h.destroyed = true;
                            if (h.type === 'cyber') {
                                h.element.src = './img/exploit.png';
                                cyberattackCount += 1;
                                cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;
                                if (isGodRank(cyberattackCount) && !gameOver) {
                                    gameOver = true;
                                    deactivateGodMode();
                                    showVictoryMessage();
                                    return;
                                }
                            }
                            setTimeout(() => {
                                h.element.remove();
                                const idx = activeHazards.indexOf(h);
                                if (idx !== -1) activeHazards.splice(idx, 1);
                            }, 300);
                        } else {
                            gameOver = true;
                            showGameOverMessage();
                            return;
                        }
                    }
                }

                // Nave ↔ packs (recolección)
                for (let i = activePacks.length - 1; i >= 0; i--) {
                    const p = activePacks[i];
                    if (p.destroyed || !p._r) continue;
                    if (!(spaceshipRect.top > p._r.bottom || spaceshipRect.bottom < p._r.top ||
                          spaceshipRect.right < p._r.left || spaceshipRect.left > p._r.right)) {
                        p.destroyed = true;
                        missileCount += p.amount;
                        packsCollected++;
                        updateMissileDisplay();
                        p.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            p.element.remove();
                            const idx = activePacks.indexOf(p);
                            if (idx !== -1) activePacks.splice(idx, 1);
                        }, 400);
                    }
                }

                // Nave ↔ super cápsulas (almacenar en inventario)
                for (let i = activeSuperCapsules.length - 1; i >= 0; i--) {
                    const sc = activeSuperCapsules[i];
                    if (sc.destroyed || !sc._r) continue;
                    if (!(spaceshipRect.top > sc._r.bottom || spaceshipRect.bottom < sc._r.top ||
                          spaceshipRect.right < sc._r.left || spaceshipRect.left > sc._r.right)) {
                        sc.destroyed = true;
                        sc.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            sc.element.remove();
                            const idx = activeSuperCapsules.indexOf(sc);
                            if (idx !== -1) activeSuperCapsules.splice(idx, 1);
                        }, 400);
                        storedSuperCapsules++;
                        updateInventoryUI();
                    }
                }

                // Nave ↔ life packs (almacenar en inventario)
                for (let i = activeLifePacks.length - 1; i >= 0; i--) {
                    const lp = activeLifePacks[i];
                    if (lp.destroyed || !lp._r) continue;
                    if (!(spaceshipRect.top > lp._r.bottom || spaceshipRect.bottom < lp._r.top ||
                          spaceshipRect.right < lp._r.left || spaceshipRect.left > lp._r.right)) {
                        lp.destroyed = true;
                        lp.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            lp.element.remove();
                            const idx = activeLifePacks.indexOf(lp);
                            if (idx !== -1) activeLifePacks.splice(idx, 1);
                        }, 400);
                        storedLives++;
                        updateInventoryUI();
                    }
                }

                // Nave ↔ dual-shoot packs
                for (let i = activeDualShootPacks.length - 1; i >= 0; i--) {
                    const ds = activeDualShootPacks[i];
                    if (ds.destroyed || !ds._r) continue;
                    if (!(spaceshipRect.top > ds._r.bottom || spaceshipRect.bottom < ds._r.top ||
                          spaceshipRect.right < ds._r.left || spaceshipRect.left > ds._r.right)) {
                        ds.destroyed = true;
                        ds.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            ds.element.remove();
                            const idx = activeDualShootPacks.indexOf(ds);
                            if (idx !== -1) activeDualShootPacks.splice(idx, 1);
                        }, 400);
                        if (!dualShootActive) {
                            activateDualShoot();
                        } else {
                            storedDualShoots++;
                            updateInventoryUI();
                        }
                    }
                }

                // Nave ↔ laser-point packs
                for (let i = activeLaserPointPacks.length - 1; i >= 0; i--) {
                    const lp = activeLaserPointPacks[i];
                    if (lp.destroyed || !lp._r) continue;
                    if (!(spaceshipRect.top > lp._r.bottom || spaceshipRect.bottom < lp._r.top ||
                          spaceshipRect.right < lp._r.left || spaceshipRect.left > lp._r.right)) {
                        lp.destroyed = true;
                        lp.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            lp.element.remove();
                            const idx = activeLaserPointPacks.indexOf(lp);
                            if (idx !== -1) activeLaserPointPacks.splice(idx, 1);
                        }, 400);
                        if (!laserPointActive) {
                            activateLaserPoint();
                        } else {
                            storedLaserPoints++;
                            updateInventoryUI();
                        }
                    }
                }

                // Nave ↔ triple-shoot packs
                for (let i = activeTripleShootPacks.length - 1; i >= 0; i--) {
                    const ts = activeTripleShootPacks[i];
                    if (ts.destroyed || !ts._r) continue;
                    if (!(spaceshipRect.top > ts._r.bottom || spaceshipRect.bottom < ts._r.top ||
                          spaceshipRect.right < ts._r.left || spaceshipRect.left > ts._r.right)) {
                        ts.destroyed = true;
                        ts.element.classList.add('ammo-collected');
                        setTimeout(() => {
                            ts.element.remove();
                            var idx = activeTripleShootPacks.indexOf(ts);
                            if (idx !== -1) activeTripleShootPacks.splice(idx, 1);
                        }, 400);
                        if (!tripleShootActive) {
                            activateTripleShoot();
                        } else {
                            storedTripleShoots++;
                            updateInventoryUI();
                        }
                    }
                }

                // Actualizar posición de la línea guía laser-point
                if (laserPointActive && laserPointGuideEl) {
                    const guideBottom = spaceshipRect.bottom - gameContainer.getBoundingClientRect().top;
                    const guideY = guideBottom - spaceshipRect.height / 2;
                    laserPointGuideEl.style.top = guideY + 'px';
                }

                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Iniciar el game loop
            lastFrameTime = 0;
            gameLoopId = requestAnimationFrame(gameLoop);

            // Pausar/reanudar game loop cuando la pestaña pierde/gana foco (ahorro de batería en móviles)
            document.addEventListener('visibilitychange', function() {
                if (gameOver) return;
                if (document.hidden) {
                    // Pausar: cancelar el loop para no consumir CPU/GPU en background
                    if (gameLoopId) {
                        cancelAnimationFrame(gameLoopId);
                        gameLoopId = null;
                    }
                } else {
                    // Reanudar: resetear timestamp para evitar salto de delta time
                    lastFrameTime = 0;
                    if (!gameLoopId) {
                        gameLoopId = requestAnimationFrame(gameLoop);
                    }
                    // Actualizar dimensiones por si el usuario rotó el dispositivo
                    updateCachedDimensions();
                }
            });

            // ========== FIN GAME LOOP ==========

            // Función para disparar misil desde la posición actual de la nave
            // Soporta stacking: dual + triple + laser se combinan
            function shootMissile() {
                if (gameOver || !gameStarted) return;
                // En god mode el disparo manual no gasta misiles (usa shootGodMissile)
                if (godModeActive) return;

                // Triple-shoot activo: dispara en abanico (consume misiles)
                if (tripleShootActive) {
                    shootTripleMissiles();
                    return;
                }

                // Calcular coste: 1 normal + 1 extra si dual-shoot activo
                const cost = dualShootActive ? 2 : 1;
                if (missileCount < cost) {
                    if (missileCount <= 0 && !gameOver) {
                        gameOver = true;
                        showGameOverMessage('¡Has agotado tus misiles!');
                    }
                    return;
                }

                missileCount -= cost;
                missilesUsed += cost;
                updateMissileDisplay();

                // Si se agotaron los misiles, fin del juego inmediato
                if (missileCount <= 0 && !gameOver) {
                    gameOver = true;
                    showGameOverMessage('¡Has agotado tus misiles!');
                    return;
                }

                const spaceshipRect = spaceship.getBoundingClientRect();
                const gameContainerRect = gameContainer.getBoundingClientRect();
                const missileBottomPos = gameContainerRect.bottom - (spaceshipRect.top + spaceshipRect.height / 2);
                const startX = spaceshipRect.left - gameContainerRect.left + spaceshipRect.width;

                // Misil hacia adelante
                const missile = document.createElement('img');
                missile.src = './img/missil.png';
                missile.classList.add('missile');
                if (dualShootActive) missile.classList.add('dual-missile');
                missile.style.position = 'absolute';
                missile.style.bottom = `${missileBottomPos}px`;
                missile.style.left = startX + 'px';
                gameContainer.appendChild(missile);

                // speed: 1 = normal, 2 = doble (dual-shoot)
                const fwdSpeed = dualShootActive ? 2 : 1;
                activeMissiles.push({ element: missile, tx: 0, ty: 0, originX: startX, speed: fwdSpeed, direction: 1, dirY: 0 });

                // Si dual-shoot activo: misil hacia atrás
                if (dualShootActive) {
                    const backMissile = document.createElement('img');
                    backMissile.src = './img/missil.png';
                    backMissile.classList.add('missile', 'dual-missile', 'missile-backward');
                    backMissile.style.position = 'absolute';
                    backMissile.style.bottom = `${missileBottomPos}px`;
                    const backStartX = spaceshipRect.left - gameContainerRect.left;
                    backMissile.style.left = backStartX + 'px';
                    gameContainer.appendChild(backMissile);
                    activeMissiles.push({ element: backMissile, tx: 0, ty: 0, originX: backStartX, speed: 2, direction: -1, dirY: 0 });
                }
            }

            // Disparo triple en abanico: 3 misiles a +30°, 0°, -30° a doble velocidad
            // Si dual-shoot también está activo, añade misil trasero (stacking)
            function shootTripleMissiles() {
                // Consumo de misiles: 3 (triple) + 1 extra si dual activo
                // Excepción: god mode = misiles infinitos
                if (!godModeActive) {
                    var cost = dualShootActive ? 4 : 3;
                    if (missileCount < cost) {
                        if (missileCount <= 0 && !gameOver) {
                            gameOver = true;
                            showGameOverMessage('¡Has agotado tus misiles!');
                        }
                        return;
                    }
                    missileCount -= cost;
                    missilesUsed += cost;
                    updateMissileDisplay();

                    if (missileCount <= 0 && !gameOver) {
                        gameOver = true;
                        showGameOverMessage('¡Has agotado tus misiles!');
                        return;
                    }
                }

                var spaceshipRect = spaceship.getBoundingClientRect();
                var gameContainerRect = gameContainer.getBoundingClientRect();
                var missileBottomPos = gameContainerRect.bottom - (spaceshipRect.top + spaceshipRect.height / 2);
                var startX = spaceshipRect.left - gameContainerRect.left + spaceshipRect.width;

                var angles = [
                    { dirY: -TRIPLE_SHOOT_ANGLE, rot: '-30deg' },  // arriba (+30° visual)
                    { dirY: 0, rot: '0deg' },                       // recto
                    { dirY: TRIPLE_SHOOT_ANGLE, rot: '30deg' }      // abajo (-30° visual)
                ];

                for (var a = 0; a < angles.length; a++) {
                    var m = document.createElement('img');
                    m.src = './img/missil.png';
                    m.classList.add('missile', 'triple-missile');
                    m.style.position = 'absolute';
                    m.style.bottom = missileBottomPos + 'px';
                    m.style.left = startX + 'px';
                    gameContainer.appendChild(m);
                    activeMissiles.push({
                        element: m, tx: 0, ty: 0, originX: startX,
                        speed: 2, direction: 1, dirY: angles[a].dirY,
                        rotation: angles[a].rot
                    });
                }

                // Stacking: si dual-shoot también activo, añadir misil trasero
                if (dualShootActive) {
                    var backMissile = document.createElement('img');
                    backMissile.src = './img/missil.png';
                    backMissile.classList.add('missile', 'dual-missile', 'missile-backward');
                    backMissile.style.position = 'absolute';
                    backMissile.style.bottom = missileBottomPos + 'px';
                    var backStartX = spaceshipRect.left - gameContainerRect.left;
                    backMissile.style.left = backStartX + 'px';
                    gameContainer.appendChild(backMissile);
                    activeMissiles.push({ element: backMissile, tx: 0, ty: 0, originX: backStartX, speed: 2, direction: -1, dirY: 0 });
                }
            }

            // Desktop: ráfagas de 5 misiles al mantener mouse, 1 al click
            if (!isTouchDevice) {
                const BURST_SIZE = 5;          // misiles por ráfaga
                const BURST_MISSILE_DELAY = 80; // ms entre misiles dentro de una ráfaga
                const BURST_PAUSE = 400;        // ms de pausa entre ráfagas
                let desktopFireActive = false;
                let desktopBurstTimeout = null;

                function fireBurst(callback) {
                    let fired = 0;
                    function fireNext() {
                        if (!desktopFireActive || gameOver || !gameStarted) return;
                        if (fired < BURST_SIZE) {
                            shootMissile();
                            fired++;
                            desktopBurstTimeout = setTimeout(fireNext, BURST_MISSILE_DELAY);
                        } else if (callback) {
                            // Pausa entre ráfagas, luego siguiente ráfaga
                            desktopBurstTimeout = setTimeout(callback, BURST_PAUSE);
                        }
                    }
                    fireNext();
                }

                function startDesktopFiring() {
                    if (gameOver || !gameStarted) return;
                    desktopFireActive = true;
                    // Disparo inmediato: primer misil al pulsar
                    shootMissile();
                    // Tras un breve delay, iniciar ráfagas continuas de 5
                    desktopBurstTimeout = setTimeout(function burstLoop() {
                        if (!desktopFireActive || gameOver || !gameStarted) return;
                        fireBurst(burstLoop);
                    }, BURST_PAUSE);
                }

                function stopDesktopFiring() {
                    desktopFireActive = false;
                    if (desktopBurstTimeout) {
                        clearTimeout(desktopBurstTimeout);
                        desktopBurstTimeout = null;
                    }
                }

                // Prevenir drag/select en todos los elementos del juego
                gameContainer.addEventListener('dragstart', function(e) {
                    if (!e.target.closest('#game-over-message') && !e.target.closest('#player-screen')) {
                        e.preventDefault();
                    }
                });
                gameContainer.addEventListener('selectstart', function(e) {
                    if (!e.target.closest('#game-over-message') && !e.target.closest('#player-screen')) {
                        e.preventDefault();
                    }
                });

                document.addEventListener('mousedown', function(e) {
                    if (e.button !== 0) return;
                    if (e.target.closest('button') || e.target.closest('#game-over-message') || e.target.closest('#player-screen') || e.target.closest('#pregame-screen')) return;
                    e.preventDefault(); // Prevenir selección/drag al hacer click en el juego
                    startDesktopFiring();
                });

                document.addEventListener('mouseup', function(e) {
                    if (e.button !== 0) return;
                    stopDesktopFiring();
                });

                // No detener disparo al salir brevemente del área (evita cortes
                // cuando el mouse toca la barra de fullscreen del navegador).
                // Solo parar al soltar el botón (mouseup).
                // Si el mouse sale completamente, el mouseup no se captura
                // y el disparo se detiene al volver a mover (mousedown no estará presionado).
            }

            // --- Botón de disparo dedicado para móviles ---
            const mobileControls = document.getElementById('mobile-controls');
            const mobileFireBtn = document.getElementById('mobile-fire-button');
            if (isTouchDevice && mobileFireBtn) {
                // Mostrar los controles en dispositivos táctiles
                if (mobileControls) mobileControls.style.display = 'flex';

                let fireHoldInterval = null;
                const FIRE_HOLD_RATE = 120; // ms entre misiles al mantener presionado
                let mobileFireActive = false;

                function startFiring() {
                    if (gameOver || !gameStarted) return;
                    mobileFireActive = true;
                    // Disparar UN misil inmediatamente (sin pasar por burst/cooldown)
                    shootMissile();
                    mobileFireBtn.classList.add('firing');
                    // Si mantiene presionado, disparar misiles individuales continuos
                    if (fireHoldInterval) clearInterval(fireHoldInterval);
                    fireHoldInterval = setInterval(() => {
                        if (gameOver || !gameStarted || !mobileFireActive) {
                            stopFiring();
                            return;
                        }
                        shootMissile();
                    }, FIRE_HOLD_RATE);
                }

                function stopFiring() {
                    mobileFireActive = false;
                    mobileFireBtn.classList.remove('firing');
                    if (fireHoldInterval) {
                        clearInterval(fireHoldInterval);
                        fireHoldInterval = null;
                    }
                }

                mobileFireBtn.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    startFiring();
                }, { passive: false });

                mobileFireBtn.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    stopFiring();
                }, { passive: false });

                mobileFireBtn.addEventListener('touchcancel', function() {
                    stopFiring();
                });
            }

            // Función para generar un asteroide aleatorio (velocidad dinámica por dificultad)
            function createAsteroid(src, isBottom) {
                const asteroid = document.createElement('img');
                asteroid.src = src;
                asteroid.classList.add('asteroid');

                if (src.includes('rock-13.png')) {
                    asteroid.style.bottom = '0px';
                } else {
                    const bottomPosition = isBottom ? 0 : Math.floor(Math.random() * 80) + 10;
                    asteroid.style.bottom = `${bottomPosition}%`;
                }
                asteroid.style.left = '100%';

                gameContainer.appendChild(asteroid);

                // Velocidad dinámica según dificultad actual
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const asteroidSpeed = Math.random() * diff.asteroidSpeedRange + diff.asteroidSpeedMin;
                asteroid.style.animation = `moveAsteroid ${asteroidSpeed}s linear forwards`;

                // Registrar en el array para el game loop
                const hazardEntry = { element: asteroid, type: 'asteroid', destroyed: false };
                activeHazards.push(hazardEntry);

                asteroid.addEventListener('animationend', () => {
                    asteroidCount += 1;
                    asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;
                    asteroid.remove();
                    const idx = activeHazards.indexOf(hazardEntry);
                    if (idx !== -1) activeHazards.splice(idx, 1);
                });
            }

            // Función para generar un "cyberattack" (velocidad dinámica por dificultad)
            function createCyberAttack(type) {
                const cyberAttack = document.createElement('img');
                cyberAttack.src = type;
                cyberAttack.classList.add('cyber-attack');

                const bottomPosition = Math.floor(Math.random() * 80) + 10;
                cyberAttack.style.bottom = `${bottomPosition}%`;
                cyberAttack.style.left = '100%';

                gameContainer.appendChild(cyberAttack);

                // Velocidad dinámica según dificultad actual
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const cyberSpeed = Math.random() * diff.cyberSpeedRange + diff.cyberSpeedMin;
                cyberAttack.style.animation = `moveCyberAttack ${cyberSpeed}s linear forwards`;

                // Registrar en el array para el game loop
                const hazardEntry = { element: cyberAttack, type: 'cyber', destroyed: false };
                activeHazards.push(hazardEntry);

                cyberAttack.addEventListener('animationend', () => {
                    // Penalización escalonada por nivel: nivel 1=-1, nivel 2=-2, ..., nivel 6=-6
                    if (!hazardEntry.destroyed && !gameOver) {
                        const elapsed = (Date.now() - gameStartTime) / 1000;
                        const currentLevel = getDifficultyLevel(elapsed);
                        const penalty = currentLevel + 1; // índice 0=nivel1 → -1, índice 5=nivel6 → -6
                        threatsEscaped += 1;
                        totalPenalty += penalty;
                        cyberattackCount = Math.max(0, cyberattackCount - penalty);
                        cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;
                    }
                    cyberAttack.remove();
                    const idx = activeHazards.indexOf(hazardEntry);
                    if (idx !== -1) activeHazards.splice(idx, 1);
                });
            }

            // --- Crear pack de munición con SVG de escudo (dificultad dinámica) ---
            function createAmmoPack() {
                if (gameOver) return;

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);

                // Probabilidades ajustadas: a mayor dificultad, los packs grandes son más raros
                const shift = diff.packProbabilityShift;
                const adjustedTypes = [
                    { ...AMMO_PACK_TYPES[0], probability: AMMO_PACK_TYPES[0].probability + shift },      // PATCH: más común
                    { ...AMMO_PACK_TYPES[1], probability: AMMO_PACK_TYPES[1].probability },                // FIREWALL: igual
                    { ...AMMO_PACK_TYPES[2], probability: AMMO_PACK_TYPES[2].probability - shift * 0.6 },  // ENCRYPT: más raro
                    { ...AMMO_PACK_TYPES[3], probability: AMMO_PACK_TYPES[3].probability - shift * 0.4 }   // ZERO-DAY: más raro
                ];
                // Normalizar probabilidades
                const totalProb = adjustedTypes.reduce((sum, t) => sum + Math.max(0.01, t.probability), 0);
                adjustedTypes.forEach(t => t.probability = Math.max(0.01, t.probability) / totalProb);

                // Seleccionar tipo basado en probabilidad ajustada
                const rand = Math.random();
                let cumulative = 0;
                let selected = adjustedTypes[0];
                for (const pack of adjustedTypes) {
                    cumulative += pack.probability;
                    if (rand <= cumulative) {
                        selected = pack;
                        break;
                    }
                }

                const packEl = document.createElement('div');
                packEl.classList.add('ammo-pack', `ammo-pack-${selected.amount}`);
                packEl.dataset.amount = selected.amount;

                // Imagen PNG del pack
                const packImg = document.createElement('img');
                packImg.src = selected.img;
                packImg.alt = `${selected.label} +${selected.amount}`;
                packImg.classList.add('ammo-img');
                packImg.draggable = false;
                packEl.appendChild(packImg);

                const bottomPosition = Math.floor(Math.random() * 70) + 15;
                packEl.style.bottom = `${bottomPosition}%`;
                packEl.style.left = '100%';

                gameContainer.appendChild(packEl);

                // Velocidad dinámica según dificultad
                const packSpeed = Math.random() * diff.packSpeedRange + diff.packSpeedMin;
                packEl.style.animation = `moveAmmoPack ${packSpeed}s linear forwards`;

                // Registrar en el array para el game loop
                const packEntry = { element: packEl, amount: selected.amount, destroyed: false };
                activePacks.push(packEntry);

                packEl.addEventListener('animationend', () => {
                    packEl.remove();
                    const idx = activePacks.indexOf(packEntry);
                    if (idx !== -1) activePacks.splice(idx, 1);
                });
            }

            // --- Spawning progresivo de packs (escasez controlada por dificultad) ---
            function startAmmoPacks() {
                function getSpawnDelay() {
                    const elapsed = (Date.now() - gameStartTime) / 1000;
                    const diff = getDifficulty(elapsed);
                    return Math.min(diff.packMaxDelay, diff.packBaseDelay + elapsed * diff.packMsPerSecond);
                }

                function scheduleNext() {
                    const delay = getSpawnDelay();
                    ammoPackTimeout = setTimeout(() => {
                        if (!gameOver) {
                            createAmmoPack();
                            scheduleNext();
                        }
                    }, delay);
                }

                scheduleNext();
            }

            // --- Super Capsule: God Mode power-up ---
            function createSuperCapsule() {
                if (gameOver || godModeActive) return;

                const capsuleEl = document.createElement('div');
                capsuleEl.classList.add('super-capsule');

                const capsuleImg = document.createElement('img');
                capsuleImg.src = './img/super-capsule.png';
                capsuleImg.alt = 'Super Capsule';
                capsuleImg.classList.add('capsule-img');
                capsuleImg.draggable = false;
                capsuleEl.appendChild(capsuleImg);

                const bottomPosition = Math.floor(Math.random() * 60) + 20;
                capsuleEl.style.bottom = `${bottomPosition}%`;
                capsuleEl.style.left = '100%';

                gameContainer.appendChild(capsuleEl);

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const capsuleSpeed = Math.random() * 3 + diff.packSpeedMin + 2;
                capsuleEl.style.animation = `moveAmmoPack ${capsuleSpeed}s linear forwards`;

                const capsuleEntry = { element: capsuleEl, destroyed: false };
                activeSuperCapsules.push(capsuleEntry);

                capsuleEl.addEventListener('animationend', () => {
                    capsuleEl.remove();
                    const idx = activeSuperCapsules.indexOf(capsuleEntry);
                    if (idx !== -1) activeSuperCapsules.splice(idx, 1);
                });
            }

            // Spawning de super capsule: probabilidad y frecuencia según nivel de dificultad
            // A mayor dificultad → mayor probabilidad y menor delay (aparecen más seguido)
            function getSuperCapsuleParams() {
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const level = getDifficultyLevel(elapsed);
                // Nivel 0 SEGURO:      no aparece
                // Nivel 1 ALERTA:      prob 0.13, cada 35s
                // Nivel 2 PELIGRO:     prob 0.19, cada 28s
                // Nivel 3 CRÍTICO:     prob 0.27, cada 22s
                // Nivel 4 EXTREMO:     prob 0.35, cada 18s
                // Nivel 5 APOCALIPSIS: prob 0.45, cada 14s
                const table = [
                    null,
                    { probability: 0.13, delay: 35000 },
                    { probability: 0.19, delay: 28000 },
                    { probability: 0.27, delay: 22000 },
                    { probability: 0.35, delay: 18000 },
                    { probability: 0.45, delay: 14000 }
                ];
                return table[level] || null;
            }

            // Spawning de life packs: similar a super capsule pero con sus propias probabilidades
            // Vidas son más valiosas → probabilidad ligeramente menor, pero mejora con dificultad
            function getLifePackParams() {
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const level = getDifficultyLevel(elapsed);
                // Nivel 0 SEGURO:      no aparece (empiezas con vidas iniciales)
                // Nivel 1 ALERTA:      prob 0.11, cada 40s
                // Nivel 2 PELIGRO:     prob 0.15, cada 32s
                // Nivel 3 CRÍTICO:     prob 0.23, cada 25s
                // Nivel 4 EXTREMO:     prob 0.30, cada 20s
                // Nivel 5 APOCALIPSIS: prob 0.40, cada 15s
                const table = [
                    null,
                    { probability: 0.11, delay: 40000 },
                    { probability: 0.15, delay: 32000 },
                    { probability: 0.23, delay: 25000 },
                    { probability: 0.30, delay: 20000 },
                    { probability: 0.40, delay: 15000 }
                ];
                return table[level] || null;
            }

            function startSuperCapsuleSpawner() {
                function scheduleCheck() {
                    const params = getSuperCapsuleParams();
                    const checkDelay = params ? params.delay : 25000;
                    superCapsuleSpawnTimeout = setTimeout(() => {
                        if (gameOver) return;
                        const currentParams = getSuperCapsuleParams();
                        if (currentParams && !godModeActive) {
                            if (Math.random() < currentParams.probability) {
                                createSuperCapsule();
                            }
                        }
                        scheduleCheck();
                    }, checkDelay);
                }
                scheduleCheck();
            }

            // --- Life Pack: vida extra coleccionable ---
            function createLifePack() {
                if (gameOver) return;

                const lifeEl = document.createElement('div');
                lifeEl.classList.add('life-pack');

                const lifeImg = document.createElement('img');
                lifeImg.src = './img/pack-life+1.png';
                lifeImg.alt = 'Life +1';
                lifeImg.classList.add('capsule-img');
                lifeImg.draggable = false;
                lifeEl.appendChild(lifeImg);

                const bottomPosition = Math.floor(Math.random() * 60) + 20;
                lifeEl.style.bottom = `${bottomPosition}%`;
                lifeEl.style.left = '100%';

                gameContainer.appendChild(lifeEl);

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const lifeSpeed = Math.random() * 3 + diff.packSpeedMin + 2;
                lifeEl.style.animation = `moveAmmoPack ${lifeSpeed}s linear forwards`;

                const lifeEntry = { element: lifeEl, destroyed: false };
                activeLifePacks.push(lifeEntry);

                lifeEl.addEventListener('animationend', () => {
                    lifeEl.remove();
                    const idx = activeLifePacks.indexOf(lifeEntry);
                    if (idx !== -1) activeLifePacks.splice(idx, 1);
                });
            }

            // Spawner de life packs: probabilidad propia que mejora con la dificultad
            function startLifePackSpawner() {
                function scheduleCheck() {
                    const params = getLifePackParams();
                    const checkDelay = params ? params.delay : 30000;
                    lifePackSpawnTimeout = setTimeout(() => {
                        if (gameOver) return;
                        const currentParams = getLifePackParams();
                        if (currentParams) {
                            if (Math.random() < currentParams.probability) {
                                createLifePack();
                            }
                        }
                        scheduleCheck();
                    }, checkDelay);
                }
                scheduleCheck();
            }

            // --- Dual Shoot: power-up coleccionable ---
            function createDualShootPack() {
                if (gameOver) return;

                const dsEl = document.createElement('div');
                dsEl.classList.add('dual-shoot-pack');

                const dsImg = document.createElement('img');
                dsImg.src = './img/dual-shoot.png';
                dsImg.alt = 'Dual Shoot';
                dsImg.classList.add('capsule-img');
                dsImg.draggable = false;
                dsEl.appendChild(dsImg);

                const bottomPosition = Math.floor(Math.random() * 60) + 20;
                dsEl.style.bottom = `${bottomPosition}%`;
                dsEl.style.left = '100%';

                gameContainer.appendChild(dsEl);

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const dsSpeed = Math.random() * 3 + diff.packSpeedMin + 2;
                dsEl.style.animation = `moveAmmoPack ${dsSpeed}s linear forwards`;

                const dsEntry = { element: dsEl, destroyed: false };
                activeDualShootPacks.push(dsEntry);

                dsEl.addEventListener('animationend', () => {
                    dsEl.remove();
                    const idx = activeDualShootPacks.indexOf(dsEntry);
                    if (idx !== -1) activeDualShootPacks.splice(idx, 1);
                });
            }

            // Probabilidad de spawn del dual-shoot según dificultad
            function getDualShootParams() {
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const level = getDifficultyLevel(elapsed);
                // Nivel 0 SEGURO:      no aparece
                // Nivel 1 ALERTA:      no aparece
                // Nivel 2 PELIGRO:     prob 0.13, cada 35s
                // Nivel 3 CRÍTICO:     prob 0.19, cada 28s
                // Nivel 4 EXTREMO:     prob 0.25, cada 22s
                // Nivel 5 APOCALIPSIS: prob 0.33, cada 16s
                const table = [
                    null,
                    null,
                    { probability: 0.13, delay: 35000 },
                    { probability: 0.19, delay: 28000 },
                    { probability: 0.25, delay: 22000 },
                    { probability: 0.33, delay: 16000 }
                ];
                return table[level] || null;
            }

            function startDualShootSpawner() {
                function scheduleCheck() {
                    const params = getDualShootParams();
                    const checkDelay = params ? params.delay : 35000;
                    dualShootSpawnTimeout = setTimeout(() => {
                        if (gameOver) return;
                        const currentParams = getDualShootParams();
                        if (currentParams) {
                            if (Math.random() < currentParams.probability) {
                                createDualShootPack();
                            }
                        }
                        scheduleCheck();
                    }, checkDelay);
                }
                scheduleCheck();
            }

            // --- Laser Point: crear pack en el mapa ---
            function createLaserPointPack() {
                if (gameOver) return;

                const lpEl = document.createElement('div');
                lpEl.classList.add('laser-point-pack');

                const lpImg = document.createElement('img');
                lpImg.src = './img/laser-point.png';
                lpImg.alt = 'Laser Point';
                lpImg.classList.add('capsule-img');
                lpImg.draggable = false;
                lpEl.appendChild(lpImg);

                const bottomPosition = Math.floor(Math.random() * 60) + 20;
                lpEl.style.bottom = bottomPosition + '%';
                lpEl.style.left = '100%';

                gameContainer.appendChild(lpEl);

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const lpSpeed = Math.random() * 3 + diff.packSpeedMin + 2;
                lpEl.style.animation = 'moveAmmoPack ' + lpSpeed + 's linear forwards';

                const lpEntry = { element: lpEl, destroyed: false };
                activeLaserPointPacks.push(lpEntry);

                lpEl.addEventListener('animationend', function() {
                    lpEl.remove();
                    var idx = activeLaserPointPacks.indexOf(lpEntry);
                    if (idx !== -1) activeLaserPointPacks.splice(idx, 1);
                });
            }

            // Probabilidad de spawn del laser-point según dificultad
            function getLaserPointParams() {
                var elapsed = (Date.now() - gameStartTime) / 1000;
                var level = getDifficultyLevel(elapsed);
                // Nivel 0-1: no aparece
                // Nivel 2 PELIGRO:     prob 0.15, cada 32s
                // Nivel 3 CRÍTICO:     prob 0.21, cada 26s
                // Nivel 4 EXTREMO:     prob 0.27, cada 20s
                // Nivel 5 APOCALIPSIS: prob 0.35, cada 15s
                var table = [
                    null, null,
                    { probability: 0.15, delay: 32000 },
                    { probability: 0.21, delay: 26000 },
                    { probability: 0.27, delay: 20000 },
                    { probability: 0.35, delay: 15000 }
                ];
                return table[level] || null;
            }

            function startLaserPointSpawner() {
                function scheduleCheck() {
                    var params = getLaserPointParams();
                    var checkDelay = params ? params.delay : 32000;
                    laserPointSpawnTimeout = setTimeout(function() {
                        if (gameOver) return;
                        var currentParams = getLaserPointParams();
                        if (currentParams) {
                            if (Math.random() < currentParams.probability) {
                                createLaserPointPack();
                            }
                        }
                        scheduleCheck();
                    }, checkDelay);
                }
                scheduleCheck();
            }

            // Activar modo dual-shoot (dura hasta que el jugador pierde una vida)
            function activateDualShoot() {
                if (dualShootActive) return;
                dualShootActive = true;
                updateInventoryUI();
            }

            function deactivateDualShoot() {
                if (!dualShootActive) return;
                dualShootActive = false;
                updateInventoryUI();
            }

            // Activar laser-point (mira láser, dura hasta que el jugador pierde una vida)
            function activateLaserPoint() {
                if (laserPointActive) return;
                laserPointActive = true;

                // Crear línea guía horizontal (laser)
                laserPointGuideEl = document.createElement('div');
                laserPointGuideEl.id = 'laser-point-guide';
                laserPointGuideEl.classList.add('laser-point-guide');
                gameContainer.appendChild(laserPointGuideEl);

                updateInventoryUI();
            }

            function deactivateLaserPoint() {
                if (!laserPointActive) return;
                laserPointActive = false;
                if (laserPointGuideEl) {
                    laserPointGuideEl.classList.add('laser-guide-fadeout');
                    const el = laserPointGuideEl;
                    setTimeout(() => el.remove(), 500);
                    laserPointGuideEl = null;
                }
                updateInventoryUI();
            }

            // --- Triple Shoot: crear pack en el mapa ---
            function createTripleShootPack() {
                if (gameOver) return;

                const tsEl = document.createElement('div');
                tsEl.classList.add('triple-shoot-pack');

                const tsImg = document.createElement('img');
                tsImg.src = './img/triple-shoot.png';
                tsImg.alt = 'Triple Shoot';
                tsImg.classList.add('capsule-img');
                tsImg.draggable = false;
                tsEl.appendChild(tsImg);

                const bottomPosition = Math.floor(Math.random() * 60) + 20;
                tsEl.style.bottom = bottomPosition + '%';
                tsEl.style.left = '100%';

                gameContainer.appendChild(tsEl);

                const elapsed = (Date.now() - gameStartTime) / 1000;
                const diff = getDifficulty(elapsed);
                const tsSpeed = Math.random() * 3 + diff.packSpeedMin + 2;
                tsEl.style.animation = 'moveAmmoPack ' + tsSpeed + 's linear forwards';

                const tsEntry = { element: tsEl, destroyed: false };
                activeTripleShootPacks.push(tsEntry);

                tsEl.addEventListener('animationend', function() {
                    tsEl.remove();
                    var idx = activeTripleShootPacks.indexOf(tsEntry);
                    if (idx !== -1) activeTripleShootPacks.splice(idx, 1);
                });
            }

            // Probabilidad de spawn del triple-shoot según dificultad
            function getTripleShootParams() {
                var elapsed = (Date.now() - gameStartTime) / 1000;
                var level = getDifficultyLevel(elapsed);
                // Nivel 0-2: no aparece
                // Nivel 3 CRÍTICO:     prob 0.11, cada 40s
                // Nivel 4 EXTREMO:     prob 0.17, cada 30s
                // Nivel 5 APOCALIPSIS: prob 0.23, cada 20s
                var table = [
                    null, null, null,
                    { probability: 0.11, delay: 40000 },
                    { probability: 0.17, delay: 30000 },
                    { probability: 0.23, delay: 20000 }
                ];
                return table[level] || null;
            }

            function startTripleShootSpawner() {
                function scheduleCheck() {
                    var params = getTripleShootParams();
                    var checkDelay = params ? params.delay : 40000;
                    tripleShootSpawnTimeout = setTimeout(function() {
                        if (gameOver) return;
                        var currentParams = getTripleShootParams();
                        if (currentParams) {
                            if (Math.random() < currentParams.probability) {
                                createTripleShootPack();
                            }
                        }
                        scheduleCheck();
                    }, checkDelay);
                }
                scheduleCheck();
            }

            // Activar modo triple-shoot (dura hasta que el jugador pierde una vida)
            function activateTripleShoot() {
                if (tripleShootActive) return;
                tripleShootActive = true;
                updateInventoryUI();
            }

            function deactivateTripleShoot() {
                if (!tripleShootActive) return;
                tripleShootActive = false;
                updateInventoryUI();
            }

            function useDualShootFromStorage() {
                if (storedDualShoots <= 0 || dualShootActive || gameOver || !gameStarted) return;
                storedDualShoots--;
                activateDualShoot();
                updateInventoryUI();
            }

            function useLaserPointFromStorage() {
                if (storedLaserPoints <= 0 || laserPointActive || gameOver || !gameStarted) return;
                storedLaserPoints--;
                activateLaserPoint();
                updateInventoryUI();
            }

            function useTripleShootFromStorage() {
                if (storedTripleShoots <= 0 || tripleShootActive || gameOver || !gameStarted) return;
                storedTripleShoots--;
                activateTripleShoot();
                updateInventoryUI();
            }

            // --- Actualizar UI del storage: 4 slots fijos con estados vacío/activo/engaged ---
            function updateInventoryUI() {
                const scBtn = document.getElementById('inv-super');
                const scCount = document.getElementById('inv-super-count');
                const lifeBtn = document.getElementById('inv-life');
                const lifeCount = document.getElementById('inv-life-count');
                const dualBtn = document.getElementById('inv-dual');
                const dualCount = document.getElementById('inv-dual-count');

                // Super Capsule slot
                if (scBtn && scCount) {
                    if (storedSuperCapsules > 0) {
                        scBtn.classList.remove('slot-empty');
                        scBtn.classList.add('slot-active');
                        scCount.textContent = storedSuperCapsules;
                    } else {
                        scBtn.classList.remove('slot-active');
                        scBtn.classList.add('slot-empty');
                    }
                }
                // Life slot
                if (lifeBtn && lifeCount) {
                    if (storedLives > 0) {
                        lifeBtn.classList.remove('slot-empty');
                        lifeBtn.classList.add('slot-active');
                        lifeCount.textContent = storedLives;
                    } else {
                        lifeBtn.classList.remove('slot-active');
                        lifeBtn.classList.add('slot-empty');
                    }
                }
                // Dual Shoot slot
                if (dualBtn && dualCount) {
                    if (dualShootActive) {
                        dualBtn.classList.remove('slot-empty', 'slot-active');
                        dualBtn.classList.add('slot-engaged');
                        dualCount.textContent = storedDualShoots > 0 ? ('ON+' + storedDualShoots) : 'ON';
                    } else if (storedDualShoots > 0) {
                        dualBtn.classList.remove('slot-empty', 'slot-engaged');
                        dualBtn.classList.add('slot-active');
                        dualCount.textContent = storedDualShoots;
                    } else {
                        dualBtn.classList.remove('slot-active', 'slot-engaged');
                        dualBtn.classList.add('slot-empty');
                        dualCount.textContent = '';
                    }
                }
                // Laser Point slot
                var laserBtn = document.getElementById('inv-laser');
                var laserCount = document.getElementById('inv-laser-count');
                if (laserBtn && laserCount) {
                    if (laserPointActive) {
                        laserBtn.classList.remove('slot-empty', 'slot-active');
                        laserBtn.classList.add('slot-engaged');
                        laserCount.textContent = storedLaserPoints > 0 ? ('ON+' + storedLaserPoints) : 'ON';
                    } else if (storedLaserPoints > 0) {
                        laserBtn.classList.remove('slot-empty', 'slot-engaged');
                        laserBtn.classList.add('slot-active');
                        laserCount.textContent = storedLaserPoints;
                    } else {
                        laserBtn.classList.remove('slot-active', 'slot-engaged');
                        laserBtn.classList.add('slot-empty');
                        laserCount.textContent = '';
                    }
                }
                // Triple Shoot slot
                var tripleBtn = document.getElementById('inv-triple');
                var tripleCount = document.getElementById('inv-triple-count');
                if (tripleBtn && tripleCount) {
                    if (tripleShootActive) {
                        tripleBtn.classList.remove('slot-empty', 'slot-active');
                        tripleBtn.classList.add('slot-engaged');
                        tripleCount.textContent = storedTripleShoots > 0 ? ('ON+' + storedTripleShoots) : 'ON';
                    } else if (storedTripleShoots > 0) {
                        tripleBtn.classList.remove('slot-empty', 'slot-engaged');
                        tripleBtn.classList.add('slot-active');
                        tripleCount.textContent = storedTripleShoots;
                    } else {
                        tripleBtn.classList.remove('slot-active', 'slot-engaged');
                        tripleBtn.classList.add('slot-empty');
                        tripleCount.textContent = '';
                    }
                }
            }

            // --- Handler del botón de usar super capsule (click/touch en storage) ---
            const invSuperBtn = document.getElementById('inv-super');
            if (invSuperBtn) {
                function useSuperFromStorage(e) {
                    if (e) { e.preventDefault(); e.stopPropagation(); }
                    if (storedSuperCapsules <= 0 || godModeActive || gameOver || !gameStarted) return;
                    storedSuperCapsules--;
                    updateInventoryUI();
                    activateGodMode();
                }
                invSuperBtn.addEventListener('touchstart', useSuperFromStorage, { passive: false });
                invSuperBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invSuperBtn.addEventListener('click', function(e) { e.stopPropagation(); useSuperFromStorage(e); });
            }

            // --- Handlers de vida y dual ---
            const invLifeBtn = document.getElementById('inv-life');
            if (invLifeBtn) {
                invLifeBtn.addEventListener('touchstart', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invLifeBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invLifeBtn.addEventListener('click', function(e) { e.stopPropagation(); });
            }
            const invDualBtn = document.getElementById('inv-dual');
            if (invDualBtn) {
                invDualBtn.addEventListener('touchstart', function(e) { e.preventDefault(); e.stopPropagation(); useDualShootFromStorage(); }, { passive: false });
                invDualBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invDualBtn.addEventListener('click', function(e) { e.stopPropagation(); useDualShootFromStorage(); });
            }
            // --- Handlers de laser y triple ---
            const invLaserBtn = document.getElementById('inv-laser');
            if (invLaserBtn) {
                invLaserBtn.addEventListener('touchstart', function(e) { e.preventDefault(); e.stopPropagation(); useLaserPointFromStorage(); }, { passive: false });
                invLaserBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invLaserBtn.addEventListener('click', function(e) { e.stopPropagation(); useLaserPointFromStorage(); });
            }
            var invTripleBtn = document.getElementById('inv-triple');
            if (invTripleBtn) {
                invTripleBtn.addEventListener('touchstart', function(e) { e.preventDefault(); e.stopPropagation(); useTripleShootFromStorage(); }, { passive: false });
                invTripleBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invTripleBtn.addEventListener('click', function(e) { e.stopPropagation(); useTripleShootFromStorage(); });
            }

            // Disparo gratuito (god mode) - no consume misiles
            // Soporta stacking: triple + dual en god mode
            function shootGodMissile() {
                if (gameOver || !gameStarted) return;

                // Si triple-shoot está activo, usar disparo triple (que ya incluye stacking con dual)
                if (tripleShootActive) {
                    shootTripleMissiles();
                    return;
                }

                const spaceshipRect = spaceship.getBoundingClientRect();
                const gameContainerRect = gameContainer.getBoundingClientRect();
                const missileBottomPos = gameContainerRect.bottom - (spaceshipRect.top + spaceshipRect.height / 2);
                const startX = spaceshipRect.left - gameContainerRect.left + spaceshipRect.width;

                const missile = document.createElement('img');
                missile.src = './img/missil.png';
                missile.classList.add('missile', 'god-missile');
                if (dualShootActive) missile.classList.add('dual-missile');
                missile.style.position = 'absolute';
                missile.style.bottom = `${missileBottomPos}px`;
                missile.style.left = startX + 'px';
                gameContainer.appendChild(missile);

                const fwdSpeed = dualShootActive ? 2 : 1;
                activeMissiles.push({ element: missile, tx: 0, originX: startX, speed: fwdSpeed, direction: 1 });

                // Si dual-shoot activo: misil god hacia atrás
                if (dualShootActive) {
                    const backMissile = document.createElement('img');
                    backMissile.src = './img/missil.png';
                    backMissile.classList.add('missile', 'god-missile', 'dual-missile', 'missile-backward');
                    backMissile.style.position = 'absolute';
                    backMissile.style.bottom = `${missileBottomPos}px`;
                    const backStartX = spaceshipRect.left - gameContainerRect.left;
                    backMissile.style.left = backStartX + 'px';
                    gameContainer.appendChild(backMissile);
                    activeMissiles.push({ element: backMissile, tx: 0, originX: backStartX, speed: 2, direction: -1 });
                }
            }

            // Activar God Mode
            function activateGodMode() {
                if (godModeActive) return;
                godModeActive = true;

                // Crear halo alrededor de la nave (posición se actualiza en el game loop principal)
                const halo = document.createElement('div');
                halo.id = 'god-mode-halo';
                halo.classList.add('god-halo');
                spaceship.parentElement.appendChild(halo);
                godModeHaloEl = halo;

                // Auto-fire continuo
                godModeAutoFireInterval = setInterval(() => {
                    if (gameOver || !godModeActive) {
                        clearInterval(godModeAutoFireInterval);
                        return;
                    }
                    shootGodMissile();
                }, GOD_MODE_AUTOFIRE_RATE);

                // A los 5 segundos restantes: empezar parpadeo de aviso
                godModeBlinkTimer = setTimeout(() => {
                    halo.classList.add('god-halo-warning');
                }, GOD_MODE_DURATION - GOD_MODE_WARN_AT);

                // Al terminar: desactivar todo
                godModeTimer = setTimeout(() => {
                    deactivateGodMode();
                }, GOD_MODE_DURATION);
            }

            function deactivateGodMode() {
                godModeActive = false;

                if (godModeAutoFireInterval) {
                    clearInterval(godModeAutoFireInterval);
                    godModeAutoFireInterval = null;
                }
                if (godModeTimer) {
                    clearTimeout(godModeTimer);
                    godModeTimer = null;
                }
                if (godModeBlinkTimer) {
                    clearTimeout(godModeBlinkTimer);
                    godModeBlinkTimer = null;
                }

                const halo = document.getElementById('god-mode-halo');
                if (halo) {
                    halo.classList.add('god-halo-fadeout');
                    setTimeout(() => halo.remove(), 500);
                }
                godModeHaloEl = null;
            }

            // Victoria: alcanzó rango máximo "Dios del Ciberespacio"
            function showVictoryMessage() {
                if (gameLoopId) {
                    cancelAnimationFrame(gameLoopId);
                    gameLoopId = null;
                }

                const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
                const maxLevelInfo = DIFFICULTY_LEVELS[maxDifficultyLevel];
                const godRank = RANK_TABLE[RANK_TABLE.length - 1];

                const victoryOverlay = document.createElement('div');
                victoryOverlay.id = 'game-over-message';
                victoryOverlay.innerHTML = `
                    <div class="go-header">
                        <h1 class="victory-title" style="color:${godRank.color};text-shadow:0 0 20px ${godRank.color}, 0 0 40px ${godRank.color}80;animation:victoryPulse 1.5s ease-in-out infinite;">&#9733; VICTORIA TOTAL &#9733;</h1>
                        <span class="game-over-reason" style="color:#ffdd00;">Has alcanzado el rango supremo</span>
                    </div>
                    <div class="go-body">
                        <div class="go-sticker-col">
                            <img src="${godRank.img}" alt="${escapeHTML(godRank.name)}" class="rank-sticker rank-sticker-god" draggable="false" id="rank-sticker-img">
                            <p class="player-rank" style="color:${godRank.color};text-shadow:0 0 15px ${godRank.color}, 0 0 30px ${godRank.color}60;animation:victoryPulse 2s ease-in-out infinite;">&#9889; ${escapeHTML(godRank.name)} &#9889;</p>
                            <button id="download-sticker-btn" class="download-sticker-btn" title="Descargar sticker">&#11015; Guardar</button>
                        </div>
                        <div class="go-stats-col">
                            <p class="player-result" style="font-size:1.1em;">Defensor: <strong>${escapeHTML(playerName)}</strong></p>
                            <div class="stats-row">
                                <div class="stat-box">
                                    <span class="stat-value" style="color:${godRank.color};">${cyberattackCount}</span>
                                    <span class="stat-label">Amenazas</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value">${elapsedSeconds}s</span>
                                    <span class="stat-label">Tiempo</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value">${missileCount}</span>
                                    <span class="stat-label">Misiles</span>
                                </div>
                            </div>
                            <div class="stats-row">
                                <div class="stat-box">
                                    <span class="stat-value" style="color:${maxLevelInfo.color};font-size:0.85em;">${escapeHTML(maxLevelInfo.name)}</span>
                                    <span class="stat-label">Nivel ${maxDifficultyLevel + 1}</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value" style="color:#ff8844;">${threatsEscaped}</span>
                                    <span class="stat-label">Escapadas</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value" style="color:#ff4466;">${totalPenalty}</span>
                                    <span class="stat-label">Penalizaci&#243;n</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="leaderboard-placeholder"><p style="color:#88aacc;">Cargando leaderboard...</p></div>
                    <div class="buttons-container">
                        <button id="exit-button">Salir</button>
                        <button id="restart-game-button">Reiniciar Juego</button>
                        <button id="clear-leaderboard-button" title="Limpiar Leaderboard">
                            <svg viewBox="0 0 64 64" width="28" height="28" style="vertical-align:middle;">
                                <defs>
                                    <linearGradient id="lbResetGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#00d4ff"/>
                                        <stop offset="100%" stop-color="#0077cc"/>
                                    </linearGradient>
                                </defs>
                                <!-- Flecha circular de reset -->
                                <path d="M32 8 A24 24 0 1 1 10 22" fill="none" stroke="url(#lbResetGrad)" stroke-width="3.5" stroke-linecap="round"/>
                                <polygon points="6,14 14,14 10,24" fill="#00d4ff"/>
                                <!-- Barras de gráfico ascendente -->
                                <rect x="20" y="40" width="6" height="12" rx="1" fill="#00d4ff" opacity="0.7"/>
                                <rect x="29" y="33" width="6" height="19" rx="1" fill="#00aaee" opacity="0.85"/>
                                <rect x="38" y="25" width="6" height="27" rx="1" fill="#0088dd"/>
                                <!-- Estrella en la cima -->
                                <polygon points="41,19 42.5,23 47,23.5 43.5,26.5 44.5,31 41,28.5 37.5,31 38.5,26.5 35,23.5 39.5,23" fill="#ffd700" stroke="#ffaa00" stroke-width="0.5"/>
                                <!-- Destellos -->
                                <circle cx="18" cy="15" r="1.2" fill="#ffffff" opacity="0.8"/>
                                <circle cx="50" cy="18" r="0.8" fill="#ffffff" opacity="0.6"/>
                                <circle cx="14" cy="35" r="1" fill="#ffffff" opacity="0.5"/>
                            </svg>
                        </button>
                    </div>
                `;
                gameContainer.appendChild(victoryOverlay);

                gameContainer.style.cursor = 'default';
                const mobileCtrlVictory = document.getElementById('mobile-controls');
                if (mobileCtrlVictory) mobileCtrlVictory.style.display = 'none';
                const invHudVictory = document.getElementById('storage-panel');
                if (invHudVictory) invHudVictory.style.display = 'none';
                const musicBtnVictory = document.getElementById('toggle-music-button');
                if (musicBtnVictory) musicBtnVictory.style.display = 'none';

                victoryOverlay.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (event.target && event.target.id === 'exit-button') {
                        returnToMainMenu();
                    }
                    if (event.target && event.target.id === 'restart-game-button') {
                        resetGame();
                    }
                    if (event.target && event.target.id === 'clear-leaderboard-button') {
                        showAdminModal(function() {
                            localStorage.removeItem('cyberspace_leaderboard');
                            clearRemoteLeaderboard();
                            const lbContainer = document.getElementById('leaderboard-container');
                            if (lbContainer) {
                                lbContainer.innerHTML = '<h2>Leaderboard - Top 100</h2><p style="color:#88aacc;margin-top:10px;">Leaderboard limpiado</p>';
                            }
                        });
                    }
                    if (event.target && event.target.id === 'download-sticker-btn') {
                        downloadRankSticker();
                    }
                    if (event.target && event.target.id === 'rank-sticker-img') {
                        toggleStickerZoom();
                    }
                });

                addToLeaderboard(playerName, cyberattackCount, elapsedSeconds).then(board => {
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder && placeholder.parentNode) {
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = buildLeaderboardHTML(board);
                        placeholder.parentNode.replaceChild(wrapper.firstElementChild || wrapper, placeholder);
                    }
                }).catch(function() {
                    // Error cargando leaderboard (silencioso)
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.textContent = 'Error cargando leaderboard';
                        placeholder.style.color = '#ff6666';
                    }
                });
            }

            // Continuar juego usando una vida almacenada
            // Reinicia desde el INICIO del nivel de dificultad actual
            function continueWithLife() {
                storedLives--;
                updateInventoryUI();
                gameOver = false;
                gameContainer.style.cursor = 'none';

                // Reposicionar nave en zona segura (centro)
                spaceship.style.bottom = '50%';

                // Dar misiles mínimos si se quedó sin ellos
                if (missileCount <= 0) {
                    missileCount = 25;
                    updateMissileDisplay();
                }

                // Limpiar TODAS las amenazas y packs en pantalla
                document.querySelectorAll('.asteroid').forEach(a => a.remove());
                document.querySelectorAll('.cyber-attack').forEach(c => c.remove());
                document.querySelectorAll('.ammo-pack').forEach(p => p.remove());
                document.querySelectorAll('.super-capsule').forEach(s => s.remove());
                document.querySelectorAll('.life-pack').forEach(l => l.remove());
                document.querySelectorAll('.dual-shoot-pack').forEach(d => d.remove());
                document.querySelectorAll('.laser-point-pack').forEach(lp => lp.remove());
                document.querySelectorAll('.triple-shoot-pack').forEach(t => t.remove());

                // Limpiar arrays de entidades en pantalla
                activeHazards.length = 0;
                activePacks.length = 0;
                activeSuperCapsules.length = 0;
                activeLifePacks.length = 0;
                activeDualShootPacks.length = 0;
                activeLaserPointPacks.length = 0;
                activeTripleShootPacks.length = 0;
                activeMissiles.forEach(m => m.element.remove());
                activeMissiles.length = 0;

                // --- Retroceder gameStartTime al inicio del nivel actual ---
                // Esto reinicia la dificultad al comienzo del nivel en que murió
                const elapsedNow = (Date.now() - gameStartTime) / 1000;
                const currentLevel = getDifficultyLevel(elapsedNow);
                const levelStartSeconds = DIFFICULTY_LEVELS[currentLevel].threshold;
                gameStartTime = Date.now() - (levelStartSeconds * 1000);

                // Actualizar HUD de dificultad y distancia al nuevo tiempo
                lightYears = levelStartSeconds;
                distanceCounter.textContent = `Ciberpasos: ${lightYears}`;
                updateDifficultyHUD(levelStartSeconds);

                // Restaurar controles móviles, inventario y botón de música
                const isTouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
                const mobileCtrlCont = document.getElementById('mobile-controls');
                if (isTouchDev && mobileCtrlCont) mobileCtrlCont.style.display = 'flex';
                const invHud = document.getElementById('storage-panel');
                if (invHud) invHud.style.display = 'flex';
                const musicBtnResume = document.getElementById('toggle-music-button');
                if (musicBtnResume) musicBtnResume.style.display = '';

                // Limpiar spawners anteriores
                clearTimeout(asteroidSpawnTimeout);
                clearInterval(distanceInterval);
                clearTimeout(ammoPackTimeout);
                clearTimeout(superCapsuleSpawnTimeout);
                clearTimeout(lifePackSpawnTimeout);
                clearTimeout(dualShootSpawnTimeout);
                clearTimeout(laserPointSpawnTimeout);
                clearTimeout(tripleShootSpawnTimeout);

                // Reiniciar todos los spawners desde el inicio del nivel
                startDistanceCounter();
                startAsteroids();
                startAmmoPacks();
                startSuperCapsuleSpawner();
                startLifePackSpawner();
                startDualShootSpawner();
                startLaserPointSpawner();
                startTripleShootSpawner();

                // Reiniciar controles de movimiento
                touchTargetBottom = -1;
                shipCurrentBottom = -1;
                mouseTargetBottom = -1;

                // Reiniciar el game loop
                lastFrameTime = 0;
                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Mostrar mensaje de "Game Over" con leaderboard
            function showGameOverMessage(reason) {
                // Detener god mode, dual-shoot, laser-point y triple-shoot si estaban activos
                deactivateGodMode();
                deactivateDualShoot();
                deactivateLaserPoint();
                deactivateTripleShoot();

                // Detener el game loop
                if (gameLoopId) {
                    cancelAnimationFrame(gameLoopId);
                    gameLoopId = null;
                }

                // Si tiene vidas, ofrecer continuar
                if (storedLives > 0) {
                    gameContainer.style.cursor = 'default';
                    const continueOverlay = document.createElement('div');
                    continueOverlay.id = 'game-over-message';
                    continueOverlay.classList.add('continue-screen');
                    const lifeWord = storedLives > 1 ? 'vidas extra' : 'vida extra';
                    continueOverlay.innerHTML = `
                        <img src="./img/continue-banner.png" alt="Continue?" class="continue-banner" draggable="false">
                        <p class="continue-lives-info">
                            <img src="./img/pack-life+1.png" alt="" class="continue-life-icon">
                            <span><strong>${storedLives}</strong> ${lifeWord}</span>
                        </p>
                        <div class="buttons-container" style="display:flex;gap:0.6em;flex-wrap:wrap;justify-content:center;flex-shrink:0;margin-top:0.3em;">
                            <button id="continue-yes-btn" class="continue-btn continue-btn-yes">&#9654; Continuar</button>
                            <button id="continue-no-btn" class="continue-btn continue-btn-no">&#10006; Rendirse</button>
                        </div>
                    `;
                    gameContainer.appendChild(continueOverlay);

                    // Ocultar controles móviles, inventario y botón de música durante el diálogo
                    const mobileCtrlCont = document.getElementById('mobile-controls');
                    if (mobileCtrlCont) mobileCtrlCont.style.display = 'none';
                    const invHud = document.getElementById('storage-panel');
                    if (invHud) invHud.style.display = 'none';
                    const musicBtnCont = document.getElementById('toggle-music-button');
                    if (musicBtnCont) musicBtnCont.style.display = 'none';

                    continueOverlay.addEventListener('click', function(event) {
                        event.stopPropagation();
                        if (event.target.id === 'continue-yes-btn') {
                            continueOverlay.remove();
                            continueWithLife();
                        } else if (event.target.id === 'continue-no-btn') {
                            continueOverlay.remove();
                            // Descartar vidas restantes para ir directo al game over con leaderboard
                            storedLives = 0;
                            updateInventoryUI();
                            showGameOverMessage(reason);
                        }
                    });
                    return;
                }

                const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);

                // Crear el overlay de Game Over INMEDIATAMENTE (sin esperar async)
                const gameOverMessage = document.createElement('div');
                gameOverMessage.id = 'game-over-message';
                const maxLevelInfo = DIFFICULTY_LEVELS[maxDifficultyLevel];
                const playerRank = getRank(cyberattackCount);
                gameOverMessage.innerHTML = `
                    <div class="go-header">
                        <h1>Misión Finalizada</h1>
                        ${reason ? `<span class="game-over-reason">${escapeHTML(reason)}</span>` : ''}
                    </div>
                    <div class="go-body">
                        <div class="go-sticker-col">
                            <img src="${playerRank.img}" alt="${escapeHTML(playerRank.name)}" class="rank-sticker" draggable="false" id="rank-sticker-img">
                            <p class="player-rank" style="color:${playerRank.color};text-shadow:0 0 10px ${playerRank.color}60;">&#9733; ${escapeHTML(playerRank.name)} &#9733;</p>
                            <button id="download-sticker-btn" class="download-sticker-btn" title="Descargar sticker">&#11015; Guardar</button>
                        </div>
                        <div class="go-stats-col">
                            <p class="player-result">Defensor: <strong>${escapeHTML(playerName)}</strong></p>
                            <div class="stats-row">
                                <div class="stat-box">
                                    <span class="stat-value">${cyberattackCount}</span>
                                    <span class="stat-label">Amenazas</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value">${elapsedSeconds}s</span>
                                    <span class="stat-label">Tiempo</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value">${missileCount}</span>
                                    <span class="stat-label">Misiles</span>
                                </div>
                            </div>
                            <div class="stats-row">
                                <div class="stat-box">
                                    <span class="stat-value" style="color:${maxLevelInfo.color};font-size:0.85em;">${escapeHTML(maxLevelInfo.name)}</span>
                                    <span class="stat-label">Nivel ${maxDifficultyLevel + 1}</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value" style="color:#ff8844;">${threatsEscaped}</span>
                                    <span class="stat-label">Escapadas</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-value" style="color:#ff4466;">${totalPenalty}</span>
                                    <span class="stat-label">Penalizaci&#243;n</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="leaderboard-placeholder"><p style="color:#88aacc;">Cargando leaderboard...</p></div>
                    <div class="buttons-container">
                        <button id="exit-button">Salir</button>
                        <button id="restart-game-button">Reiniciar Juego</button>
                        <button id="clear-leaderboard-button" title="Limpiar Leaderboard">
                            <svg viewBox="0 0 64 64" width="28" height="28" style="vertical-align:middle;">
                                <defs>
                                    <linearGradient id="lbResetGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#00d4ff"/>
                                        <stop offset="100%" stop-color="#0077cc"/>
                                    </linearGradient>
                                </defs>
                                <!-- Flecha circular de reset -->
                                <path d="M32 8 A24 24 0 1 1 10 22" fill="none" stroke="url(#lbResetGrad)" stroke-width="3.5" stroke-linecap="round"/>
                                <polygon points="6,14 14,14 10,24" fill="#00d4ff"/>
                                <!-- Barras de gráfico ascendente -->
                                <rect x="20" y="40" width="6" height="12" rx="1" fill="#00d4ff" opacity="0.7"/>
                                <rect x="29" y="33" width="6" height="19" rx="1" fill="#00aaee" opacity="0.85"/>
                                <rect x="38" y="25" width="6" height="27" rx="1" fill="#0088dd"/>
                                <!-- Estrella en la cima -->
                                <polygon points="41,19 42.5,23 47,23.5 43.5,26.5 44.5,31 41,28.5 37.5,31 38.5,26.5 35,23.5 39.5,23" fill="#ffd700" stroke="#ffaa00" stroke-width="0.5"/>
                                <!-- Destellos -->
                                <circle cx="18" cy="15" r="1.2" fill="#ffffff" opacity="0.8"/>
                                <circle cx="50" cy="18" r="0.8" fill="#ffffff" opacity="0.6"/>
                                <circle cx="14" cy="35" r="1" fill="#ffffff" opacity="0.5"/>
                            </svg>
                        </button>
                    </div>
                `;
                gameContainer.appendChild(gameOverMessage);

                // Mostrar cursor en game over para poder usar botones
                gameContainer.style.cursor = 'default';

                // Ocultar controles móviles, inventario y botón de música en game over
                const mobileCtrlGO = document.getElementById('mobile-controls');
                if (mobileCtrlGO) mobileCtrlGO.style.display = 'none';
                const invHudGO = document.getElementById('storage-panel');
                if (invHudGO) invHudGO.style.display = 'none';
                const musicBtnGO = document.getElementById('toggle-music-button');
                if (musicBtnGO) musicBtnGO.style.display = 'none';

                gameOverMessage.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (event.target && event.target.id === 'exit-button') {
                        returnToMainMenu();
                    }
                    if (event.target && event.target.id === 'restart-game-button') {
                        resetGame();
                    }
                    if (event.target && event.target.id === 'clear-leaderboard-button') {
                        showAdminModal(function() {
                            localStorage.removeItem('cyberspace_leaderboard');
                            clearRemoteLeaderboard();
                            const lbContainer = document.getElementById('leaderboard-container');
                            if (lbContainer) {
                                lbContainer.innerHTML = '<h2>Leaderboard - Top 100</h2><p style="color:#88aacc;margin-top:10px;">Leaderboard limpiado</p>';
                            }
                        });
                    }
                    if (event.target && event.target.id === 'download-sticker-btn') {
                        downloadRankSticker();
                    }
                    if (event.target && event.target.id === 'rank-sticker-img') {
                        toggleStickerZoom();
                    }
                });

                // Cargar leaderboard en segundo plano (no bloquea el UI)
                addToLeaderboard(playerName, cyberattackCount, elapsedSeconds).then(board => {
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder && placeholder.parentNode) {
                        const wrapper = document.createElement('div');
                        wrapper.innerHTML = buildLeaderboardHTML(board);
                        placeholder.parentNode.replaceChild(wrapper.firstElementChild || wrapper, placeholder);
                    }
                }).catch(function() {
                    // Error cargando leaderboard (silencioso)
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.textContent = 'Error cargando leaderboard';
                        placeholder.style.color = '#ff6666';
                    }
                });
            }

            // Reiniciar el juego
            function resetGame() {
                const gameOverMessage = document.getElementById('game-over-message');
                if (gameOverMessage) {
                    gameOverMessage.remove();
                }
                gameOver = false;
                // Ocultar cursor de nuevo al reiniciar
                gameContainer.style.cursor = 'none';
                lightYears = 0;
                asteroidCount = 0;
                cyberattackCount = 0;
                threatsEscaped = 0;
                totalPenalty = 0;
                missileCount = 50;
                missilesUsed = 0;
                packsCollected = 0;
                gameStartTime = Date.now();
                currentEntryId = null;
                distanceCounter.textContent = `Ciberpasos: ${lightYears}`;
                asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;
                cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;
                updateMissileDisplay();

                // Reiniciar HUD de dificultad y fondo
                updateDifficultyHUD(0);
                bgScrollX = 0;
                bgCurrentSpeed = 20;
                bgTargetSpeed = 20;
                if (backgroundEl) {
                    backgroundEl.style.transform = 'translate3d(0%, 0, 0)';
                }

                spaceship.style.bottom = '50%';
                spaceship.style.left = '25%';
                spaceship.style.transform = 'translate(-50%, 50%)';

                document.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());
                document.querySelectorAll('.cyber-attack').forEach(cyber => cyber.remove());
                document.querySelectorAll('.ammo-pack').forEach(pack => pack.remove());
                document.querySelectorAll('.missile').forEach(m => m.remove());
                document.querySelectorAll('.super-capsule').forEach(sc => sc.remove());
                document.querySelectorAll('.life-pack').forEach(lp => lp.remove());
                document.querySelectorAll('.dual-shoot-pack').forEach(ds => ds.remove());
                document.querySelectorAll('.laser-point-pack').forEach(lp => lp.remove());
                document.querySelectorAll('.triple-shoot-pack').forEach(ts => ts.remove());
                const haloEl = document.getElementById('god-mode-halo');
                if (haloEl) haloEl.remove();

                // Limpiar god mode, dual-shoot, laser-point y triple-shoot
                deactivateGodMode();
                deactivateDualShoot();
                deactivateLaserPoint();
                deactivateTripleShoot();
                activeSuperCapsules.length = 0;
                activeLifePacks.length = 0;
                activeDualShootPacks.length = 0;
                activeLaserPointPacks.length = 0;
                activeTripleShootPacks.length = 0;
                clearTimeout(superCapsuleSpawnTimeout);
                clearTimeout(lifePackSpawnTimeout);
                clearTimeout(dualShootSpawnTimeout);
                clearTimeout(laserPointSpawnTimeout);
                clearTimeout(tripleShootSpawnTimeout);

                // Limpiar arrays de entidades
                activeMissiles.length = 0;
                activeHazards.length = 0;
                activePacks.length = 0;

                // Reiniciar estado táctil y mouse
                touchTargetBottom = -1;
                shipCurrentBottom = -1;
                isTouchControlled = false;
                lastMobileFireTime = 0;
                mouseTargetBottom = -1;
                isMouseControlled = false;

                // Actualizar dimensiones cacheadas por si cambió el viewport
                cachedContainerHeight = gameContainer.clientHeight;
                cachedSpaceshipHeight = spaceship.clientHeight;

                // Restaurar controles móviles, inventario y botón de música
                const isTouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
                const mobileCtrlReset = document.getElementById('mobile-controls');
                if (isTouchDev && mobileCtrlReset) mobileCtrlReset.style.display = 'flex';
                const invHudReset = document.getElementById('storage-panel');
                if (invHudReset) invHudReset.style.display = 'flex';
                const musicBtnReset = document.getElementById('toggle-music-button');
                if (musicBtnReset) musicBtnReset.style.display = '';

                // Reiniciar inventario (el jugador empieza con vidas extra de cortesía)
                storedSuperCapsules = 0;
                storedLives = INITIAL_EXTRA_LIVES;
                storedDualShoots = 0;
                storedLaserPoints = 0;
                storedTripleShoots = 0;
                updateInventoryUI();

                clearTimeout(asteroidSpawnTimeout);
                clearInterval(distanceInterval);
                clearTimeout(ammoPackTimeout);
                maxDifficultyLevel = 0;

                // Reiniciar loops
                lastFrameTime = 0;
                startDistanceCounter();
                startAsteroids();
                startAmmoPacks();
                startSuperCapsuleSpawner();
                startLifePackSpawner();
                startDualShootSpawner();
                startLaserPointSpawner();
                startTripleShootSpawner();
                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Iniciar la creación de asteroides y cyberattacks (dificultad dinámica)
            function startAsteroids() {
                const asteroidImages = [
                    './img/rock-1.png',
                    './img/rock-2.png',
                    './img/rock-3.png',
                    './img/rock-4.png',
                    './img/rock-5.png',
                    './img/rock-6.png',
                    './img/rock-7.png',
                    './img/rock-8.png',
                    './img/rock-9.png',
                    './img/rock-10.png',
                    './img/rock-11.png',
                    './img/rock-12.png',
                    './img/rock-13.png'
                ];

                const cyberAttackImages = [
                    './img/aster-1.png',
                    './img/aster-2.png',
                    './img/aster-3.png',
                    './img/aster-4.png',
                    './img/aster-5.png',
                    './img/aster-6.png'
                ];

                function scheduleNextSpawn() {
                    const elapsed = (Date.now() - gameStartTime) / 1000;
                    const diff = getDifficulty(elapsed);

                    asteroidSpawnTimeout = setTimeout(() => {
                        if (gameOver) return;

                        // Spawn asteroide principal
                        const randomAsteroid = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
                        createAsteroid(randomAsteroid, false);

                        // Multi-spawn: chance de un segundo asteroide simultáneo
                        if (Math.random() < diff.multiSpawnChance) {
                            const extraAsteroid = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
                            createAsteroid(extraAsteroid, false);
                        }

                        // Probabilidad dinámica de cyberattack
                        if (Math.random() < diff.cyberProbability) {
                            const randomCyber = cyberAttackImages[Math.floor(Math.random() * cyberAttackImages.length)];
                            createCyberAttack(randomCyber);
                        }

                        scheduleNextSpawn();
                    }, diff.spawnInterval);
                }

                scheduleNextSpawn();
            }

            startAsteroids();
            startAmmoPacks();
            startSuperCapsuleSpawner();
            startLifePackSpawner();
            startDualShootSpawner();
            startLaserPointSpawner();
            startTripleShootSpawner();

            // Mostrar vidas iniciales en el HUD
            updateInventoryUI();

        } // fin de initGame

        // Iniciar con la pantalla de ingreso de alias
        initPlayerScreen();
    })();
