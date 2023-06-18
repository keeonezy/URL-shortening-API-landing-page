// Advice:
// 1. tooltip: https://www.w3schools.com/css/css_tooltip.asp

const searchInput = document.querySelector(".shorts__input");
const searchButton = document.querySelector(".shorts__button");
const resultContainer = document.querySelector(".shorts__results");

async function getShortUrl() {
    const url = `https://api.shrtco.de/v2/shorten?url=${searchInput.value}`;
    const res = await fetch(url);
    const data = await res.json();

    resultContainer.style.display = "block";

    // с form не работает. использовать div
    const newShort = document.createElement("div");
    newShort.classList.add('shorts__result');
    newShort.innerHTML = `
    <p class="fwe" style="color: black; font-size: 18px;">${data.result.original_link}</p>
    <input class="shorts__result-input" value="" readonly type="text">
      <button class="shorts__result-button">Скопировать</button>
      `;

    // метод appendChild работает не корректно. не добавляет новые input при множестве
    resultContainer.prepend(newShort);


    const resultButton = document.querySelector(".shorts__result-button");
    const resultText = document.querySelector(".shorts__result-input");
    resultText.value = data.result.short_link;
    resultButton.addEventListener("click", (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(resultText.value);
        resultButton.textContent = 'Скопировалось!'
        resultButton.style.backgroundColor = 'hsl(260, 8%, 14%)';
        resultButton.style.color = 'white';

        setTimeout(() => {
            resultButton.textContent = 'Скопировать'
            resultButton.style.backgroundColor = 'hsl(180, 66%, 49%)';
        }, 1000);
    });

    searchInput.value = "";
}

function goResult(e) {
    e.preventDefault();
    getShortUrl();
}

searchButton.addEventListener("click", goResult);