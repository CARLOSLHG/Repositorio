    (function() {
        // Versión 3.0 - Sistema de misiles + Packs de munición
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

        // --- Dual Shoot: disparo doble con línea guía (activo hasta morir) ---
        let dualShootActive = false;
        let dualShootGuideEl = null;
        let activeDualShootPacks = [];
        let dualShootSpawnTimeout = null;

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

                // Delay base de packs: 12s → 20s (más escasos)
                packBaseDelay: 12000 + (8000 * factor),

                // Delay máximo de packs: 45s → 55s
                packMaxDelay: 45000 + (10000 * factor),

                // Incremento de delay por segundo: 50ms → 90ms
                packMsPerSecond: 50 + (40 * factor),

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

        // --- Leaderboard: JSONBin.io (compartido) + localStorage (fallback) ---
        const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/';

        function getLocalLeaderboard() {
            try {
                return JSON.parse(localStorage.getItem('cyberspace_leaderboard')) || [];
            } catch (e) {
                return [];
            }
        }

        function saveLocalLeaderboard(board) {
            localStorage.setItem('cyberspace_leaderboard', JSON.stringify(board));
        }

        function sortAndTrimBoard(board) {
            board.sort((a, b) => (b.score || 0) - (a.score || 0));
            if (board.length > 100) board.length = 100;
            return board;
        }

        async function fetchRemoteLeaderboard() {
            const res = await fetch(JSONBIN_URL + JSONBIN_CONFIG.binId + '/latest', {
                headers: { 'X-Master-Key': JSONBIN_CONFIG.apiKey }
            });
            if (!res.ok) throw new Error('JSONBin GET ' + res.status);
            const data = await res.json();
            return data.record.leaderboard || [];
        }

        async function saveRemoteLeaderboard(board) {
            const res = await fetch(JSONBIN_URL + JSONBIN_CONFIG.binId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_CONFIG.apiKey
                },
                body: JSON.stringify({ leaderboard: board })
            });
            if (!res.ok) throw new Error('JSONBin PUT ' + res.status);
        }

        async function getLeaderboard() {
            if (jsonbinEnabled) {
                try {
                    const board = await fetchRemoteLeaderboard();
                    saveLocalLeaderboard(board);
                    return board;
                } catch (e) {
                    console.warn('JSONBin read falló, usando localStorage:', e);
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

            if (jsonbinEnabled) {
                try {
                    const remoteBoard = await fetchRemoteLeaderboard();
                    remoteBoard.push(entry);
                    const sorted = sortAndTrimBoard(remoteBoard);
                    await saveRemoteLeaderboard(sorted);
                    saveLocalLeaderboard(sorted);
                    return sorted;
                } catch (e) {
                    console.warn('JSONBin write falló:', e);
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
            if (!jsonbinEnabled) return;
            try {
                await saveRemoteLeaderboard([]);
            } catch (e) {
                console.warn('JSONBin clear falló:', e);
            }
        }

        // --- Sistema de rangos sci-fi + ciberseguridad (basado en amenazas neutralizadas) ---
        // Primer umbral: 50, cada siguiente +20% del anterior
        const RANK_TABLE = [
            { name: 'Script Kiddie',              color: '#667788' },
            { name: 'Cadete Firewall',             color: '#5599aa' },
            { name: 'Analista de Paquetes',        color: '#44aacc' },
            { name: 'Operador SOC Estelar',        color: '#33bbdd' },
            { name: 'Pentester Cuántico',          color: '#22cc88' },
            { name: 'Centinela Zero-Day',          color: '#44dd55' },
            { name: 'Agente del Rootkit',          color: '#aacc22' },
            { name: 'Criptógrafo Interestelar',    color: '#ddbb11' },
            { name: 'Comandante Exploit',          color: '#ff9922' },
            { name: 'Red Team Galáctico',          color: '#ff6633' },
            { name: 'Capitán del Kernel',          color: '#ff3355' },
            { name: 'Almirante Ransomware Hunter', color: '#dd22aa' },
            { name: 'Guardián de la Blockchain',   color: '#bb33ff' },
            { name: 'Archon del Deep Web',         color: '#8855ff' },
            { name: 'Leyenda del CyberVoid',       color: '#00ffcc' },
            { name: 'Dios del Ciberespacio',       color: '#ffdd00' }
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
                    <td>${entry.name}${godIcon}</td>
                    <td>${entry.threats}</td>
                    <td>${entry.time}s</td>
                    <td style="color:${rank.color};text-shadow:0 0 6px ${rank.color}40;">${rank.name}</td>
                    <td>${entry.date}</td>
                </tr>`;
            });
            const modeLabel = jsonbinEnabled ? '🌐 Global' : '💻 Local';
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

            function goToLeaderboard(e) {
                e.stopPropagation();
                e.preventDefault();

                const name = playerNameInput.value.trim();
                if (!name) {
                    playerNameInput.style.borderColor = '#ff3b3f';
                    playerNameInput.setAttribute('placeholder', '¡Debes ingresar un alias!');
                    playerNameInput.focus();
                    return;
                }
                playerName = name;
                // Guardar alias en localStorage
                localStorage.setItem('cyberspace_last_alias', playerName);

                // Mostrar pantalla de leaderboard pre-juego
                playerScreen.style.display = 'none';
                pregameScreen.style.display = 'flex';

                const welcomeEl = document.getElementById('pregame-welcome');
                welcomeEl.innerHTML = `Bienvenido, <strong>${playerName}</strong>`;

                // Cargar leaderboard
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
                playerDisplay.textContent = `Defensor: ${playerName}`;
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

            startGameButton.addEventListener('click', goToLeaderboard);
            playerNameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                    goToLeaderboard(e);
                }
            });
            launchGameButton.addEventListener('click', launchGame);
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

        // --- Desktop mouse (zero-delay via game loop) ---
        let cachedContainerHeight = 0;
        let cachedSpaceshipHeight = 0;
        let mouseTargetBottom = -1;
        let isMouseControlled = false;

        // --- Background scroll fluido (controlado desde game loop) ---
        let bgScrollX = 0;          // posición actual (0 a -50, en %)
        let bgCurrentSpeed = 20;    // velocidad actual (segundos para recorrer el ciclo)
        let bgTargetSpeed = 20;     // velocidad objetivo (se interpola hacia esta)
        // Factor de escala: compensa que el elemento ahora mide 1400vh en vez de 200vw.
        // Mantiene la misma velocidad visual (px/s) que con width:200%.
        let bgSpeedScale = 1;
        function updateBgSpeedScale() {
            // oldElementWidth = 2 * vw, newElementWidth = 14 * vh
            // scale = oldWidth / newWidth = (2 * vw) / (14 * vh)
            bgSpeedScale = (2 * window.innerWidth) / (14 * window.innerHeight);
        }

        function initGame() {
            // Añadir música al juego
            const audio = new Audio('./mp3/sound.mp3');
            audio.loop = true;
            audio.volume = 0.08;
            audio.play().catch(() => {});

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

            // Texto inicial sin "(M)" en móvil
            if (isTouchDevice) {
                toggleMusicButton.textContent = 'Apagar Música';
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

            // Tecla M para música, S para super capsule
            document.addEventListener('keydown', (e) => {
                if (e.key === 'm' || e.key === 'M') {
                    toggleMusic();
                }
                if (e.key === 's' || e.key === 'S') {
                    useSuperCapsule();
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
            function updateCachedDimensions() {
                cachedContainerHeight = gameContainer.clientHeight;
                cachedSpaceshipHeight = spaceship.clientHeight;
                updateBgSpeedScale();
            }
            window.addEventListener('resize', updateCachedDimensions);
            updateCachedDimensions();

            // Incrementar la distancia recorrida cada segundo + chequeo de misiles + actualizar dificultad
            const difficultyDisplay = document.getElementById('difficulty-display');
            const backgroundEl = document.getElementById('background');

            function updateDifficultyHUD(elapsed) {
                const diff = getDifficulty(elapsed);
                const level = diff.level;
                if (level > maxDifficultyLevel) maxDifficultyLevel = level;

                if (difficultyDisplay) {
                    difficultyDisplay.textContent = `Nivel: ${diff.levelName}`;
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
                    if (newTouch.clientX > window.innerWidth * 0.5) return;
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
                            const deltaY = lastTouchY - currentY; // positivo = dedo sube = nave sube
                            lastTouchY = currentY;
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
                    return;
                }

                // Delta time normalizado a 60fps (dt=1 a 60fps, dt=2 a 30fps)
                const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.67, 3) : 1;
                lastFrameTime = timestamp;

                const screenWidth = window.innerWidth;

                // === MOBILE: Movimiento suave de la nave (interpolación lerp) ===
                if (isTouchControlled && touchTargetBottom >= 0) {
                    const smoothing = 0.35; // 35% por frame a 60fps — más responsivo
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
                    // Fuera de pantalla por la derecha o por la izquierda
                    if (m.originX + m.tx > screenWidth || m.originX + m.tx < -60) {
                        m.element.remove();
                        activeMissiles.splice(i, 1);
                        continue;
                    }
                    m.element.style.transform = `translateX(${m.tx}px)`;
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

                // Nave ↔ dual-shoot packs (activar inmediatamente al capturar)
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
                        // Activar dual-shoot inmediatamente (dura hasta morir)
                        if (!dualShootActive) {
                            activateDualShoot();
                        }
                    }
                }

                // Actualizar posición de la línea guía dual-shoot
                if (dualShootActive && dualShootGuideEl) {
                    const guideBottom = spaceshipRect.bottom - gameContainer.getBoundingClientRect().top;
                    const guideY = guideBottom - spaceshipRect.height / 2;
                    dualShootGuideEl.style.top = guideY + 'px';
                }

                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Iniciar el game loop
            lastFrameTime = 0;
            gameLoopId = requestAnimationFrame(gameLoop);

            // ========== FIN GAME LOOP ==========

            // Función para disparar misil desde la posición actual de la nave
            function shootMissile() {
                if (gameOver || !gameStarted) return;
                // En god mode el disparo manual no gasta misiles (usa shootGodMissile)
                if (godModeActive) return;
                if (missileCount <= 0) return;

                missileCount--;
                missilesUsed++;
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
                activeMissiles.push({ element: missile, tx: 0, originX: startX, speed: fwdSpeed, direction: 1 });

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
                    activeMissiles.push({ element: backMissile, tx: 0, originX: backStartX, speed: 2, direction: -1 });
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
                    // Penalización: si la amenaza no fue destruida, restar 2 al contador
                    if (!hazardEntry.destroyed && !gameOver) {
                        cyberattackCount = Math.max(0, cyberattackCount - 2);
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
                // Nivel 1 ALERTA:      prob 0.08, cada 35s
                // Nivel 2 PELIGRO:     prob 0.14, cada 28s
                // Nivel 3 CRÍTICO:     prob 0.22, cada 22s
                // Nivel 4 EXTREMO:     prob 0.30, cada 18s
                // Nivel 5 APOCALIPSIS: prob 0.40, cada 14s
                const table = [
                    null,
                    { probability: 0.08, delay: 35000 },
                    { probability: 0.14, delay: 28000 },
                    { probability: 0.22, delay: 22000 },
                    { probability: 0.30, delay: 18000 },
                    { probability: 0.40, delay: 14000 }
                ];
                return table[level] || null;
            }

            // Spawning de life packs: similar a super capsule pero con sus propias probabilidades
            // Vidas son más valiosas → probabilidad ligeramente menor, pero mejora con dificultad
            function getLifePackParams() {
                const elapsed = (Date.now() - gameStartTime) / 1000;
                const level = getDifficultyLevel(elapsed);
                // Nivel 0 SEGURO:      no aparece (empiezas con vidas iniciales)
                // Nivel 1 ALERTA:      prob 0.06, cada 40s
                // Nivel 2 PELIGRO:     prob 0.10, cada 32s
                // Nivel 3 CRÍTICO:     prob 0.18, cada 25s
                // Nivel 4 EXTREMO:     prob 0.25, cada 20s
                // Nivel 5 APOCALIPSIS: prob 0.35, cada 15s
                const table = [
                    null,
                    { probability: 0.06, delay: 40000 },
                    { probability: 0.10, delay: 32000 },
                    { probability: 0.18, delay: 25000 },
                    { probability: 0.25, delay: 20000 },
                    { probability: 0.35, delay: 15000 }
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
                // Nivel 2 PELIGRO:     prob 0.08, cada 35s
                // Nivel 3 CRÍTICO:     prob 0.14, cada 28s
                // Nivel 4 EXTREMO:     prob 0.20, cada 22s
                // Nivel 5 APOCALIPSIS: prob 0.28, cada 16s
                const table = [
                    null,
                    null,
                    { probability: 0.08, delay: 35000 },
                    { probability: 0.14, delay: 28000 },
                    { probability: 0.20, delay: 22000 },
                    { probability: 0.28, delay: 16000 }
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

            // Activar modo dual-shoot (dura hasta que el jugador muere)
            function activateDualShoot() {
                if (dualShootActive) return; // Ya activo, ignorar
                dualShootActive = true;

                // Crear línea guía horizontal
                dualShootGuideEl = document.createElement('div');
                dualShootGuideEl.id = 'dual-shoot-guide';
                dualShootGuideEl.classList.add('dual-shoot-guide');
                gameContainer.appendChild(dualShootGuideEl);
            }

            function deactivateDualShoot() {
                if (!dualShootActive) return;
                dualShootActive = false;
                if (dualShootGuideEl) {
                    dualShootGuideEl.classList.add('dual-guide-fadeout');
                    const el = dualShootGuideEl;
                    setTimeout(() => el.remove(), 500);
                    dualShootGuideEl = null;
                }
            }

            // --- Actualizar UI de inventario unificado (super capsules, vidas, dual-shoot) ---
            function updateInventoryUI() {
                const scBtn = document.getElementById('inv-super');
                const scCount = document.getElementById('inv-super-count');
                const lifeBtn = document.getElementById('inv-life');
                const lifeCount = document.getElementById('inv-life-count');

                if (scBtn && scCount) {
                    scBtn.style.display = storedSuperCapsules > 0 ? 'flex' : 'none';
                    scCount.textContent = storedSuperCapsules;
                }
                if (lifeBtn && lifeCount) {
                    lifeBtn.style.display = storedLives > 0 ? 'flex' : 'none';
                    lifeCount.textContent = storedLives;
                }
            }

            // --- Handler del botón de usar super capsule (click/touch en inventario unificado) ---
            const invSuperBtn = document.getElementById('inv-super');
            if (invSuperBtn) {
                function useSuperCapsule(e) {
                    if (e) { e.preventDefault(); e.stopPropagation(); }
                    if (storedSuperCapsules <= 0 || godModeActive || gameOver || !gameStarted) return;
                    storedSuperCapsules--;
                    updateInventoryUI();
                    activateGodMode();
                }
                invSuperBtn.addEventListener('touchstart', useSuperCapsule, { passive: false });
                invSuperBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invSuperBtn.addEventListener('click', function(e) { e.stopPropagation(); useSuperCapsule(e); });
            }

            // --- Handler del botón de vida (no activa en gameplay, solo visual) ---
            const invLifeBtn = document.getElementById('inv-life');
            if (invLifeBtn) {
                invLifeBtn.addEventListener('touchstart', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invLifeBtn.addEventListener('touchend', function(e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
                invLifeBtn.addEventListener('click', function(e) { e.stopPropagation(); });
            }

            // Disparo gratuito (god mode) - no consume misiles
            function shootGodMissile() {
                if (gameOver || !gameStarted) return;

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
                    <h1 class="victory-title" style="color:${godRank.color};text-shadow:0 0 20px ${godRank.color}, 0 0 40px ${godRank.color}80;font-size:1.6em;animation:victoryPulse 1.5s ease-in-out infinite;">&#9733; VICTORIA TOTAL &#9733;</h1>
                    <p class="game-over-reason" style="color:#ffdd00;font-size:1.1em;">Has alcanzado el rango supremo</p>
                    <p class="player-result" style="font-size:1.2em;">Defensor: <strong>${playerName}</strong></p>
                    <p class="player-rank" style="color:${godRank.color};text-shadow:0 0 15px ${godRank.color}, 0 0 30px ${godRank.color}60;font-size:1.4em;margin:0.3em 0 0.6em;letter-spacing:2px;animation:victoryPulse 2s ease-in-out infinite;">&#9889; ${godRank.name} &#9889;</p>
                    <div class="stats-row">
                        <div class="stat-box">
                            <span class="stat-value" style="color:${godRank.color};">${cyberattackCount}</span>
                            <span class="stat-label">Amenazas Neutralizadas</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${elapsedSeconds}s</span>
                            <span class="stat-label">Tiempo de Misión</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${missileCount}</span>
                            <span class="stat-label">Misiles Restantes</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value" style="color:${maxLevelInfo.color};font-size:0.85em;">${maxLevelInfo.name}</span>
                            <span class="stat-label">Nivel Máximo</span>
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
                const invHudVictory = document.getElementById('inventory-hud');
                if (invHudVictory) invHudVictory.style.display = 'none';

                victoryOverlay.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (event.target && event.target.id === 'exit-button') {
                        window.close();
                        window.location.href = 'about:blank';
                    }
                    if (event.target && event.target.id === 'restart-game-button') {
                        resetGame();
                    }
                    if (event.target && event.target.id === 'clear-leaderboard-button') {
                        const pwd = prompt('Ingresa la clave de administrador:');
                        if (pwd === '66826682') {
                            localStorage.removeItem('cyberspace_leaderboard');
                            clearRemoteLeaderboard();
                            const lbContainer = document.getElementById('leaderboard-container');
                            if (lbContainer) {
                                lbContainer.innerHTML = '<h2>Leaderboard - Top 100</h2><p style="color:#88aacc;margin-top:10px;">Leaderboard limpiado</p>';
                            }
                        } else if (pwd !== null) {
                            alert('Clave incorrecta');
                        }
                    }
                });

                addToLeaderboard(playerName, cyberattackCount, elapsedSeconds).then(board => {
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.outerHTML = buildLeaderboardHTML(board);
                    }
                }).catch(err => {
                    console.warn('Error cargando leaderboard:', err);
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.innerHTML = '<p style="color:#ff6666;">Error cargando leaderboard</p>';
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

                // Limpiar arrays de entidades en pantalla
                activeHazards.length = 0;
                activePacks.length = 0;
                activeSuperCapsules.length = 0;
                activeLifePacks.length = 0;
                activeDualShootPacks.length = 0;
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

                // Restaurar controles móviles e inventario
                const isTouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
                const mobileCtrlCont = document.getElementById('mobile-controls');
                if (isTouchDev && mobileCtrlCont) mobileCtrlCont.style.display = 'flex';
                const invHud = document.getElementById('inventory-hud');
                if (invHud) invHud.style.display = 'flex';

                // Limpiar spawners anteriores
                clearTimeout(asteroidSpawnTimeout);
                clearInterval(distanceInterval);
                clearTimeout(ammoPackTimeout);
                clearTimeout(superCapsuleSpawnTimeout);
                clearTimeout(lifePackSpawnTimeout);
                clearTimeout(dualShootSpawnTimeout);

                // Reiniciar todos los spawners desde el inicio del nivel
                startDistanceCounter();
                startAsteroids();
                startAmmoPacks();
                startSuperCapsuleSpawner();
                startLifePackSpawner();
                startDualShootSpawner();

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
                // Detener god mode y dual-shoot si estaban activos
                deactivateGodMode();
                deactivateDualShoot();

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
                        <div class="buttons-container" style="margin-top:0.5em;gap:0.6em;flex-wrap:wrap;justify-content:center;">
                            <button id="continue-yes-btn" class="continue-btn continue-btn-yes">&#9654; Continuar</button>
                            <button id="continue-no-btn" class="continue-btn continue-btn-no">&#10006; Rendirse</button>
                        </div>
                    `;
                    gameContainer.appendChild(continueOverlay);

                    // Ocultar controles móviles e inventario durante el diálogo
                    const mobileCtrlCont = document.getElementById('mobile-controls');
                    if (mobileCtrlCont) mobileCtrlCont.style.display = 'none';
                    const invHud = document.getElementById('inventory-hud');
                    if (invHud) invHud.style.display = 'none';

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
                    <h1>Misión Finalizada</h1>
                    ${reason ? `<p class="game-over-reason">${reason}</p>` : ''}
                    <p class="player-result">Defensor: <strong>${playerName}</strong></p>
                    <p class="player-rank" style="color:${playerRank.color};text-shadow:0 0 10px ${playerRank.color}60;font-size:1.1em;margin:0.2em 0 0.5em;letter-spacing:1px;">&#9733; ${playerRank.name} &#9733;</p>
                    <div class="stats-row">
                        <div class="stat-box">
                            <span class="stat-value">${cyberattackCount}</span>
                            <span class="stat-label">Amenazas Neutralizadas</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${elapsedSeconds}s</span>
                            <span class="stat-label">Tiempo de Misión</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value">${missileCount}</span>
                            <span class="stat-label">Misiles Restantes</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-value" style="color:${maxLevelInfo.color};font-size:0.85em;">${maxLevelInfo.name}</span>
                            <span class="stat-label">Nivel Máximo</span>
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

                // Ocultar controles móviles e inventario en game over
                const mobileCtrlGO = document.getElementById('mobile-controls');
                if (mobileCtrlGO) mobileCtrlGO.style.display = 'none';
                const invHudGO = document.getElementById('inventory-hud');
                if (invHudGO) invHudGO.style.display = 'none';

                gameOverMessage.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (event.target && event.target.id === 'exit-button') {
                        window.close();
                        window.location.href = 'about:blank';
                    }
                    if (event.target && event.target.id === 'restart-game-button') {
                        resetGame();
                    }
                    if (event.target && event.target.id === 'clear-leaderboard-button') {
                        const pwd = prompt('Ingresa la clave de administrador:');
                        if (pwd === '66826682') {
                            localStorage.removeItem('cyberspace_leaderboard');
                            clearRemoteLeaderboard();
                            const lbContainer = document.getElementById('leaderboard-container');
                            if (lbContainer) {
                                lbContainer.innerHTML = '<h2>Leaderboard - Top 100</h2><p style="color:#88aacc;margin-top:10px;">Leaderboard limpiado</p>';
                            }
                        } else if (pwd !== null) {
                            alert('Clave incorrecta');
                        }
                    }
                });

                // Cargar leaderboard en segundo plano (no bloquea el UI)
                addToLeaderboard(playerName, cyberattackCount, elapsedSeconds).then(board => {
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.outerHTML = buildLeaderboardHTML(board);
                    }
                }).catch(err => {
                    console.warn('Error cargando leaderboard:', err);
                    const placeholder = document.getElementById('leaderboard-placeholder');
                    if (placeholder) {
                        placeholder.innerHTML = '<p style="color:#ff6666;">Error cargando leaderboard</p>';
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
                const haloEl = document.getElementById('god-mode-halo');
                if (haloEl) haloEl.remove();

                // Limpiar god mode y dual-shoot
                deactivateGodMode();
                deactivateDualShoot();
                activeSuperCapsules.length = 0;
                activeLifePacks.length = 0;
                activeDualShootPacks.length = 0;
                clearTimeout(superCapsuleSpawnTimeout);
                clearTimeout(lifePackSpawnTimeout);
                clearTimeout(dualShootSpawnTimeout);

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

                // Restaurar controles móviles e inventario
                const isTouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
                const mobileCtrlReset = document.getElementById('mobile-controls');
                if (isTouchDev && mobileCtrlReset) mobileCtrlReset.style.display = 'flex';
                const invHudReset = document.getElementById('inventory-hud');
                if (invHudReset) invHudReset.style.display = 'flex';

                // Reiniciar inventario (el jugador empieza con vidas extra de cortesía)
                storedSuperCapsules = 0;
                storedLives = INITIAL_EXTRA_LIVES;
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

            // Mostrar vidas iniciales en el HUD
            updateInventoryUI();

        } // fin de initGame

        // Iniciar con la pantalla de ingreso de alias
        initPlayerScreen();
    })();
