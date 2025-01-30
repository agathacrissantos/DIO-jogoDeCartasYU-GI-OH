const state = {
    score: {
        player: 0,
        computer: 0,
        box: document.getElementById("score-points"),
    },
    cards: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    sides: {
        player: document.querySelector("#player-cards"),
        computer: document.querySelector("#computer-cards"),
    },
    button: document.getElementById("next-duel"),
};

const cardData = [
    { id: 0, name: "Blue Eyes White Dragon", type: "Paper", img: "dragon.png", win: [1], lose: [2] },
    { id: 1, name: "Dark Magician", type: "Rock", img: "magician.png", win: [2], lose: [0] },
    { id: 2, name: "Exodia", type: "Scissors", img: "exodia.png", win: [0], lose: [1] },
];

async function getRandomCardId() {
    return Math.floor(Math.random() * cardData.length);
}

async function createCardImage(id, side) {
    const img = document.createElement("img");
    img.height = 100;
    img.src = "card-back.png";
    img.dataset.id = id;
    img.classList.add("card");

    if (side === state.sides.player) {
        img.addEventListener("click", () => setCardsField(id));
    }

    img.addEventListener("mouseover", () => drawSelectCard(id));
    return img;
}

async function setCardsField(playerId) {
    await removeAllCardsImages();
    const computerId = await getRandomCardId();

    toggleFieldCards(true);
    clearCardDetails();
    drawCardsInField(playerId, computerId);

    const result = await checkDuelResults(playerId, computerId);
    updateScore();
    drawButton(result);
}

<<<<<<< HEAD
async function drawCardsInField(playerId, computerId) {
    state.cards.player.src = cardData[playerId].img;
    state.cards.computer.src = cardData[computerId].img;
=======
async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[playercardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
>>>>>>> e9aa8c8e698c19aaf6a6925d32efe4b0c8784b7f
}

async function toggleFieldCards(show) {
    const display = show ? "block" : "none";
    state.cards.player.style.display = display;
    state.cards.computer.style.display = display;
}

async function clearCardDetails() {
    state.cards.avatar.src = "";
    state.cards.name.innerText = "";
    state.cards.type.innerText = "";
}

async function checkDuelResults(playerId, computerId) {
    let result = "Draw";
    const playerCard = cardData[playerId];

    if (playerCard.win.includes(computerId)) {
        result = "win";
        state.score.player++;
    }

    if (playerCard.lose.includes(computerId)) {
        result = "lose";
        state.score.computer++;
    }

    await playAudio(result);
    return result;
}

async function drawButton(text) {
    state.button.innerText = text.toUpperCase();
    state.button.style.display = "block";
}

async function updateScore() {
    state.score.box.innerText = `Win: ${state.score.player} | Lose: ${state.score.computer}`;
}

async function removeAllCardsImages() {
    [state.sides.player, state.sides.computer].forEach(side => {
        side.querySelectorAll("img").forEach(img => img.remove());
    });
}

async function drawSelectCard(id) {
    state.cards.avatar.src = cardData[id].img;
    state.cards.name.innerText = cardData[id].name;
    state.cards.type.innerText = `Attribute: ${cardData[id].type}`;
}

async function drawCards(num, side) {
    for (let i = 0; i < num; i++) {
        const id = await getRandomCardId();
        const img = await createCardImage(id, side);
        side.appendChild(img);
    }
}

async function resetDuel() {
    state.cards.avatar.src = "";
    state.button.style.display = "none";
    toggleFieldCards(false);
    init();
}

async function playAudio(status) {
    try {
        new Audio(`../assets/audios/${status}.wav`).play();
    } catch {}
}

function init() {
    toggleFieldCards(false);
    drawCards(5, state.sides.player);
    drawCards(5, state.sides.computer);
    document.getElementById("bgm").play();
}

document.addEventListener("DOMContentLoaded", init);
