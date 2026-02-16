    (function() {
        // Versión 2.0 - Alias de jugador + Leaderboard
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

        // --- Leaderboard en localStorage ---
        function getLeaderboard() {
            try {
                return JSON.parse(localStorage.getItem('cyberspace_leaderboard')) || [];
            } catch (e) {
                return [];
            }
        }

        function saveLeaderboard(board) {
            localStorage.setItem('cyberspace_leaderboard', JSON.stringify(board));
        }

        function addToLeaderboard(name, threats, time) {
            const board = getLeaderboard();
            const entryId = Date.now().toString();
            board.push({ id: entryId, name: name, threats: threats, time: time, date: new Date().toLocaleDateString() });
            // Ordenar por amenazas neutralizadas (mayor a menor), luego por tiempo (mayor a menor)
            board.sort((a, b) => b.threats - a.threats || b.time - a.time);
            // Mantener solo los 10 mejores
            if (board.length > 10) board.length = 10;
            saveLeaderboard(board);
            currentEntryId = entryId;
            return board;
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
            return `
                <div id="leaderboard-container">
                    <h2>Leaderboard - Top 10</h2>
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

            // Botón para apagar/encender la música
            const toggleMusicButton = document.getElementById('toggle-music-button');
            toggleMusicButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (musicPlaying) {
                    audio.pause();
                    toggleMusicButton.textContent = 'Encender Música';
                } else {
                    audio.play().catch(() => {});
                    toggleMusicButton.textContent = 'Apagar Música';
                }
                musicPlaying = !musicPlaying;
            });

            const distanceCounter = document.getElementById('distance-counter');
            distanceCounter.textContent = `Ciberpasos: ${lightYears}`;

            const asteroidCounter = document.getElementById('asteroid-counter');
            asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;

            const cyberattackCounter = document.getElementById('cyberattack-counter');
            cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;

            // Incrementar la distancia recorrida cada segundo
            let distanceInterval;
            function startDistanceCounter() {
                distanceInterval = setInterval(() => {
                    if (!gameOver) {
                        lightYears += 1;
                        distanceCounter.textContent = `Ciberpasos: ${lightYears}`;
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

                    if (missileRect.left > window.innerWidth) {
                        clearInterval(missileInterval);
                        missile.remove();
                    }
                }, 30);
            }

            // Disparo con clic: ignorar clicks en botones y overlays
            document.addEventListener('click', function(e) {
                if (e.target.closest('button') || e.target.closest('#game-over-message') || e.target.closest('#player-screen')) return;
                shootMissile();
            });

            // Disparo automático en dispositivos táctiles cada segundo
            if ('ontouchstart' in window) {
                setInterval(shootMissile, 1000);
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

            // Mostrar mensaje de "Game Over" con leaderboard
            function showGameOverMessage() {
                const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
                const board = addToLeaderboard(playerName, cyberattackCount, elapsedSeconds);
                const leaderboardHTML = buildLeaderboardHTML(board);

                const gameOverMessage = document.createElement('div');
                gameOverMessage.id = 'game-over-message';
                gameOverMessage.innerHTML = `
                    <h1>Misión Finalizada</h1>
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
                    </div>
                    ${leaderboardHTML}
                    <div class="buttons-container">
                        <button id="exit-button">Salir</button>
                        <button id="restart-game-button">Reiniciar Juego</button>
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
                gameStartTime = Date.now();
                currentEntryId = null;
                distanceCounter.textContent = `Ciberpasos: ${lightYears}`;
                asteroidCounter.textContent = `Paquetes Basura: ${asteroidCount}`;
                cyberattackCounter.textContent = `Amenazas Neutralizadas: ${cyberattackCount}`;

                spaceship.style.bottom = '50%';
                spaceship.style.left = '50%';
                spaceship.style.transform = 'translate(-50%, 50%)';

                document.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());
                document.querySelectorAll('.cyber-attack').forEach(cyber => cyber.remove());

                clearInterval(asteroidGenerationInterval);
                startAsteroids();
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

        } // fin de initGame

        // Iniciar con la pantalla de ingreso de alias
        initPlayerScreen();
    })();
