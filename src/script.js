let img_m = document.getElementById("img-m")
let sigla_m = document.getElementById("sigla-m")
let nome_m = document.getElementById("nome-m")
let item

async function escolherP() {
    const selection = document.getElementById("box-inicio")
    selection.style.display = "none"

    const conteiner = document.getElementById("lista-moedas")
    conteiner.style.display = "block"

    const moedas = await fetch("./src/settings.json").then(r => r.json())
    Object.values(moedas).forEach(moeda => {
        const item = document.createElement("div")
        item.classList.add("item-moeda")
        item.innerHTML = `
            <img src="${moeda.img}" class="flag">
            <span class="sigla">${moeda.sigla}</span>
            <span class="nome">${moeda.nome}</span>
        `
        conteiner.appendChild(item);
    })

}
escolherP()















/*
async function carregarMoedas() {
  const moedas = await fetch("./src/settings.json").then(r => r.json());
  const api = await fetch("https://api.exchangerate-api.com/v4/latest/USD").then(r => r.json());

    Object.keys(moedas).forEach(sigla => {
    moedas[sigla].taxa = api.rates[sigla] || null;
  });
  console.log(moedas);
}
carregarMoedas()
*/

function converterbtn() {
    img_m.src = "./assets/countries/usd.png"
    sigla_m.innerHTML = "USD"
    nome_m.innerHTML = "Dólar Americano"
}

const darkmod = document.getElementById("btn-dark-mode")
darkmod.addEventListener("click", function () {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
})
