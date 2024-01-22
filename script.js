const ApiKey = '7d651ff0fa6947a781a8468b9150e584';
const apiUrl = 'https://newsapi.org/v2/everything?q=';

const Cont = document.querySelector("#container")
const tit = document.querySelector("#cardTit");
const source = document.querySelector("#source");
const desc = document.querySelector("#cardDesc");
const img = document.querySelector("#cardImg");
const tmp = document.querySelector("#temp")




window.addEventListener('load', () => fetchdata('pakistan'));

async function fetchdata(query) {
    const response = await fetch(`${apiUrl}${query}&apikey=${ApiKey}`)
    const data = await response.json()
    binddata(data.articles)
}

function binddata(articles) {
    // Empty the Container
    Cont.innerHTML = '';


    // For Each Loop for Articles
    articles.forEach(article => {
        if (article.urlToImage === null) { return }
        const cardClone = tmp.content.cloneNode(true);
        fillData(cardClone, article);
        Cont.appendChild(cardClone);
    });
}

// Show News on DOM
function fillData(cardClone, article) {
    const tit = cardClone.querySelector("#cardTit");
    const source = cardClone.querySelector("#source");
    const desc = cardClone.querySelector("#cardDesc");
    const img = cardClone.querySelector("#cardImg");

    img.src = article.urlToImage;
    tit.innerHTML = article.title;
    desc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("eng-US", {
        timeZone: "Asia/jakarta"
    })

    source.innerHTML = `${article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}

const srchBtn = document.querySelector("#searchBtn")
const input = document.querySelector("#search")

srchBtn.addEventListener('click', () => {
    const query = input.value;
    if(query === '') return;
    fetchdata(query);
})