document.addEventListener('DOMContentLoaded', function () {
    const resultLink = document.getElementById('showResultLink');
    resultLink.addEventListener('click', function (event) {
        event.preventDefault();
        displayStoredWords();
    });
    const footerContainer = document.getElementById('footerContainer');
    const footerArrow = document.getElementById('footerArrow');
    let isFooterVisible = false;

    footerArrow.addEventListener('click', function () {
        isFooterVisible = !isFooterVisible;
        toggleFooterVisibility();
    });

    footerContainer.addEventListener('mouseenter', function () {
        isFooterVisible = true;
        toggleFooterVisibility();
    });

    footerContainer.addEventListener('mouseleave', function () {
        isFooterVisible = false;
        toggleFooterVisibility();
    });

    function toggleFooterVisibility() {
        footerContainer.classList.toggle('active', isFooterVisible);
        footerArrow.classList.toggle('hidden', isFooterVisible);
    }
    function displayStoredWords() {
        const storedWords = JSON.parse(localStorage.getItem('storedWords')) || [];

        const accuracyPercentage = ((correctCount / currentLineIndex) * 100).toFixed(2);

        const resultsHTML = storedWords.map(word => {
            return `<div class="${word.isCorrect ? 'correct' : 'incorrect'}">${word.hun} - ${word.eng}</div>`;
        }).join('');

        localStorage.removeItem('storedWords');
    }


});
    let lines;
    let currentLineIndexStorage = 0;
    let correctCountStorage = 0;
    let currentLineIndex = 0;
    let correctCount = 0;
    let startTime;
    let timerInterval;

function loadDictionary(dictionaryUrl) {
    const fileInput = document.getElementById('fileInputSubmenu');
    fetch(dictionaryUrl)
        .then(response => response.text())
        .then(content => {
            lines = content.split('\n');
            shuffleArray(lines);
            displayContent(lines[currentLineIndex]);

            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 1000);

            const userInput = document.getElementById('userInput');
            userInput.style.display = 'block';
        })
        .catch(error => console.error('Error loading dictionary:', error));
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function readFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            lines = content.split('\n');
            shuffleArray(lines);
            displayContent(lines[currentLineIndex]);
            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 1000);

            const userInput = document.getElementById('userInput');
            userInput.style.display = 'block';
            userInput.value = '';
        };
        reader.readAsText(file);
    }
}

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function displayContent(content) {
            const outputDiv = document.getElementById('output');
            const previousWordsDiv = document.getElementById('previousWords');
            const words = content.split('/');
            outputDiv.textContent = `${words[0]} - `;
            const previousLine = currentLineIndex > 0 ? lines[currentLineIndex - 1] : '';
            previousWordsDiv.textContent = `${formatPreviousWords(previousLine)}`;

            previousWordsDiv.classList.remove('correct', 'incorrect');
            if (previousLine && isPreviousLineCorrect(previousLine)) {
                previousWordsDiv.classList.add('correct');
            } else {
                previousWordsDiv.classList.add('incorrect');
            }
            document.getElementById('wordCounter').textContent = `${currentLineIndex + 1}/${correctCount}`;
        }

        function formatPreviousWords(line) {
            if (!line) return '';
            const words = line.split('/');
            const hun = words[0].trim();
            const eng = words[1].replace(';', '').trim();
            return `${hun} - ${eng}`;
        }

        function isPreviousLineCorrect(line) {
            const words = line.split('/');
            const expectedTranslation = words[1].replace(';', '').trim();
            return document.getElementById('userInput').value.toLowerCase() === expectedTranslation.toLowerCase();
        }

        function processNextLine() {
    const userInput = document.getElementById('userInput').value;
    const currentLine = lines[currentLineIndex];

    if (currentLine) {
        const words = currentLine.split('/');
        const expectedTranslation = words[1].replace(';', '').trim();
        const isCorrect = userInput.toLowerCase() === expectedTranslation.toLowerCase();

        const storedWords = JSON.parse(localStorage.getItem('storedWords')) || [];
        storedWords.push({
            hun: words[0].trim(),
            eng: expectedTranslation,
            isCorrect: isCorrect
        });
        localStorage.setItem('storedWords', JSON.stringify(storedWords));

        if (isCorrect) {
            correctCount++;
        }
        currentLineIndex++;

        if (currentLineIndex < lines.length) {
            displayContent(lines[currentLineIndex]);
            document.getElementById('userInput').value = '';
        } else {
            if (currentLineIndex === lines.length) {
                clearInterval(timerInterval);
                updateTimer();    
                const resultLink = document.getElementById('showResultLink');
                resultLink.classList.add('unhidden');
                lines = [];
                currentLineIndexStorage = currentLineIndex;
                correctCountStorage = correctCount;
                currentLineIndex = 0;
                correctCount = 0;
            }
        }
    }
}
function displayStoredWords() {
    const storedWords = JSON.parse(localStorage.getItem('storedWords')) || [];

    const accuracyPercentage = currentLineIndexStorage === 0 ? 0 : ((correctCountStorage / currentLineIndexStorage) * 100).toFixed(2);

    const elapsedTimeInSeconds = Math.floor((new Date().getTime() - startTime) / 1000);
    const minutes = Math.floor(elapsedTimeInSeconds / 60);
    const seconds = elapsedTimeInSeconds % 60;

    const resultsHTML = storedWords.map(word => {
        return `<div class="${word.isCorrect ? 'correct' : 'incorrect'}">${word.hun} - ${word.eng}</div>`;
    }).join('');

    const resultWindow = window.open('');
    resultWindow.document.head.innerHTML = `
    <link rel="icon" type="image/x-icon" href="uk.png" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result</title>
        <style>
            body {
                background: #000;
                color: #fff;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            }

            h1 {
                color: #ffd700;
            }

            .accuracy-info {
                margin-bottom: 20px;
            }

            .correct {
                color: #00ff00;
                font-weight: bold;
            }

            .incorrect {
                color: #ff0000;
            }
        </style>
    `;

    resultWindow.document.body.innerHTML = `   
        <h1>Results</h1>
        <div class="accuracy-info">
            <br>Accuracy: ${accuracyPercentage}%
            <br>Elapsed Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
        </div>
        <div id="resultContainer">${resultsHTML}</div>
    `;

    localStorage.removeItem('storedWords');
}
        function checkEnter() {
            if (event.key === 'Enter') {
                processNextLine();
            }
        }
        function toggleSlidingMenu() {
    const slidingMenu = document.getElementById('slidingMenu');
    const menuToggle = document.getElementById('menuToggle');
    const menuLinks = document.getElementById('menuLinks');

    if (slidingMenu.style.left === "0px") {
        slidingMenu.style.left = "-120%";
        menuToggle.innerHTML = "☰ Menu";

        const allMenuLinks = document.querySelectorAll('#menuLinks li');
        allMenuLinks.forEach(link => {
            link.classList.remove('hidden-menu');
        });
    } else {
        slidingMenu.style.left = "0px";
        menuToggle.innerHTML = "✕ Close";
    }
}
function showSubMenu(menu) {
    const nonSelectedMenus = document.querySelectorAll('.submenu:not(#' + menu + 'Submenu)');
    nonSelectedMenus.forEach(menu => {
        menu.classList.add('hidden-menu');
        const allMenuLinks = document.querySelectorAll('#menuLinks li');
        allMenuLinks.forEach(link => {
            link.classList.remove('hidden-menu');
        });
    });

    const selectedSubmenu = document.getElementById(`${menu}Submenu`);
    const isSubmenuVisible = selectedSubmenu.classList.toggle('show', !selectedSubmenu.classList.contains('show'));

    const menuLinks = document.getElementById('menuLinks');
    const selectedMenuItem = document.querySelector(`#menuLinks li a[href="#"][onclick*="${menu}"]`);
    menuLinks.insertBefore(selectedMenuItem.parentElement, menuLinks.firstChild);

    const menuLinksVisibility = isSubmenuVisible ? 'hidden-menu' : '';
    const allMenuLinks = document.querySelectorAll('#menuLinks li');
    allMenuLinks.forEach(link => {
        if (link !== selectedMenuItem.parentElement) {
            link.classList.toggle(menuLinksVisibility, true);
        }
    });
}

function selectDictionary(dictionaryUrl) {
    hideAllSubmenus();
    loadDictionary(dictionaryUrl);
}

function hideAllSubmenus() {
    const allSubmenus = document.querySelectorAll('.submenu');
    allSubmenus.forEach(submenu => {
        submenu.classList.remove('show');
    });

    const allMenuLinks = document.querySelectorAll('#menuLinks li');
    allMenuLinks.forEach(link => {
        link.classList.remove('hidden-menu');
    });
    toggleSlidingMenu()
}
