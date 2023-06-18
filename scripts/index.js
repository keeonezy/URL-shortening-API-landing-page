// Advice:
// 1. tooltip: https://www.w3schools.com/css/css_tooltip.asp

const searchInput = document.querySelector(".shorts__input");
const searchButton = document.querySelector(".shorts__button");
const resultContainer = document.querySelector(".shorts__results");
const resultShortInput = document.querySelector(".shorts__result-input");

async function getShortUrl() {
    if (!searchInput.value) {
        alert("url введи")
    } else {
        const url = `https://api.shrtco.de/v2/shorten?url=${searchInput.value}`;
        const res = await fetch(url);
        const data = await res.json();

        resultContainer.style.display = "block";
        // с form не работает
        const urlCard = document.createElement("div");
        urlCard.className = "shorts__result";
        urlCard.innerHTML = `
    <p class="boost__title" style="color: black;">${data.result.original_link}</p>
    <a href="http://${data.result.short_link}" target="_blank" class="short-url">${data.result.short_link}</a>
      <button class="shorts__result-button">Скопировать</button>`;

        resultContainer.appendChild(urlCard);
        const resultButton = document.querySelector(".shorts__result-button");
        const resultText = document.querySelector(".short-url");
        resultButton.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(resultText.textContent);
        });

        // function copyResult(e) {
        //     e.preventDefault();
        //     navigator.clipboard.writeText(resultText.textContent);
        // }


        searchInput.value = "";
    }
}

function goResult(e) {
    e.preventDefault();
    getShortUrl();
}

searchButton.addEventListener("click", goResult);