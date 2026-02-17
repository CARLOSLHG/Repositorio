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
        function initPlayerScreen() {
            // Recuperar último alias usado
            const lastAlias = localStorage.getItem('cyberspace_last_alias') || '';
            if (lastAlias) {
                playerNameInput.value = lastAlias;
            }
            playerNameInput.focus();

            function startGame(e) {
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

                playerScreen.style.display = 'none';
                gameContainer.style.display = 'block';
                playerDisplay.textContent = `Defensor: ${playerName}`;
                gameStartTime = Date.now();
                gameStarted = true;
                initGame();
            }

            startGameButton.addEventListener('click', startGame);
            playerNameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                    startGame(e);
                }
            });
        }

        // --- Inicialización del juego (se ejecuta tras ingresar alias) ---
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
            let distanceInterval;
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

            // Movimiento táctil para móviles
            let isDragging = false;
            let startY = 0;
            let currentBottom = 0;

            spaceship.addEventListener('touchstart', function(event) {
                if (!gameOver && gameStarted) {
                    isDragging = true;
                    startY = event.touches[0].clientY;
                    currentBottom = parseInt(getComputedStyle(spaceship).bottom) || 0;
                }
            });

            document.addEventListener('touchmove', function(event) {
                if (isDragging && !gameOver) {
                    const containerHeight = gameContainer.clientHeight;
                    const touchY = event.touches[0].clientY;
                    const deltaY = startY - touchY;
                    const newBottom = currentBottom - deltaY;

                    spaceship.style.bottom = `${Math.max(0, Math.min(containerHeight - spaceship.clientHeight, newBottom))}px`;
                }
            });

            document.addEventListener('touchend', function() {
                isDragging = false;
            });

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
                missile.style.left = `${spaceshipRect.left - gameContainerRect.left + spaceshipRect.width}px`;

                gameContainer.appendChild(missile);

                const missileInterval = setInterval(() => {
                    const missileRect = missile.getBoundingClientRect();
                    missile.style.left = `${missileRect.left + 100}px`;

                    const cyberAttacks = document.querySelectorAll('.cyber-attack');
                    cyberAttacks.forEach(cyber => {
                        if (isCollision(missile, cyber) && !cyber.classList.contains('destroyed')) {
                            cyber.src = './img/exploit.png';
                            cyber.classList.add('destroyed');
                            setTimeout(() => cyber.remove(), 500);

                            cyberattackCount += 1;
                            cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;

                            clearInterval(missileInterval);
                            missile.remove();
                        }
                    });

                    // Colisión misil-pack: destruye el pack sin recolectarlo
                    const ammoPacks = document.querySelectorAll('.ammo-pack');
                    ammoPacks.forEach(pack => {
                        if (isCollision(missile, pack) && !pack.classList.contains('destroyed')) {
                            pack.innerHTML = '<img src="./img/exploit.png" style="width:100%;height:auto;">';
                            pack.classList.add('destroyed');
                            setTimeout(() => pack.remove(), 500);
                            clearInterval(missileInterval);
                            missile.remove();
                        }
                    });

                    if (missileRect.left > window.innerWidth) {
                        clearInterval(missileInterval);
                        missile.remove();
                    }
                }, 30);
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

            // Disparo con clic: ignorar clicks en botones y overlays
            document.addEventListener('click', function(e) {
                if (e.target.closest('button') || e.target.closest('#game-over-message') || e.target.closest('#player-screen')) return;
                shootBurst();
            });

            // Disparo automático en dispositivos táctiles cada segundo
            if ('ontouchstart' in window) {
                setInterval(shootBurst, 1500);
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

                asteroid.addEventListener('animationend', () => {
                    asteroidCount += 1;
                    asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;
                    asteroid.remove();
                });

                const collisionInterval = setInterval(() => {
                    if (isCollision(spaceship, asteroid) && !gameOver && !asteroid.classList.contains('destroyed')) {
                        clearInterval(collisionInterval);
                        gameOver = true;
                        showGameOverMessage();
                    }
                }, 50);
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

                const collisionInterval = setInterval(() => {
                    if (isCollision(spaceship, cyberAttack) && !gameOver && !cyberAttack.classList.contains('destroyed')) {
                        clearInterval(collisionInterval);
                        gameOver = true;
                        showGameOverMessage();
                    }
                }, 50);

                cyberAttack.addEventListener('animationend', () => {
                    cyberAttack.remove();
                    clearInterval(collisionInterval);
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

                // Detección de colisión para recolección
                const collisionCheck = setInterval(() => {
                    if (gameOver) {
                        clearInterval(collisionCheck);
                        return;
                    }
                    if (isCollision(spaceship, packEl) && !packEl.classList.contains('destroyed')) {
                        clearInterval(collisionCheck);
                        missileCount += selected.amount;
                        packsCollected++;
                        updateMissileDisplay();
                        // Efecto de recolección
                        packEl.classList.add('ammo-collected');
                        setTimeout(() => packEl.remove(), 400);
                    }
                }, 50);

                packEl.addEventListener('animationend', () => {
                    packEl.remove();
                    clearInterval(collisionCheck);
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
                spaceship.style.left = '50%';
                spaceship.style.transform = 'translate(-50%, 50%)';

                document.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());
                document.querySelectorAll('.cyber-attack').forEach(cyber => cyber.remove());
                document.querySelectorAll('.ammo-pack').forEach(pack => pack.remove());

                clearInterval(asteroidGenerationInterval);
                clearTimeout(ammoPackTimeout);
                startAsteroids();
                startAmmoPacks();
            }

            // Verificación de colisiones
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
