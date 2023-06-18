// Advice:
// 1. tooltip: https://www.w3schools.com/css/css_tooltip.asp

const searchInput = document.querySelector(".shorts__input");
const searchButton = document.querySelector(".shorts__button");
const resultContainer = document.querySelector(".shorts__results");
const resultShortInput = document.querySelector(".shorts__result-input");
const resultButton = document.querySelector(".shorts__result-button");

async function getShortUrl() {
    const url = `https://api.shrtco.de/v2/shorten?url=${searchInput.value}`;
    const res = await fetch(url);
    const data = await res.json();

    resultShortInput.value = data.result.full_short_link;
    resultContainer.style.display = "block";
    searchInput.value = "";
}

function goResult(e) {
    e.preventDefault();
    getShortUrl();
}

function copyResult(e) {
    e.preventDefault();
    resultShortInput.select();
    document.execCommand("copy");
}

searchButton.addEventListener("click", goResult);
resultButton.addEventListener("click", copyResult);