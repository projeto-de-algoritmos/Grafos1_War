/**
 * Autor: '@victorleaoo'
 * Esse arquivo faz o setup do mapa e do jogo, seguindo a seguinte lógica:
 * A partir de um JSON com os continentes, territórios e fronteiras, uma função é chamada para preencher o grafo com esse mapa no JSON.
 * Divide os territórios para os jogadores.
 * O jogador pode alocar 5 tropas entre seus territórrios.
 */


/**
 * Criação do Mapa
 */
const graphlib = require('graphlib');
const fs = require('fs');

function createGraph(data) {
    /**
     * Função que, a partir do arquivo JSON, adiciona os territórios (nós) e fronteiras (arestas) do grafo.
     */

    // Cria o Grafo
    const graph = new graphlib.Graph();

    // Adiciona nós/territórios
    data.regions.forEach(region => {
        graph.setNode(region.id);
    });

    // Adiciona arestas/fronteiras
    data.borders.forEach(border => {
        graph.setEdge(border[0], border[1]);
    });

    // Retorna o grafo
    return graph;
}

const mapa = createGraph(JSON.parse(fs.readFileSync('./mapa-war.json', 'utf8')));

let territorios = mapa.nodes();
let fronteiras = mapa.edges();

/**
 * Distribuição dos territórios
 */

// Lista de jogadores
let jogadores = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6']

// Número mínimo de territórios que cada jogador deve ter
let minTerritorios = Math.floor(territorios.length / jogadores.length);

// Embaralha a lista de territórios
territorios = territorios.sort(function () {
    return Math.random() - 0.5;
});

// Distribui os territórios entre os jogadores
let jogadorTerritorios = [];
let idx = 0;
for (let i = 0; i < jogadores.length; i++) {
    let territoriosJogador = territorios.slice(idx, idx + minTerritorios);
    jogadorTerritorios.push({ jogador: jogadores[i], territorios: territoriosJogador });
    idx += minTerritorios;
}

console.log(jogadorTerritorios)