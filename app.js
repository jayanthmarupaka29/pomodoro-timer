
        // [Previous JavaScript code remains the same]
        function createSnow() {
            const snowContainer = document.getElementById('snow');
            const numberOfSnowflakes = 100;
            
            snowContainer.innerHTML = '';

            for (let i = 0; i < numberOfSnowflakes; i++) {
                createSnowflake(snowContainer);
            }
        }

        function createSnowflake(container) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snow-particle';
            
            const size = Math.random() * 3 + 2;
            const startPosition = Math.random() * 100;
            const duration = Math.random() * 8 + 12;
            const delay = Math.random() * 5;
            
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${startPosition}%`;
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.animationDelay = `-${delay}s`;
            
            container.appendChild(snowflake);
            
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
                createSnowflake(container);
            });
        }

        let timer;
        let minutes = 25;
        let seconds = 0;
        let isPaused = true;
        let originalTime = 25;

        const minutesDisplay = document.getElementById('minutes');
        const secondsDisplay = document.getElementById('seconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const customTimeInput = document.getElementById('customTime');
        const setTimeBtn = document.getElementById('setTimeBtn');

        function startTimer() {
            if (isPaused) {
                isPaused = false;
                timer = setInterval(updateTimer, 1000);
                startBtn.textContent = 'Running';
                startBtn.disabled = true;
            }
        }

        function updateTimer() {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    minutesDisplay.textContent = '00';
                    secondsDisplay.textContent = '00';
                    alert('Time is up! Take a break.');
                    resetTimer();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }

        function updateDisplay() {
            minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        function pauseTimer() {
            if (!isPaused) {
                clearInterval(timer);
                isPaused = true;
                startBtn.textContent = 'Start';
                startBtn.disabled = false;
            }
        }

        function resetTimer() {
            clearInterval(timer);
            isPaused = true;
            minutes = originalTime;
            seconds = 0;
            updateDisplay();
            startBtn.textContent = 'Start';
            startBtn.disabled = false;
        }

        function setCustomTime() {
            const newTime = parseInt(customTimeInput.value);
            if (newTime && newTime > 0 && newTime <= 60) {
                originalTime = newTime;
                minutes = newTime;
                seconds = 0;
                updateDisplay();
                customTimeInput.value = '';
            } else {
                alert('Please enter a valid time between 1 and 60 minutes.');
            }
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        setTimeBtn.addEventListener('click', setCustomTime);

        createSnow();
        updateDisplay();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.getElementById('snow').innerHTML = '';
            } else {
                createSnow();
            }
        });