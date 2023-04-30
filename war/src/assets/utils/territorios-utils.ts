import { Graph, mapa, territorios } from './grafo';

// Lista de jogadores -> 1 a 6
export let jogadores: number[] = [0, 1, 2, 3, 4, 5];

// Embaralha a lista de territórios
let territorios_random = territorios.sort(function () {
    return Math.random() - 0.5;
});

let idx = 0;
let new_idx = 0;

// Distribui os territórios entre os jogadores, atualiza a lista de territórios adicionando o jogador de cada território (está embaralhada, mas ordenada por jogador)
for(const jogador of jogadores) {
    
    // Pega os territórios aleatórios que serão atribuídos os jogadores
    let territoriosJogador = territorios_random.slice(idx, idx + (Math.floor(territorios.length / jogadores.length)));

    // Atualiza os territórios com o jogador e 1 tropa
    for (const territorio of territoriosJogador) {

        territorios[new_idx] = {
            id: territorio.id, 
            name: territorio.name, 
            continentId: territorio.continentId, 
            owner: jogador, 
            tropas : 1
        }

        new_idx += 1;
    }

    idx += Math.floor(territorios.length / jogadores.length);
}


// Analisa a lista de jogadores para os territórios de um continente
let jogadores_continente: number[] = [];
// Para debug/melhor visualização
let busca_continentes  = [];
    
// BFS que analisa um continente inteiro
function bfs_Continente(graph: Graph, noInicio: number, jogador = 10) {
    

    // Fila da BFS e array de visitados
    const fila: number[] = [];
    const visitado: boolean[] = new Array(graph.nVertices).fill(false);
    
    // O nó inicial é visitado e o primeiro na fila
    visitado[noInicio] = true;
    fila.push(noInicio);
    
    // Encontra o continente que está sendo analisado a partir de um país.
    const territorio_busca = territorios.findIndex(elem => elem.id === noInicio);
    
    // Adiciona o jogador do nó inicial na lista de jogadores para o continente
    const continente_busca = territorios[territorio_busca].continentId;
    jogadores_continente.push(territorios[territorio_busca].owner);
    
    busca_continentes.push([territorios[territorio_busca].name, territorios[territorio_busca].owner]);
    
    while (fila.length > 0) {
        // Tira o nó da fila
        const no = fila.shift();
    
        // Analisa todos os nós que tem aresta com o nó retirado da lista
        for (const w of graph.ListaAdj.get(no)) {
    
            // Encontra o território na lista de territórios
            const t_v = territorios.findIndex((elem) => elem.id === w);

            // Só adiciona o território se ele for do mesmo continente do inicial que está procurando
            if (territorios[t_v].continentId === continente_busca) {

                // Verifica se o vértice ainda não foi visitado
                if (!visitado[w]) {
                    // Marca o vértice como visitado e o adiciona na fila
                    visitado[w] = true;
                    fila.push(w);

                    // Adiciona o jogador do continente na lista de jogadores
                    jogadores_continente.push(territorios[t_v].owner);
                    busca_continentes.push([territorios[t_v].name, territorios[t_v].owner]);
                }

            }
        }
    }
    
    let valor_jogador : number;

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
function analisa_Bonus(jogadorAtual : number) {
    let valor_jogador, qtd = 0;

    // Adiciona 3 para cada continente a mais que o jogador possui
    for(const territorio_continente of territorios_continentes){

        valor_jogador = bfs_Continente(mapa, territorio_continente);
        
        if (valor_jogador == jogadorAtual) {
            qtd += 3;
        }

    }

    return qtd;
}

                    
export {
    bfs_Continente,
    analisa_Bonus
}