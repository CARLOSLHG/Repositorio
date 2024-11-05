    (function() {
        // Versión 2.2.1
        const gameContainer = document.getElementById('game-container');
        const spaceship = document.getElementById('spaceship');
        let gameOver = false;
        let lightYears = 0;
        let asteroidCount = 0;
        let cyberattackCount = 0;
        let musicPlaying = true; // Iniciar con la música encendida
        let asteroidIntervals = []; // Guardar intervalos de asteroides para reinicio limpio
        let asteroidGenerationInterval; // Guardar el intervalo de generación de asteroides

        // Añadir música al juego
        const audio = new Audio('http://test3.futuremarketing.es/wp-content/uploads/2024/10/byte-blast-8-bit-arcade-music-background-music-for-video-24-second-208776.mp3');
        audio.loop = true;
        audio.volume = 0.1;
        audio.play(); // La música comienza encendida

        // Botón para apagar/encender la música
        const toggleMusicButton = document.getElementById('toggle-music-button');
        toggleMusicButton.addEventListener('click', () => {
            if (musicPlaying) {
                audio.pause();
                toggleMusicButton.textContent = 'Encender Música';
            } else {
                audio.play();
                toggleMusicButton.textContent = 'Apagar Música';
            }
            musicPlaying = !musicPlaying;
        });

        const distanceCounter = document.getElementById('distance-counter');
        distanceCounter.textContent = `Años Luz de distancia: ${lightYears}`;

        const asteroidCounter = document.getElementById('asteroid-counter');
        asteroidCounter.textContent = `Número de asteroides: ${asteroidCount}`;

        const cyberattackCounter = document.getElementById('cyberattack-counter');
        cyberattackCounter.textContent = `Ataques repelidos: ${cyberattackCount}`;

        // Incrementar la distancia recorrida cada segundo
        let distanceInterval;
        function startDistanceCounter() {
            distanceInterval = setInterval(() => {
                if (!gameOver) {
                    lightYears += 1;
                    distanceCounter.textContent = `Años Luz de distancia: ${lightYears}`;
                }
            }, 1000);
        }

        startDistanceCounter();

        // Movimiento de la nave con el mouse para desktop
        document.addEventListener('mousemove', function(event) {
            if (!gameOver) {
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
            if (!gameOver) {
                isDragging = true;
                startY = event.touches[0].clientY;
                currentBottom = parseInt(getComputedStyle(spaceship).bottom);
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
            if (gameOver) return;

            const missile = document.createElement('img');
            missile.src = 'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-142.png';
            missile.classList.add('missile');

            const spaceshipRect = spaceship.getBoundingClientRect();
            const gameContainerRect = gameContainer.getBoundingClientRect();

            // Ajuste preciso para que el misil salga desde la punta de la nave
            missile.style.position = 'absolute';
            
            // Calcular la posición precisa en relación al contenedor del juego
            missile.style.bottom = `${parseFloat(spaceship.style.bottom) + spaceshipRect.height - 15}px`; // Ajuste para que salga de la punta
            missile.style.left = `${spaceshipRect.left - gameContainerRect.left + spaceshipRect.width}px`; // Sale desde el frente de la nave

            gameContainer.appendChild(missile);

            const missileInterval = setInterval(() => {
                const missileRect = missile.getBoundingClientRect();
                missile.style.left = `${missileRect.left + 12}px`; // Incrementa la posición del misil

                // Verificar colisiones con "cyberattacks"
                const cyberAttacks = document.querySelectorAll('.cyber-attack');
                cyberAttacks.forEach(cyber => {
                    if (isCollision(missile, cyber) && !cyber.classList.contains('destroyed')) {
                        cyber.src = 'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-143.png';
                        cyber.classList.add('destroyed');
                        setTimeout(() => cyber.remove(), 500); // Eliminar después de mostrar la imagen destruida

                        cyberattackCount += 1;
                        cyberattackCounter.textContent = `Ataques repelidos: ${cyberattackCount}`;

                        clearInterval(missileInterval);
                        missile.remove();
                    }
                });

                // Eliminar misil si se sale del contenedor
                if (missileRect.left > window.innerWidth) {
                    clearInterval(missileInterval);
                    missile.remove();
                }
            }, 30);
        }

        // Disparo con clic en dispositivos de escritorio
        document.addEventListener('click', shootMissile);

        // Disparo automático en dispositivos táctiles cada segundo
        if ('ontouchstart' in window) {
            setInterval(shootMissile, 1000);
        }

        // Función para generar un asteroide aleatorio
        function createAsteroid(src, isBottom) {
            const asteroid = document.createElement('img');
            asteroid.src = src;
            asteroid.classList.add('asteroid');

            const bottomPosition = isBottom ? 0 : Math.floor(Math.random() * 80) + 10;
            asteroid.style.bottom = `${bottomPosition}%`;
            asteroid.style.right = '-100px';

            gameContainer.appendChild(asteroid);

            const asteroidSpeed = Math.random() * 3 + 3; // Aumentado ligeramente la velocidad
            asteroid.style.animation = `moveAsteroid ${asteroidSpeed}s linear forwards`;

            // Actualizar el contador de asteroides cuando un asteroide pasa la nave
            asteroid.addEventListener('animationend', () => {
                asteroidCount += 1;
                asteroidCounter.textContent = `Número de asteroides: ${asteroidCount}`;
                asteroid.remove();
            });

            // Restaurar la funcionalidad para finalizar el juego al tocar la nave
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

            // Terminar el juego si un cyberattack toca la nave
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

        // Mostrar mensaje de "Game Over"
        function showGameOverMessage() {
            const gameOverMessage = document.createElement('div');
            gameOverMessage.id = 'game-over-message';
            gameOverMessage.innerHTML = `
                <h1 style="color: #F3F3F3;">¡Gracias por participar!</h1>
                <div class="buttons-container">
                    <button id="restart-button">Volver</button>
                    <button id="restart-game-button">Reiniciar Juego</button>
                </div>
            `;
            gameContainer.appendChild(gameOverMessage);

            // Asignar eventos a los botones con delegación para evitar problemas de eventos inactivos
            gameContainer.addEventListener('click', function(event) {
                if (event.target && event.target.id === 'restart-button') {
                    sessionStorage.removeItem('accesoPermitido');
                    window.location.href = 'https://carloslhg.github.io/Repositorio/HTML%20CSS%20&%20JS%20Projects/';
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
            lightYears = 0;
            asteroidCount = 0;
            cyberattackCount = 0;
            distanceCounter.textContent = `Años Luz de distancia: ${lightYears}`;
            asteroidCounter.textContent = `Número de asteroides: ${asteroidCount}`;
            cyberattackCounter.textContent = `Ataques repelidos: ${cyberattackCount}`;

            // Reiniciar la posición de la nave al centro
            spaceship.style.bottom = '50%';
            spaceship.style.left = '50%';
            spaceship.style.transform = 'translate(-50%, 50%)';

            // Eliminar todos los asteroides visibles
            document.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());
            document.querySelectorAll('.cyber-attack').forEach(cyber => cyber.remove());

            // Detener y reiniciar la generación de asteroides
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

        // Iniciar la creación de asteroides y cyberattacks al cargar la página
        function startAsteroids() {
            const asteroidImages = [
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-114.png',
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-113.png',
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-112.png',
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-111.png'
            ];

            const cyberAttackImages = [
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-139.png',
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-138.png',
                'http://test3.futuremarketing.es/wp-content/uploads/2024/10/Recurso-137.png'
            ];

            asteroidGenerationInterval = setInterval(() => {
                if (!gameOver) {
                    // Generar más asteroides aumentando la frecuencia
                    const randomAsteroid = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
                    createAsteroid(randomAsteroid, false);

                    if (Math.random() < 0.4) { // Probabilidad del 40% de generar un "cyberattack"
                        const randomCyber = cyberAttackImages[Math.floor(Math.random() * cyberAttackImages.length)];
                        createCyberAttack(randomCyber);
                    }
                }
            }, 1500); // Generación más frecuente
        }

        startAsteroids(); // Inicia la generación de asteroides y ataques
    })();

