/**
 * Autor: '@victorleaoo'
 * Esse arquivo implementa a classe Território, classe Grafo e a construção do mapa (grafo) e a lista de territórios
 */

const fs = require('fs');

// Definição do Território (Nó)
function Territorio(id, nome, continente, jogador, tropas) {
    this.id = id;
    this.nome = nome;
    this.continente = continente;
    this.jogador = jogador;
    this.tropas = tropas;
}

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

/**
 * Criação do Mapa
 */

const data = JSON.parse(fs.readFileSync('./mapa-war.json'));
// 42 territórios
var mapa = new Graph(42);

// Cria a lista dos territórios e adiciona como vértices no grafo
const territorios = [];

for (let i = 0; i < 42; i++) {
    const t = data.regions[i];

    // cria novo território -> jogador nulo e quantidade de tropas 0
    const novoT = new Territorio(t.id, t.name, t.continentId, null, 0);

    // adiciona na lista de territórios
    territorios.push(novoT);

    // adiciona como vértice
    mapa.addVertice(novoT.id);
}

// Adiciona as arestas (fronteiras)
for (let i = 0; i < data.borders.length; i++) {
    mapa.addAresta(data.borders[i][0], data.borders[i][1]);
}

// Exporta o módulo necessário
module.exports = {
    Graph,
    Territorio,
    mapa,
    territorios
};