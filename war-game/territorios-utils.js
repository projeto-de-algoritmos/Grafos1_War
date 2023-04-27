/**
 * Autor: '@victorleaoo'
 * Esse arquivo implementa funções importantes em relação a territórios:
 * - Distribuição inicial de territórios para os jogadores.
 * - Adicionar tropas adicionais (função adicionaTropa)
 */

const { Territorio, mapa, territorios } = require('./grafo.js');

// Lista de jogadores -> 1 a 6
let jogadores = [0, 1, 2, 3, 4, 5]

// Embaralha a lista de territórios
let territorios_random = territorios.sort(function () {
    return Math.random() - 0.5;
});

let idx = 0;
let new_idx = 0;

// Distribui os territórios entre os jogadores, atualiza a lista de territórios adicionando o jogador de cada território (está embaralhada, mas ordenada por jogador)
for (let i = 0; i < jogadores.length; i++) {
    // Pega os territórios aleatórios que serão atribuídos os jogadores
    let territoriosJogador = territorios_random.slice(idx, idx + (Math.floor(territorios.length / jogadores.length)));

    // Atualiza os territórios com o jogador e 1 tropa
    for (let j = 0; j < territoriosJogador.length; j++) {
        territorios[new_idx] = new Territorio(territoriosJogador[j].id, territoriosJogador[j].nome, territoriosJogador[j].continente, jogadores[i], 1);
        new_idx += 1;
    }

    idx += Math.floor(territorios.length / jogadores.length);
}

// Função que analisa o território, o jogador e quantidade de tropas que ele quer adicionar no território, caso seja seu.
function adicionarTropa(territorio, jogadorAtual, quantidadeTropasRestante) {
    // Se o território é do jogador que o solicitou
    if (territorios[territorio].jogador == jogadorAtual) {
        console.log("\nVocê ainda pode adicionar essa quantidade de tropas: " + quantidadeTropasRestante);

        let quantidadeTropasAdicionar = prompt('Quantas tropas deseja adicionar nesse território? ');

        // Se a quantidade de tropas pedidas é maior que a possível
        while (quantidadeTropasAdicionar > quantidadeTropasRestante) {
            console.log("\nVocê só pode adicionar essa quantidade de tropas: " + quantidadeTropasRestante);
            quantidadeTropasAdicionar = prompt('Quantas tropas deseja adicionar nesse território? ');
        }

        // Atualiza a quantidade de tropas restante
        var q = parseInt(quantidadeTropasAdicionar);
        territorios[territorio].tropas = territorios[territorio].tropas + q;
        quantidadeTropasRestante -= q;

        return quantidadeTropasRestante;

        // Se o território não pertence ao jogador
    } else {
        console.log('\nEsse território não te pertence. Escolha um que te pertença para adicionar tropas!\n');
        return quantidadeTropasRestante;
    }
}

const prompt = require("prompt-sync")();

idx = 0;

// Cada jogador inicialmente adiciona até 5 tropas para seus territórios
for (let i = 0; i < jogadores.length; i++) {
    let quantidadeTropasRestante = 5;

    console.log('\n------- Olá Jogador ' + i + ' -------\n');

    // Enquanto o jogador ainda tem 1+ tropas para adicionar
    while (quantidadeTropasRestante > 0) {
        console.log('\nSeus territórios são: ');

        // Lista território
        for (let j = idx; j < idx + 7; j++) { // Cada jogador tem 7 territórios no início (em ordem)
            console.log("Id: " + territorios[j].id + " - Nome: " + territorios[j].nome + " - Tropas:" + territorios[j].tropas);
        }

        var territorioAdicionar = prompt("Qual território deseja adicionar tropas? (coloque o id) ");

        // Encontra território
        let t = territorios.findIndex(function (elem) {
            return elem.id == territorioAdicionar;
        });

        // Adiciona tropa ao território
        quantidadeTropasRestante = adicionarTropa(t, i, quantidadeTropasRestante);
    }

    idx += 7; // Cada jogador tem 7 territórios no início
}

// Analisa a lista de jogadores para os territórios de um continente
let jogadores_continente = [];
// Para debug/melhor visualização
let busca_continentes = [];

// BFS que analisa um continente inteiro
function bfs_Continente(graph, noInicio, jogador = 10) {

    // Fila da BFS e array de visitados
    const fila = [];
    const visitado = new Array(graph.nVertices).fill(false);

    // O nó inicial é visitado e o primeiro na fila
    visitado[noInicio] = true;
    fila.push(noInicio);

    // Encontra o continente que está sendo analisado a partir de um país.
    let territorio_busca = territorios.findIndex(function (elem) {
        return elem.id == noInicio;
    });

    // Adiciona o jogador do nó inicial na lista de jogadores para o continente
    let continente_busca = territorios[territorio_busca].continente;
    jogadores_continente.push(territorios[territorio_busca].jogador);

    busca_continentes.push([territorios[territorio_busca].nome, territorios[territorio_busca].jogador]);

    while (fila.length > 0) {
        // Tira o nó da fila
        const no = fila.shift();

        // Analisa todos os nós que tem aresta com o nó retirado da lista
        for (const w of graph.ListaAdj.get(no)) {

            // Encontra o território na lista de territórios
            let t_v = territorios.findIndex(function (elem) {
                return elem.id == w;
            });

            // Só adiciona o território se ele for do mesmo continente do inicial que está procurando
            if (territorios[t_v].continente == continente_busca) {

                // Verifica se o vértice ainda não foi visitado
                if (!visitado[w]) {
                    // Marca o vértice como visitado e o adiciona na fila
                    visitado[w] = true;
                    fila.push(w);

                    // Adiciona o jogador do continente na lista de jogadores
                    jogadores_continente.push(territorios[t_v].jogador);
                    busca_continentes.push([territorios[t_v].nome, territorios[t_v].jogador]);
                }

            }
        }
    }

    let valor_jogador;

    // Valor para saber se está buscando apenas o continente para adicionar tropas ou objetivo
    if (jogador == 10) {
        valor_jogador = jogadores_continente[0];
    } else {
        valor_jogador = jogador;
    }

    //console.log(busca_continentes);

    // Verifica se todos os continentes (lista de jogadores por continente visitado) pertencem a um mesmo jogador
    if (jogadores_continente.every(value => value === valor_jogador)) {
        return valor_jogador;
    } else {
        return -1;
    }

}

let territorios_continentes = [1, 10, 14, 21, 27, 39]

// Analisa se um jogador possui um continente inteiro
function analisa_Bonus(jogadorAtual) {
    let valor_jogador, qtd = 0;

    // Adiciona 3 para cada continente a mais que o jogador possui
    for (let i = 0; i < territorios_continentes.length; i++) {
        valor_jogador = bfs_Continente(mapa, territorios_continentes[i]);
        if (valor_jogador == jogadorAtual) {
            qtd += 3;
        }
    }

    return qtd;
}

// Exporta o módulo necessário
module.exports = {
    territorios,
    jogadores,
    adicionarTropa,
    analisa_Bonus,
    bfs_Continente
}