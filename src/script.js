let img_m = document.getElementById("img-m")
let sigla_m = document.getElementById("sigla-m")
let nome_m = document.getElementById("nome-m")
let vname_m = document.getElementById("vname-m")

let img_c = document.getElementById("img-c")
let sigla_c = document.getElementById("sigla-c")
let nome_c = document.getElementById("nome-c")
let vname_c = document.getElementById("vname-c")



let dadosMedas = null
let pagedados = null
let apiDados = null

const menu = document.getElementById("box-inicio")
const conteiner = document.getElementById("lista-moedas")


async function carregarLista() {
    conteiner.style.display = "none"
    const moedas = await fetch("./src/settings.json").then(r => r.json())
    const api = await fetch("https://api.exchangerate-api.com/v4/latest/USD").then(r => r.json())
    Object.keys(moedas).forEach(sigla => {
        moedas[sigla].taxa = api.rates[sigla] || null;
    });

    Object.values(moedas).forEach(moeda => {
        const item = document.createElement("div")
        item.classList.add("item-moeda")
        item.innerHTML = `
            <img src="${moeda.img}" class="flag">
            <span class="sigla">${moeda.sigla}</span>
            <span class="nome">${moeda.nome}</span>
        `
        conteiner.appendChild(item);

        item.addEventListener("click", () => {
            document.querySelectorAll('.item-moeda').forEach(i => i.classList.remove('selected'));
            item.classList.add("selected");
            dadosMedas = moeda
            apiDados = api
        });
    })

}
carregarLista()


function convertionSelect(seson) {
    if (seson == "de") {
        // console.log(seson, sigla, nome, simbolo, img);
        menu.style.display = "none"
        conteiner.style.display = "block"
        pagedados = "de"
    } else if (seson == "para") {
        menu.style.display = "none"
        conteiner.style.display = "block"
        pagedados = "para"
    }
}

function Confirmar() {
    if (pagedados === "de") {
        img_m.src = dadosMedas.img
        sigla_m.innerHTML = dadosMedas.sigla
        nome_m.innerHTML = dadosMedas.nome
        vname_m.innerHTML = `${apiDados.rates[dadosMedas.sigla]} ${dadosMedas.nome}`;
        voltar()
    } else {
        img_c.src = dadosMedas.img
        sigla_c.innerHTML = dadosMedas.sigla
        nome_c.innerHTML = dadosMedas.nome
        vname_c.innerHTML = `${apiDados.rates[dadosMedas.sigla]} ${dadosMedas.nome}`;
        voltar()
    }

}
function voltar() {
    menu.style.display = "block"
    conteiner.style.display = "none"
    dadosMedas = null
    pagedados = null
    apiDados = null
}










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
const darkmod = document.getElementById("btn-dark-mode")
darkmod.addEventListener("click", function () {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
})
