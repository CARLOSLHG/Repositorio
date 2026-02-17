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
            { amount: 25,  label: 'PATCH',    color: '#22cc66', probability: 0.50 },
            { amount: 50,  label: 'FIREWALL', color: '#00c8ff', probability: 0.30 },
            { amount: 75,  label: 'ENCRYPT',  color: '#ffaa00', probability: 0.15 },
            { amount: 100, label: 'ZERO-DAY', color: '#ff44ff', probability: 0.05 }
        ];

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
            if (board.length > 10) board.length = 10;
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
                date: new Date().toLocaleDateString()
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

        function buildLeaderboardHTML(board) {
            let rows = '';
            board.forEach((entry, i) => {
                const isCurrent = (entry.id === currentEntryId);
                const medal = i === 0 ? ' ★' : '';
                rows += `<tr class="${isCurrent ? 'current-player' : ''}">
                    <td>${i + 1}${medal}</td>
                    <td>${entry.name}</td>
                    <td>${entry.threats}</td>
                    <td>${entry.time}s</td>
                    <td>${entry.date}</td>
                </tr>`;
            });
            const modeLabel = jsonbinEnabled ? '🌐 Global' : '💻 Local';
            return `
                <div id="leaderboard-container">
                    <h2>Leaderboard - Top 10 <span style="font-size:0.6em;color:#5577aa;">${modeLabel}</span></h2>
                    <table id="leaderboard-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Defensor</th>
                                <th>Amenazas</th>
                                <th>Tiempo</th>
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

        function initGame() {
            // Añadir música al juego
            const audio = new Audio('./mp3/sound.mp3');
            audio.loop = true;
            audio.volume = 0.1;
            audio.play().catch(() => {});

            // Función para alternar música
            const toggleMusicButton = document.getElementById('toggle-music-button');
            function toggleMusic() {
                if (musicPlaying) {
                    audio.pause();
                    toggleMusicButton.textContent = 'Encender Música';
                } else {
                    audio.play().catch(() => {});
                    toggleMusicButton.textContent = 'Apagar Música';
                }
                musicPlaying = !musicPlaying;
            }

            // Botón para apagar/encender la música
            toggleMusicButton.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMusic();
            });

            // Tecla M para apagar/encender la música
            document.addEventListener('keydown', (e) => {
                if (e.key === 'm' || e.key === 'M') {
                    toggleMusic();
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

            // Incrementar la distancia recorrida cada segundo + chequeo de misiles
            function startDistanceCounter() {
                distanceInterval = setInterval(() => {
                    if (!gameOver) {
                        lightYears += 1;
                        distanceCounter.textContent = `Ciberpasos: ${lightYears}`;

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
            document.addEventListener('mousemove', function(event) {
                if (!gameOver && gameStarted) {
                    const containerHeight = gameContainer.clientHeight;
                    const mouseY = event.clientY;
                    const spaceshipHeight = spaceship.clientHeight;

                    const newBottom = containerHeight - mouseY - (spaceshipHeight / 2);
                    spaceship.style.bottom = `${Math.max(0, Math.min(containerHeight - spaceshipHeight, newBottom))}px`;
                }
            });

            // --- Controles táctiles para móviles (solo movimiento, disparo via botón) ---
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
            let touching = false;

            if (isTouchDevice) {
                // Posicionar nave en el primer cuarto de pantalla para mayor maniobrabilidad
                spaceship.style.left = '25%';

                function updateTouchTarget(touchY) {
                    const containerHeight = gameContainer.clientHeight;
                    const spaceshipHeight = spaceship.clientHeight;
                    const newBottom = containerHeight - touchY - (spaceshipHeight / 2);
                    touchTargetBottom = Math.max(0, Math.min(containerHeight - spaceshipHeight, newBottom));
                    // Primer toque: posicionar inmediatamente sin interpolación
                    if (!isTouchControlled) {
                        isTouchControlled = true;
                        shipCurrentBottom = touchTargetBottom;
                        spaceship.style.bottom = shipCurrentBottom + 'px';
                    }
                }

                gameContainer.addEventListener('touchstart', function(event) {
                    if (gameOver || !gameStarted) return;
                    if (event.target.closest('button') || event.target.closest('#game-over-message') || event.target.closest('#mobile-fire-button')) return;
                    event.preventDefault();
                    touching = true;
                    updateTouchTarget(event.touches[0].clientY);
                }, { passive: false });

                gameContainer.addEventListener('touchmove', function(event) {
                    if (!touching || gameOver || !gameStarted) return;
                    event.preventDefault();
                    updateTouchTarget(event.touches[0].clientY);
                }, { passive: false });

                gameContainer.addEventListener('touchend', function() {
                    touching = false;
                });

                gameContainer.addEventListener('touchcancel', function() {
                    touching = false;
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
                    return;
                }

                // Delta time normalizado a 60fps (dt=1 a 60fps, dt=2 a 30fps)
                const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.67, 3) : 1;
                lastFrameTime = timestamp;

                const screenWidth = window.innerWidth;

                // === MOBILE: Movimiento suave de la nave (interpolación lerp) ===
                if (isTouchControlled && touchTargetBottom >= 0) {
                    const smoothing = 0.18; // 18% por frame a 60fps
                    const lerpFactor = 1 - Math.pow(1 - smoothing, dt);
                    shipCurrentBottom += (touchTargetBottom - shipCurrentBottom) * lerpFactor;
                    // Snap cuando está muy cerca para evitar micro-movimientos infinitos
                    if (Math.abs(touchTargetBottom - shipCurrentBottom) < 0.5) {
                        shipCurrentBottom = touchTargetBottom;
                    }
                    spaceship.style.bottom = shipCurrentBottom + 'px';
                }

                // === MOBILE: Disparo con botón dedicado (sin auto-fire al tocar) ===
                // El disparo móvil se maneja via #mobile-fire-button (ver evento abajo)

                // === FASE WRITE: mover misiles con transform (NO dispara layout) ===
                for (let i = activeMissiles.length - 1; i >= 0; i--) {
                    const m = activeMissiles[i];
                    m.tx += 6 * dt;
                    if (m.originX + m.tx > screenWidth) {
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

                // === FASE COLLIDE: solo matemática, sin tocar el DOM ===

                // Misiles ↔ cyberattacks + packs
                for (let i = activeMissiles.length - 1; i >= 0; i--) {
                    const mR = activeMissiles[i]._r;
                    let hit = false;

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
                            hit = true;
                            break;
                        }
                    }

                    if (!hit) {
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

                // Nave ↔ hazards
                for (let i = 0; i < activeHazards.length; i++) {
                    const h = activeHazards[i];
                    if (h.destroyed || !h._r) continue;
                    if (!(spaceshipRect.top > h._r.bottom || spaceshipRect.bottom < h._r.top ||
                          spaceshipRect.right < h._r.left || spaceshipRect.left > h._r.right)) {
                        gameOver = true;
                        showGameOverMessage();
                        return;
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

                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Iniciar el game loop
            lastFrameTime = 0;
            gameLoopId = requestAnimationFrame(gameLoop);

            // ========== FIN GAME LOOP ==========

            // Función para disparar misil desde la posición actual de la nave
            function shootMissile() {
                if (gameOver || !gameStarted) return;
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

                const missile = document.createElement('img');
                missile.src = './img/missil.png';
                missile.classList.add('missile');

                const spaceshipRect = spaceship.getBoundingClientRect();
                const gameContainerRect = gameContainer.getBoundingClientRect();

                missile.style.position = 'absolute';
                const bottomVal = parseFloat(spaceship.style.bottom) || (gameContainerRect.height / 2);
                missile.style.bottom = `${bottomVal + spaceshipRect.height - 15}px`;
                const startX = spaceshipRect.left - gameContainerRect.left + spaceshipRect.width;
                missile.style.left = startX + 'px';

                gameContainer.appendChild(missile);

                // Registrar: tx=0 (translateX acumulado), originX para saber cuándo sale de pantalla
                activeMissiles.push({ element: missile, tx: 0, originX: startX });
            }

            // Ráfaga de misiles (máximo 5 por ráfaga)
            const BURST_MAX = 5;
            const BURST_DELAY = 100; // ms entre cada misil de la ráfaga
            let burstCooldown = false;

            function shootBurst() {
                if (gameOver || !gameStarted || burstCooldown) return;
                burstCooldown = true;
                const burstCount = Math.min(BURST_MAX, missileCount);
                for (let i = 0; i < burstCount; i++) {
                    setTimeout(() => shootMissile(), i * BURST_DELAY);
                }
                // Cooldown después de la ráfaga completa
                setTimeout(() => { burstCooldown = false; }, burstCount * BURST_DELAY + 300);
            }

            // Disparo con clic: solo en desktop
            if (!isTouchDevice) {
                document.addEventListener('click', function(e) {
                    if (e.target.closest('button') || e.target.closest('#game-over-message') || e.target.closest('#player-screen')) return;
                    shootBurst();
                });
            }

            // --- Botón de disparo dedicado para móviles ---
            const mobileFireBtn = document.getElementById('mobile-fire-button');
            if (isTouchDevice && mobileFireBtn) {
                // Mostrar el botón en dispositivos táctiles
                mobileFireBtn.style.display = 'flex';

                let fireHoldInterval = null;
                const FIRE_HOLD_DELAY = 700; // ms entre ráfagas al mantener presionado

                function startFiring() {
                    if (gameOver || !gameStarted) return;
                    // Disparar inmediatamente al presionar
                    shootBurst();
                    mobileFireBtn.classList.add('firing');
                    // Si mantiene presionado, disparar ráfagas continuas
                    if (fireHoldInterval) clearInterval(fireHoldInterval);
                    fireHoldInterval = setInterval(() => {
                        if (gameOver || !gameStarted) {
                            stopFiring();
                            return;
                        }
                        shootBurst();
                    }, FIRE_HOLD_DELAY);
                }

                function stopFiring() {
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

            // Función para generar un asteroide aleatorio
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
                asteroid.style.right = '-100px';

                gameContainer.appendChild(asteroid);

                const asteroidSpeed = Math.random() * 3 + 3;
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

            // Función para generar un "cyberattack"
            function createCyberAttack(type) {
                const cyberAttack = document.createElement('img');
                cyberAttack.src = type;
                cyberAttack.classList.add('cyber-attack');

                const bottomPosition = Math.floor(Math.random() * 80) + 10;
                cyberAttack.style.bottom = `${bottomPosition}%`;
                cyberAttack.style.right = '-100px';

                gameContainer.appendChild(cyberAttack);

                const cyberSpeed = Math.random() * 4 + 5;
                cyberAttack.style.animation = `moveCyberAttack ${cyberSpeed}s linear forwards`;

                // Registrar en el array para el game loop
                const hazardEntry = { element: cyberAttack, type: 'cyber', destroyed: false };
                activeHazards.push(hazardEntry);

                cyberAttack.addEventListener('animationend', () => {
                    cyberAttack.remove();
                    const idx = activeHazards.indexOf(hazardEntry);
                    if (idx !== -1) activeHazards.splice(idx, 1);
                });
            }

            // --- Crear pack de munición con SVG de escudo ---
            function createAmmoPack() {
                if (gameOver) return;

                // Seleccionar tipo basado en probabilidad
                const rand = Math.random();
                let cumulative = 0;
                let selected = AMMO_PACK_TYPES[0];
                for (const pack of AMMO_PACK_TYPES) {
                    cumulative += pack.probability;
                    if (rand <= cumulative) {
                        selected = pack;
                        break;
                    }
                }

                const packEl = document.createElement('div');
                packEl.classList.add('ammo-pack', `ammo-pack-${selected.amount}`);
                packEl.dataset.amount = selected.amount;

                // SVG escudo con cantidad y etiqueta
                packEl.innerHTML = `
                    <svg viewBox="0 0 80 90" class="ammo-svg">
                        <path d="M40 5 L70 20 L70 50 Q70 75 40 85 Q10 75 10 50 L10 20 Z"
                              fill="${selected.color}22" stroke="${selected.color}" stroke-width="2.5"/>
                        <text x="40" y="42" text-anchor="middle" fill="#ffffff"
                              font-size="18" font-weight="bold" font-family="Arial">+${selected.amount}</text>
                        <text x="40" y="62" text-anchor="middle" fill="${selected.color}"
                              font-size="9" font-weight="bold" font-family="Arial"
                              letter-spacing="1">${selected.label}</text>
                    </svg>
                `;

                const bottomPosition = Math.floor(Math.random() * 70) + 15;
                packEl.style.bottom = `${bottomPosition}%`;
                packEl.style.right = '-100px';

                gameContainer.appendChild(packEl);

                const packSpeed = Math.random() * 3 + 4;
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

            // --- Spawning progresivo de packs (cada vez más escasos) ---
            function startAmmoPacks() {
                const baseDelay = 12000;     // 12s al inicio
                const maxDelay = 45000;      // Máximo 45s entre packs
                const msPerSecond = 50;      // +50ms de delay por cada segundo jugado (~3s extra por minuto)

                function getSpawnDelay() {
                    const elapsed = (Date.now() - gameStartTime) / 1000; // segundos jugados
                    return Math.min(maxDelay, baseDelay + elapsed * msPerSecond);
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

            // Mostrar mensaje de "Game Over" con leaderboard
            function showGameOverMessage(reason) {
                // Detener el game loop
                if (gameLoopId) {
                    cancelAnimationFrame(gameLoopId);
                    gameLoopId = null;
                }

                const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);

                // Crear el overlay de Game Over INMEDIATAMENTE (sin esperar async)
                const gameOverMessage = document.createElement('div');
                gameOverMessage.id = 'game-over-message';
                gameOverMessage.innerHTML = `
                    <h1>Misión Finalizada</h1>
                    ${reason ? `<p class="game-over-reason">${reason}</p>` : ''}
                    <p class="player-result">Defensor: <strong>${playerName}</strong></p>
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
                    </div>
                    <div id="leaderboard-placeholder"><p style="color:#88aacc;">Cargando leaderboard...</p></div>
                    <div class="buttons-container">
                        <button id="exit-button">Salir</button>
                        <button id="restart-game-button">Reiniciar Juego</button>
                        <button id="clear-leaderboard-button">Limpiar Leaderboard</button>
                    </div>
                `;
                gameContainer.appendChild(gameOverMessage);

                // Mostrar cursor en game over para poder usar botones
                gameContainer.style.cursor = 'default';

                // Ocultar botón de disparo móvil en game over
                const fireBtn = document.getElementById('mobile-fire-button');
                if (fireBtn) fireBtn.style.display = 'none';

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
                                lbContainer.innerHTML = '<h2>Leaderboard - Top 10</h2><p style="color:#88aacc;margin-top:10px;">Leaderboard limpiado</p>';
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

                spaceship.style.bottom = '50%';
                spaceship.style.left = '25%';
                spaceship.style.transform = 'translate(-50%, 50%)';

                document.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());
                document.querySelectorAll('.cyber-attack').forEach(cyber => cyber.remove());
                document.querySelectorAll('.ammo-pack').forEach(pack => pack.remove());
                document.querySelectorAll('.missile').forEach(m => m.remove());

                // Limpiar arrays de entidades
                activeMissiles.length = 0;
                activeHazards.length = 0;
                activePacks.length = 0;

                // Reiniciar estado táctil
                touchTargetBottom = -1;
                shipCurrentBottom = -1;
                isTouchControlled = false;
                lastMobileFireTime = 0;

                // Restaurar botón de disparo móvil si es touch device
                const isTouchDev = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
                const fireBtnReset = document.getElementById('mobile-fire-button');
                if (isTouchDev && fireBtnReset) fireBtnReset.style.display = 'flex';

                clearInterval(asteroidGenerationInterval);
                clearInterval(distanceInterval);
                clearTimeout(ammoPackTimeout);

                // Reiniciar loops
                lastFrameTime = 0;
                startDistanceCounter();
                startAsteroids();
                startAmmoPacks();
                gameLoopId = requestAnimationFrame(gameLoop);
            }

            // Iniciar la creación de asteroides y cyberattacks
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

                asteroidGenerationInterval = setInterval(() => {
                    if (!gameOver) {
                        const randomAsteroid = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
                        createAsteroid(randomAsteroid, false);

                        if (Math.random() < 0.4) {
                            const randomCyber = cyberAttackImages[Math.floor(Math.random() * cyberAttackImages.length)];
                            createCyberAttack(randomCyber);
                        }
                    }
                }, 1500);
            }

            startAsteroids();
            startAmmoPacks();

        } // fin de initGame

        // Iniciar con la pantalla de ingreso de alias
        initPlayerScreen();
    })();
