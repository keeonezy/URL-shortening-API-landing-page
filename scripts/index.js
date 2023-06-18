const searchInput = document.querySelector(".shorts__input");
const searchButton = document.querySelector(".shorts__button");
const resultShort = document.querySelector(".shorts__text");
const resultContainer = document.querySelector(".shorts__result");

async function getShortUrl() {
    const url = `https://api.shrtco.de/v2/shorten?url=${searchInput.value}`;
    const res = await fetch(url);
    const data = await res.json();
    
    resultShort.textContent = data.result.full_short_link;
    resultContainer.style.display = "block";
    searchInput.value = "";
}

function goResult(e) {
    e.preventDefault();
    getShortUrl();
}

searchButton.addEventListener("click", goResult);