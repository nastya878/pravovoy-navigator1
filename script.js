// ==========================================
// ПРАВОВОЙ НАВИГАТОР — ИГРОВАЯ СИСТЕМА
// ==========================================

const STORAGE_KEY = "pravovoyNavigatorGame";

const defaultProgress = {
    coins: 0,
    keys: [],
    completed: []
};

let progress = loadProgress();

function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (saved) {
            return {
                coins: Number(saved.coins) || 0,
                keys: Array.isArray(saved.keys) ? saved.keys : [],
                completed: Array.isArray(saved.completed)
                    ? saved.completed
                    : []
            };
        }
    } catch (error) {
        console.warn("Не удалось загрузить прогресс:", error);
    }

    return { ...defaultProgress };
}

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ==========================================
// ВОПРОСЫ ПЯТИ ТЕРРИТОРИЙ
// ==========================================

const challenges = {

    1: {
        title: "АКАДЕМИЯ ПРАВА",
        questions: [
            {
                question: "Что такое государство?",
                answers: [
                    "Организация политической власти на определённой территории",
                    "Любая общественная организация",
                    "Только группа людей"
                ],
                correct: 0,
                explanation: "Государство организует публичную власть и действует в пределах определённой территории."
            },
            {
                question: "Что такое право?",
                answers: [
                    "Совокупность общественных обычаев",
                    "Система общеобязательных правил, установленных или признанных государством",
                    "Личное мнение человека"
                ],
                correct: 1,
                explanation: "Право регулирует общественные отношения с помощью общеобязательных норм."
            },
            {
                question: "Как называется основной закон государства?",
                answers: [
                    "Указ",
                    "Постановление",
                    "Конституция"
                ],
                correct: 2,
                explanation: "Конституция обладает высшей юридической силой в системе законодательства."
            }
        ]
    },

    2: {
        title: "КОНСТИТУЦИОННЫЙ ДВОРЕЦ",
        questions: [
            {
                question: "Как называется основной закон Республики Казахстан?",
                answers: [
                    "Конституция Республики Казахстан",
                    "Гражданский кодекс",
                    "Трудовой кодекс"
                ],
                correct: 0,
                explanation: "Конституция Республики Казахстан — основной закон страны."
            },
            {
                question: "Кто является единственным источником государственной власти в Казахстане?",
                answers: [
                    "Правительство",
                    "Народ",
                    "Суды"
                ],
                correct: 1,
                explanation: "Согласно Конституции, единственным источником государственной власти является народ."
            },
            {
                question: "Какой принцип закреплён в Конституции Казахстана?",
                answers: [
                    "Отсутствие прав и свобод",
                    "Власть принадлежит только одному органу",
                    "Признание и соблюдение прав и свобод человека"
                ],
                correct: 2,
                explanation: "Права и свободы человека признаются и гарантируются государством."
            }
        ]
    },

    3: {
        title: "ГОРОД ГРАЖДАН",
        questions: [
            {
                question: "Что регулирует гражданское право?",
                answers: [
                    "Имущественные и связанные с ними личные неимущественные отношения",
                    "Только отношения между государствами",
                    "Только уголовные преступления"
                ],
                correct: 0,
                explanation: "Гражданское право регулирует, в частности, отношения собственности и договорные отношения."
            },
            {
                question: "Что подтверждает факт покупки товара в магазине?",
                answers: [
                    "Устное обещание",
                    "Кассовый чек или другой допустимый документ",
                    "Рекламный плакат"
                ],
                correct: 1,
                explanation: "Чек помогает подтвердить покупку, хотя его отсутствие само по себе не всегда лишает потребителя возможности защищать свои права."
            },
            {
                question: "Что следует сделать, если купленный товар оказался с недостатком?",
                answers: [
                    "Всегда выбросить товар",
                    "Ничего не предпринимать",
                    "Обратиться к продавцу с требованием в рамках закона"
                ],
                correct: 2,
                explanation: "Потребитель может предъявить предусмотренные законом требования продавцу."
            }
        ]
    },

    4: {
        title: "ЦЕНТР ТРУДА",
        questions: [
            {
                question: "Как называется соглашение между работником и работодателем?",
                answers: [
                    "Трудовой договор",
                    "Договор дружбы",
                    "Устное приглашение"
                ],
                correct: 0,
                explanation: "Трудовой договор устанавливает трудовые отношения между работником и работодателем."
            },
            {
                question: "Что обязан делать работодатель?",
                answers: [
                    "Не знакомить работника с условиями труда",
                    "Обеспечивать предусмотренные законом условия и безопасность труда",
                    "Не выплачивать заработную плату"
                ],
                correct: 1,
                explanation: "Работодатель обязан соблюдать требования трудового законодательства, включая требования безопасности."
            },
            {
                question: "Как называется установленная оплата за выполненную работу?",
                answers: [
                    "Штраф",
                    "Залог",
                    "Заработная плата"
                ],
                correct: 2,
                explanation: "Заработная плата выплачивается работнику за его труд в соответствии с договором и законом."
            }
        ]
    },

    5: {
        title: "СУДЕБНЫЙ КВАРТАЛ",
        questions: [
            {
                question: "Для чего существует судебная система?",
                answers: [
                    "Для разрешения дел и защиты нарушенных прав в установленном законом порядке",
                    "Для замены всех государственных органов",
                    "Для принятия личных решений за граждан"
                ],
                correct: 0,
                explanation: "Суды осуществляют правосудие и рассматривают дела в пределах своей компетенции."
            },
            {
                question: "Что означает презумпция невиновности?",
                answers: [
                    "Каждый человек всегда виновен",
                    "Человек считается невиновным, пока его виновность не будет доказана в предусмотренном законом порядке",
                    "Доказательства не имеют значения"
                ],
                correct: 1,
                explanation: "Презумпция невиновности — важная конституционная гарантия."
            },
            {
                question: "Кто вправе осуществлять правосудие в Республике Казахстан?",
                answers: [
                    "Любой гражданин",
                    "Любая организация",
                    "Только суд"
                ],
                correct: 2,
                explanation: "Правосудие в Республике Казахстан осуществляется только судом."
            }
        ]
    }
};

// ==========================================
// ЭЛЕМЕНТЫ ИГРОВОГО ОКНА
// ==========================================

const modal = document.getElementById("gameModal");
const closeModal = document.getElementById("closeModal");

const questionTitle = document.getElementById("questionTitle");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const answerFeedback = document.getElementById("answerFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const questionProgressBar = document.getElementById("questionProgressBar");
const levelResult = document.getElementById("levelResult");

let currentLevel = 1;
let currentQuestion = 0;
let correctAnswers = 0;
let answered = false;

// ==========================================
// ОБНОВЛЕНИЕ ПРОГРЕССА
// ==========================================

function updateProgress() {

    const coinCount = document.getElementById("coinCount");
    const mapCoins = document.getElementById("mapCoins");
    const completedLevels = document.getElementById("completedLevels");
    const keyCount = document.getElementById("keyCount");

    if (coinCount) coinCount.textContent = progress.coins;
    if (mapCoins) mapCoins.textContent = progress.coins;

    if (completedLevels) {
        completedLevels.textContent =
            `${progress.completed.length} / 5`;
    }

    if (keyCount) {
        keyCount.textContent =
            `${progress.keys.length} / 5`;
    }

    // ПОДСВЕТКА ПОЛУЧЕННЫХ КЛЮЧЕЙ

   document.querySelectorAll(".key-slot").forEach(slot => {

    const keyNumber = Number(slot.dataset.key);

    console.log("Ключ в коллекции:", keyNumber);
    console.log("Полученные ключи:", progress.keys);

    if (progress.keys.includes(keyNumber)) {
        slot.classList.add("unlocked");
        slot.querySelector(".key-icon").textContent = "🔑";
    } else {
        slot.classList.remove("unlocked");
        slot.querySelector(".key-icon").textContent = "🔒";
    }

});
    // ПРОГРЕСС ИГРОКА

    const heroProgressText =
        document.getElementById("heroProgressText");

    const heroProgressBar =
        document.getElementById("heroProgressBar");

    if (heroProgressText) {
        heroProgressText.textContent =
            `${progress.completed.length} из 5 территорий пройдено`;
    }

    if (heroProgressBar) {
        heroProgressBar.style.width =
            `${progress.completed.length / 5 * 100}%`;
    }

    // ОТКРЫТИЕ ТЕРРИТОРИЙ

    document.querySelectorAll(".map-location").forEach(button => {

        const level = Number(button.dataset.level);
        const label = button.querySelector("small");

        const unlocked =
            level === 1 || progress.keys.includes(level - 1);

        if (unlocked) {

            button.classList.remove("locked");
            button.classList.add("active");

            if (label) {
                label.textContent =
                    progress.completed.includes(level)
                        ? "ПРОЙДЕНО ✓"
                        : "ИССЛЕДОВАТЬ →";
            }

        } else {

            button.classList.add("locked");
            button.classList.remove("active");

            if (label) {
                label.textContent = "ЗАКРЫТО";
            }
        }

    });

}


    const heroProgressText = document.getElementById("heroProgressText");
    const heroProgressBar = document.getElementById("heroProgressBar");

    if (heroProgressText) {
        heroProgressText.textContent =
            `${progress.completed.length} из 5 территорий пройдено`;
    }

    if (heroProgressBar) {
        heroProgressBar.style.width =
            `${progress.completed.length / 5 * 100}%`;
    }

    document.querySelectorAll(".map-location").forEach(button => {

        const level = Number(button.dataset.level);

        if (level === 1 || progress.keys.includes(level - 1)) {
            button.classList.remove("locked");
            button.classList.add("active");

            const label = button.querySelector("small");

            if (label) {
                label.textContent = progress.completed.includes(level)
                    ? "ПРОЙДЕНО ✓"
                    : "ИССЛЕДОВАТЬ →";
            }

        } else {
            button.classList.add("locked");
            button.classList.remove("active");

            const label = button.querySelector("small");

            if (label) {
                label.textContent = "ЗАКРЫТО";
            }
        }
    });

// ==========================================
// ОТКРЫТИЕ ТЕРРИТОРИИ
// ==========================================

document.querySelectorAll(".map-location").forEach(button => {

    button.addEventListener("click", () => {

        const level = Number(button.dataset.level);

        if (level > 1 && !progress.keys.includes(level - 1)) {
            alert("Сначала собери ключ предыдущей территории!");
            return;
        }

        openChallenge(level);
    });
});

function openChallenge(level) {

    currentLevel = level;
    currentQuestion = 0;
    correctAnswers = 0;
    const keyReward = document.getElementById("keyReward");

if (keyReward) {
    keyReward.classList.remove("show");
}

    questionTitle.textContent = challenges[level].title;

    levelResult.textContent = "";
    nextQuestion.style.display = "block";

    modal.classList.add("show");

    showQuestion();
}

// ==========================================
// ПОКАЗ ВОПРОСА
// ==========================================

function showQuestion() {

    const question = challenges[currentLevel].questions[currentQuestion];

    answered = false;

    questionNumber.textContent =
        `ВОПРОС ${currentQuestion + 1} / 3`;

    questionProgressBar.style.width =
        `${(currentQuestion / 3) * 100}%`;

    questionText.textContent = question.question;

    answerFeedback.textContent = "";
    answerOptions.innerHTML = "";

    nextQuestion.disabled = true;

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answerOptions.appendChild(button);
    });
}

// ==========================================
// ПРОВЕРКА ОТВЕТА
// ==========================================

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const question = challenges[currentLevel].questions[currentQuestion];

    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === question.correct) {
            button.classList.add("correct");
        }
    });

    if (selected === question.correct) {

        correctAnswers++;
        progress.coins += 10;

        selectedButton.classList.add("correct");

        answerFeedback.textContent =
            "✓ Правильно! +10 монет. " + question.explanation;

        answerFeedback.style.color = "#63d69b";

        saveProgress();
        updateProgress();

    } else {

        selectedButton.classList.add("incorrect");

        answerFeedback.textContent =
            "Неверно. " + question.explanation;

        answerFeedback.style.color = "#f0a0a0";
    }

    nextQuestion.disabled = false;

    if (currentQuestion === 2) {
        nextQuestion.textContent = "ЗАВЕРШИТЬ ИСПЫТАНИЕ";
    } else {
        nextQuestion.textContent = "СЛЕДУЮЩИЙ ВОПРОС →";
    }
}

// ==========================================
// СЛЕДУЮЩИЙ ВОПРОС И ИТОГИ
// ==========================================

nextQuestion.addEventListener("click", () => {

    if (!answered) return;

    if (currentQuestion < 2) {

        currentQuestion++;
        nextQuestion.textContent = "СЛЕДУЮЩИЙ ВОПРОС →";

        showQuestion();

    } else {

        finishChallenge();
    }
});

function finishChallenge() {

    questionProgressBar.style.width = "100%";

    answerOptions.innerHTML = "";
    questionText.textContent = "ИТОГ ИСПЫТАНИЯ";

    nextQuestion.style.display = "none";

    if (correctAnswers >= 2) {
        const keyReward = document.getElementById("keyReward");

if (keyReward && !progress.completed.includes(currentLevel)) {
    keyReward.classList.add("show");
}

        const firstCompletion =
            !progress.completed.includes(currentLevel);

        if (!progress.keys.includes(currentLevel)) {
            progress.keys.push(currentLevel);
        }

        if (firstCompletion) {
            progress.completed.push(currentLevel);
        }

        if (currentLevel === 5) {

            levelResult.innerHTML =
                `ПОЗДРАВЛЯЕМ!<br>
                ВСЕ ПЯТЬ ТЕРРИТОРИЙ ПРОЙДЕНЫ!<br>
                Ты завершил(а) правовое расследование!`;

        } else if (firstCompletion) {

            levelResult.innerHTML =
                `ИСПЫТАНИЕ ПРОЙДЕНО!<br>
                Правильных ответов: ${correctAnswers} из 3.<br>
                КЛЮЧ ПОЛУЧЕН!<br>
                Следующая территория открыта!`;

        } else {

            levelResult.innerHTML =
                `ОТЛИЧНЫЙ РЕЗУЛЬТАТ!<br>
                Правильных ответов: ${correctAnswers} из 3.<br>
                Эта территория уже пройдена!`;
        }

    } else {

        levelResult.innerHTML =
            `ИСПЫТАНИЕ НЕ ПРОЙДЕНО.<br>
            Правильных ответов: ${correctAnswers} из 3.<br>
            Нужно набрать минимум 2 правильных ответа. Попробуй ещё раз!`;
    }

    saveProgress();
    updateProgress();
}
// ==========================================
// ЗАКРЫТИЕ ИГРОВОГО ОКНА
// ==========================================

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// ==========================================
// ЗАПУСК
// ==========================================

function updateProgress() {

    const coinCount = document.getElementById("coinCount");
    const mapCoins = document.getElementById("mapCoins");
    const completedLevels = document.getElementById("completedLevels");
    const keyCount = document.getElementById("keyCount");

    if (coinCount) coinCount.textContent = progress.coins;
    if (mapCoins) mapCoins.textContent = progress.coins;

    if (completedLevels) {
        completedLevels.textContent = `${progress.completed.length} / 5`;
    }

    if (keyCount) {
        keyCount.textContent = `${progress.keys.length} / 5`;
    }

    const heroProgressText = document.getElementById("heroProgressText");
    const heroProgressBar = document.getElementById("heroProgressBar");

    if (heroProgressText) {
        heroProgressText.textContent =
            `${progress.completed.length} из 5 территорий пройдено`;
    }

    if (heroProgressBar) {
        heroProgressBar.style.width =
            `${progress.completed.length / 5 * 100}%`;
    }

    document.querySelectorAll(".map-location").forEach(button => {

        const level = Number(button.dataset.level);
        const label = button.querySelector("small");

        const unlocked =
            level === 1 || progress.keys.includes(level - 1);

        if (unlocked) {

            button.classList.remove("locked");
            button.classList.add("active");

            if (label) {
                label.textContent = progress.completed.includes(level)
                    ? "ПРОЙДЕНО ✓"
                    : "ИССЛЕДОВАТЬ →";
            }

        } else {

            button.classList.add("locked");
            button.classList.remove("active");

            if (label) {
                label.textContent = "ЗАКРЫТО";
            }
        }
    });
}
const resetButton = document.getElementById("resetGame");

if (resetButton) {
    resetButton.addEventListener("click", () => {

        const confirmed = confirm(
            "Ты действительно хочешь начать игру заново? Весь прогресс будет сброшен."
        );

        if (confirmed) {
            localStorage.removeItem("pravovoyNavigatorGame");
            location.reload();
        }
    });
}
console.log("Игровая система успешно загружена!");
console.log("ПОЛУЧЕННЫЕ КЛЮЧИ:", progress.keys);
console.log("ЯЧЕЙКИ КОЛЛЕКЦИИ:", document.querySelectorAll(".key-slot").length);