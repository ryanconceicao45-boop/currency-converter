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
const c_de = document.getElementById("valor-m")
const c_para = document.getElementById("valor-c")

async function taxaApi(base = "BRL") {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const api = await response.json();
    return api;
}

async function consutJson() {
    const response = await fetch("./src/settings.json");
    const moedas = await response.json();
    return moedas;
}

async function carregarLista() {
    document.getElementById("conteiner-contines").style.display = "none"
    conteiner.style.display = "none"
    const moedas = await consutJson();
    const data = await taxaApi("USD");

    Object.keys(moedas).forEach(sigla => {
        moedas[sigla].taxa = data.rates[sigla] || null;
    });

    Object.values(moedas).forEach(moeda => {
        const item = document.createElement("div")
        item.classList.add("item-moeda")
        item.innerHTML = `
            <img src="${moeda.img}" class="flag">
            <span class="sigla">${moeda.sigla}</span>
            <span class="nome">${moeda.nome}</span>
        `
        item.addEventListener("click", () => {
            const item_sect = document.querySelectorAll('.item-moeda')
            item_sect.forEach(i => i.classList.remove('selected'));
            item.classList.add("selected");
            dadosMedas = moeda
            apiDados = data
        });
        conteiner.appendChild(item);
    })
    vname_m.innerHTML = `${data.rates[sigla_m.innerHTML]} ${nome_m.innerHTML} `;
    vname_c.innerHTML = `${data.rates[sigla_c.innerHTML]} ${nome_c.innerHTML}`;
}
carregarLista()

let activeInvertion = false

function inverterC() {
    // Swap img
    let temp_img = img_m.src
    img_m.src = img_c.src
    img_c.src = temp_img
    // Swap sigla
    let temp_sigla = sigla_m.innerHTML
    sigla_m.innerHTML = sigla_c.innerHTML
    sigla_c.innerHTML = temp_sigla
    // Swap nome
    let temp_nome = nome_m.innerHTML
    nome_m.innerHTML = nome_c.innerHTML
    nome_c.innerHTML = temp_nome
    // Swap vname
    let temp_vname = vname_m.innerHTML
    vname_m.innerHTML = vname_c.innerHTML
    vname_c.innerHTML = temp_vname
    // Swap simbolo
    const simbolo_m = document.getElementById("simbolo-m")
    const simbolo_c = document.getElementById("simbolo-c")
    if (simbolo_m && simbolo_c) {
        let temp_simbolo = simbolo_m.innerHTML
        simbolo_m.innerHTML = simbolo_c.innerHTML
        simbolo_c.innerHTML = temp_simbolo
    }

    let temp_convet = c_de.innerHTML
    c_de.innerHTML = c_para.innerHTML
    c_para.innerHTML = temp_convet
    // Toggle activeInvertion
    activeInvertion = !activeInvertion
}

function convertionSelect(seson) {
    if (seson == "de") {
        menu.style.display = "none"
        conteiner.style.display = "block"
        pagedados = "de"
        document.getElementById("conteiner-contines").style.display = "block"
    } else if (seson == "para") {
        menu.style.display = "none"
        conteiner.style.display = "block"
        pagedados = "para"
        document.getElementById("conteiner-contines").style.display = "block"
    }
}

function Confirmar() {
    if (!dadosMedas) {
        alert("Selecione uma moeda primeiro!")
        return;
    }
    let otherSigla = pagedados === "de" ? sigla_c.textContent : sigla_m.textContent;
    if (dadosMedas.sigla === otherSigla) {
        alert("Você não pode converter a mesma moeda!")
    } else {
        if (pagedados === "de") {
            const simbolo_m = document.getElementById("simbolo-m")
            simbolo_m.innerHTML = dadosMedas.simbolo
            img_m.src = dadosMedas.img
            sigla_m.innerHTML = dadosMedas.sigla
            nome_m.innerHTML = dadosMedas.nome
            vname_m.innerHTML = `${apiDados.rates[dadosMedas.sigla]} ${dadosMedas.nome}`;
            voltar()
        } else {
            const simbolo_c = document.getElementById("simbolo-c")
            simbolo_c.innerHTML = dadosMedas.simbolo
            img_c.src = dadosMedas.img
            sigla_c.innerHTML = dadosMedas.sigla
            nome_c.innerHTML = dadosMedas.nome
            vname_c.innerHTML = `${apiDados.rates[dadosMedas.sigla]} ${dadosMedas.nome}`;
            voltar()
        }
    }
}
async function conveter() {
    const moedas = await consutJson();
    const sigl = sigla_m.textContent
    const api = await taxaApi(sigl);

    const valor = parseFloat(document.getElementById("input-valor").value || 0) // valor que vem do input
    if (valor > 0) {
        const sigl = sigla_c.textContent
        const resultado = valor * api.rates[sigl];
        c_para.innerHTML = resultado.toFixed(2)
        c_de.innerHTML = Math.floor(valor) // Valor para converter
    }
}

function voltar() {
    const item_sect = document.querySelectorAll('.item-moeda')
    item_sect.forEach(i => i.classList.remove("selected"));
    document.getElementById("conteiner-contines").style.display = "none"
    menu.style.display = "block"
    conteiner.style.display = "none"
    dadosMedas = null
    pagedados = null
    apiDados = null
}

const darkmod = document.getElementById("btn-dark-mode")
darkmod.addEventListener("click", function () {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
})
