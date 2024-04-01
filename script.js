/* English Learning App

    Author: WattoX00
    Date:   25/02/2024
*/
document.addEventListener('DOMContentLoaded', function () {
    const resultLink = document.getElementById('showResultLink');
    resultLink.addEventListener('click', function (event) {
        event.preventDefault();
        displayStoredWords();
    });
    const footerContainer = document.getElementById('footerContainer');
    const footerArrow = document.getElementById('footerArrow');
    let isFooterVisible = true;

    footerArrow.addEventListener('mouseenter', function () {
        isFooterVisible = !isFooterVisible;
        toggleFooterVisibility();
    });

    footerContainer.addEventListener('click', function () {
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
    fetch(dictionaryUrl)
        .then(response => response.text())
        .then(content => {
            lines = content.split('\n');
            shuffleArray(lines);
            displayContent(lines[currentLineIndex]);

            startTime = new Date().getTime();
            timerInterval = setInterval(updateTimer, 1000);

            const welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.style.display = 'none';
            const userInput = document.getElementById('userInput');
            const outputContainer = document.getElementById('outputContainer');
            const showResultLink = document.getElementById('showResultLink');
            const wordCounter = document.getElementById('wordCounter');
            const timer = document.getElementById('timer');
            const output = document.getElementById('output');
            const previousWords = document.getElementById('previousWords');
            outputContainer.style.display = 'block';
            userInput.style.display = 'block';
            showResultLink.style.display = 'none';
            wordCounter.style.display = 'block'
            timer.style.display = 'block';
            output.style.display = 'block'
            previousWords.style.display = 'block';
        })
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
                const showResultLink = document.getElementById('showResultLink');
                showResultLink.style.display = 'block';
                lines = [];
                currentLineIndexStorage = currentLineIndex;
                correctCountStorage = correctCount;
                currentLineIndex = 0;
                correctCount = 0;
                const userInput = document.getElementById('userInput');
                const output = document.getElementById('output');
                const previousWords = document.getElementById('previousWords');
                userInput.style.display = 'none';
                output.style.display = 'none';
                previousWords.style.display = 'none';
                document.getElementById('userInput').value = '';
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
    let resultsHTML = '';
    storedWords.forEach((word, index) => {
        const wordNumber = index + 1;
        const wordClass = word.isCorrect ? 'correct' : 'incorrect';
        resultsHTML += `<div class="${wordClass}">${wordNumber}. ${word.hun} - ${word.eng}</div>`;
    });

    const resultWindow = window.open('');
    resultWindow.document.head.innerHTML = `
    <link rel="icon" type="image/x-icon" href="uk.png"/>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result</title>
        <style>
            body {
                background: #34495e;
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
            Total Words: ${currentLineIndexStorage}
            <br>Accuracy: ${accuracyPercentage}%
            <br>Elapsed Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
        </div>
        <div id="resultContainer">${resultsHTML}</div>
    `;
    localStorage.removeItem('storedWords');
    const userInput = document.getElementById('userInput');
    const outputContainer = document.getElementById('outputContainer');
    const wordCounter = document.getElementById('wordCounter');
    const timer = document.getElementById('timer');
    outputContainer.style.display = 'none';
    userInput.style.display = 'none';
    wordCounter.style.display = 'none'
    timer.style.display = 'none';
}
        function checkEnter() {
            if (event.key === 'Enter') {
                processNextLine();
            }
        }

function selectDictionary(dictionaryUrl) {
    loadDictionary(dictionaryUrl);
    toggleSlidingMenu()
}

function loadFileList() {
    const githubRepoUrl = 'https://api.github.com/repos/WattoX00/Eng_learning/contents/dictionaries';
    
    fetch(githubRepoUrl)
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; // Clear previous list items
        
        data.forEach(item => {
            if (item.type === 'dir') {
                // Create a list item for each directory
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#' + item.name;
                link.textContent = item.name;
                listItem.appendChild(link);
                fileList.appendChild(listItem);
            }
        });
        
        // Add event listener to dynamically created links
        fileList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                const selectedDirectory = link.textContent;
                loadTextFiles(selectedDirectory);
            });
        });
    })
}

function loadTextFiles(directory) {
    const githubRepoUrl = `https://api.github.com/repos/WattoX00/Eng_learning/contents/dictionaries/${directory}`;
    
    fetch(githubRepoUrl)
    .then(response => response.json())
    .then(data => {
        const textFileList = document.getElementById('textFileList');
        textFileList.innerHTML = ''; // Clear previous text file list items
        
        data.forEach(item => {
            if (item.type === 'file' && item.name.endsWith('.txt')) {
                // Create a list item for each text file
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = item.name;
                listItem.appendChild(link);
                textFileList.appendChild(listItem);
                
                // Add onclick attribute to call selectDictionary function
                link.setAttribute('onclick', `selectDictionary('${item.download_url}')`);
            }
        });
        
        // Show the text files container
        document.getElementById('textFilesContainer').style.display = 'block';
    })
    .catch(error => console.error('Error loading text files:', error));
}

function toggleSlidingMenu() {
    const slidingMenu = document.getElementById('slidingMenu');
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.innerHTML = "☰ Menu";
    slidingMenu.style.left = "0px";
    
    slidingMenu.style.display = slidingMenu.style.display === 'none' ? 'block' : 'none';
    if (slidingMenu.style.display === 'block') {
        menuToggle.innerHTML = "X Close";
        loadFileList();
    }
    document.getElementById('textFilesContainer').style.display = 'none';
}