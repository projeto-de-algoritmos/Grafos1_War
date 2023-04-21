/**
 * Autor: '@victorleaoo'
 * Esse arquivo faz o setup do mapa e do jogo, seguindo a seguinte lógica:
 * A partir de um JSON com os continentes, territórios e fronteiras, uma função é chamada para preencher o grafo com esse mapa no JSON.
 * Divide os territórios para os jogadores.
 * O jogador pode alocar 5 tropas entre seus territórrios.
 */

const fs = require('fs');

/**
 * Definição do Território (Nó)
 */
function Territorio(id, nome, continente, jogador, tropas) {
    this.id = id;
    this.nome = nome;
    this.continente = continente;
    this.jogador = jogador;
    this.tropas = tropas;
}

/**
 * Definição do Grafo
 */
class Graph {

    // Construtor
    // Quantidade de Vértices
    // Cria a lista de Adjacência
    constructor(nVertices) {
        this.nVertices = nVertices;
        this.ListaAdj = new Map();
    }

    // Adiciona Vertice
    addVertice(v) {
        this.ListaAdj.set(v, []);
    }

    // Adiciona Aresta nos dois vértices (não-direcionado)
    addAresta(v, w) {
        this.ListaAdj.get(v).push(w);
        this.ListaAdj.get(w).push(v);
    }

    // Imprime o Grafo -> Apenas para saber se está correto...
    printGraph() {
        // Pega vértices
        var get_keys = this.ListaAdj.keys();

        // Itera nos vértices
        for (var i of get_keys) {
            // Pega as arestas para um vértice
            var get_values = this.ListaAdj.get(i);
            var conc = "";

            // Concatena as arestas do vértice
            for (var j of get_values)
                conc += j + " ";

            // Imprime o vértice e suas arestas
            console.log(i + " -> " + conc);
        }
    }
}

//---------------------------------------------------------------------------------//

/**
 * Criação do Mapa
 */

const data = JSON.parse(fs.readFileSync('./mapa-war.json'));

// 42 territórios
var mapa = new Graph(42);

// Pega informação dos continentes (id, nome e bônus)
const continentes = data.continents;

/**
 * Cria a lista dos territórios e adiciona como vértices no grafo
 */
const territorios = [];

for (let i = 0; i < 42; i++) {
    const t = data.regions[i];

    const novoT = new Territorio(t.id, t.name, t.continentId, null, 0);

    territorios.push(novoT);

    mapa.addVertice(novoT.id);
}

// Adiciona as arestas definidas no JSON
for (let i = 0; i < data.borders.length; i++) {
    mapa.addAresta(data.borders[i][0], data.borders[i][1]);
}

// Printa o grafo caso necessário
//mapa.printGraph()

//---------------------------------------------------------------------------------//

/**
 * Distribuição dos territórios
 */

// Lista de jogadores -> 1 a 6
let jogadores = [0, 1, 2, 3, 4, 5]

// Número mínimo de territórios que cada jogador deve ter
let minTerritorios = Math.floor(territorios.length / jogadores.length);

// Embaralha a lista de territórios
let territorios_random = territorios.sort(function () {
    return Math.random() - 0.5;
});

// Distribui os territórios entre os jogadores, atualiza a lista de territórios adicionando o jogador de cada território (está embaralhada, mas ordenada por jogador)
let idx = 0;
let new_idx = 0;
for (let i = 0; i < jogadores.length; i++) {
    let territoriosJogador = territorios_random.slice(idx, idx + minTerritorios);

    for (let j = 0; j < territoriosJogador.length; j++) {
        territorios[new_idx] = new Territorio(territoriosJogador[j].id, territoriosJogador[j].nome, territoriosJogador[j].continente, jogadores[i], 1);
        new_idx += 1;
    }

    idx += minTerritorios;
}

//console.log(territorios)

//---------------------------------------------------------------------------------//

/** 
 * Adição inicial de tropas
 */


const prompt = require("prompt-sync")();

// Função que analisa o território, o jogador e quantidade de tropas que ele quer adicionar no território, caso seja seu.
function adicionarTropa(territorio, jogadorAtual, quantidadeTropasRestante) {
    if (territorios[territorio].jogador == jogadorAtual) {
        console.log("\nVocê ainda pode adicionar essa quantidade de tropas: " + quantidadeTropasRestante);
        let quantidadeTropasAdicionar = prompt('Quantas tropas deseja adicionar nesse território? ');
        while (quantidadeTropasAdicionar > quantidadeTropasRestante) {
            console.log("\nVocê só pode adicionar essa quantidade de tropas: " + quantidadeTropasRestante);
            quantidadeTropasAdicionar = prompt('Quantas tropas deseja adicionar nesse território? ');
        }
        var q = parseInt(quantidadeTropasAdicionar);
        territorios[territorio].tropas = territorios[territorio].tropas + q;
        quantidadeTropasRestante -= q;

        return quantidadeTropasRestante;
    } else {
        console.log('\nEsse território não te pertence. Escolha um que te pertença para adicionar tropas!\n');
        return quantidadeTropasRestante;
    }
}

idx = 0;

// Cada jogador inicialmente adiciona até 5 tropas para seus territórios
for (let i = 0; i < jogadores.length; i++) {
    let quantidadeTropasRestante = 5;

    console.log('\n------- Olá Jogador ' + i + ' -------\n');

    while (quantidadeTropasRestante > 0) {
        console.log('\nSeus territórios são: ');
        for (let j = idx; j < idx + 7; j++) {
            console.log("Id: " + territorios[j].id + " - Nome: " + territorios[j].nome + " - Tropas:" + territorios[j].tropas);
        }

        var territorioAdicionar = prompt("Qual território deseja adicionar tropas? (coloque o id) ");

        let t = territorios.findIndex(function (elem) {
            return elem.id == territorioAdicionar;
        });

        quantidadeTropasRestante = adicionarTropa(t, i, quantidadeTropasRestante);
    }

    idx += 7;
}

//console.log(territorios);


//---------------------------------------------------------------------------------//

/**
 * Distribuição de Objetivos
 */

jogador_objetivo = [];

// Lista de objetivos
const objetivos = ['Conquistar a América do Sul', 'Conquistar a Ásia', 'Conquistar a América do Norte', 'Conquistar a Oceania', 'Conquistar a Europa', 'Conquistar a África']

// Embaralha a lista de objetivos
let objetivoIndex = objetivos.sort(function () {
    return Math.random() - 0.5;
});

// Adiciona uma lista de objetivos com os jogadores e seus respetivos objetivos.
for (let i = 0; i < jogadores.length; i++) {
    jogador_objetivo.push({ 'jogador': i, 'objetivo': objetivoIndex[i] })
}

console.log(jogador_objetivo)

//---------------------------------------------------------------------------------//