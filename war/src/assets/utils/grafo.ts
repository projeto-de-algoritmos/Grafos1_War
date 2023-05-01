// Definição do Território (Nó)
import { map } from '../map/mapa-war'
import { Region } from 'src/app/interface/Region';

class Graph {

    nVertices: number;
    ListaAdj : Map<any,any>

    // Construtor
    // Quantidade de Vértices
    // Cria a lista de Adjacência
    constructor(nVertices : number) {
        this.nVertices = nVertices;
        this.ListaAdj = new Map();
    }

    // Adiciona Vertice
    addVertice(v : number) {
        this.ListaAdj.set(v, []);
    }

    // Adiciona Aresta nos dois vértices (não-direcionado)
    addAresta(v : number, w : number) {
        this.ListaAdj.get(v).push(w);
        this.ListaAdj.get(w).push(v);
    }

    // Imprime o Grafo -> Apenas para saber se está correto...
    printGraph() {
        // Pega vértices
        const get_keys = this.ListaAdj.keys();

        // Itera nos vértices
        for (const i of get_keys) {
            // Pega as arestas para um vértice
            var get_values = this.ListaAdj.get(i);
            var conc = "";

            // Concatena as arestas do vértice
            for (const j of get_values)
                conc += j + " ";

            // Imprime o vértice e suas arestas
            console.log(i + " -> " + conc);
        }
    }
}

/**
 * Criação do Mapa
 */

// 42 territórios
const mapa = new Graph(42);

// Cria a lista dos territórios e adiciona como vértices no grafo
const territorios : Region[] = [];

map.continents.forEach(continent => {
    
    continent.regions.forEach(region => {
        
        // cria novo território -> jogador nulo e quantidade de tropas 0
        const novoT = {id: region.id,name: region.name, continentId: region.continentId, owner: 0, tropas: 0};
        
        // adiciona na lista de territórios
        territorios.push(novoT);
        
        // adiciona como vértice
        mapa.addVertice(novoT.id);
    })
    
});

console.log(territorios) 
console.log(mapa.ListaAdj)

// Adiciona as arestas (fronteiras)
for (const border of map.borders) {
    mapa.addAresta(border[0], border[1]);
}

// Exporta o módulo necessário
export { Graph, mapa, territorios }
