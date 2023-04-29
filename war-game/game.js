/**
 * Autor: '@victorleaoo'
 * Esse arquivo executa o jogo chamando funções de outros módulos.
 * Funciona como uma main.
 */

const prompt = require("prompt-sync")();

// Módulo Grafo -> 
// ----> Struct de Território
// ----> Mapa do jogo (Grafo) 
// ----> Lista de territórios
const { mapa } = require('./grafo.js');
//mapa.printGraph(); -> OK

// Módulo de Territórios -> 
// ----> Distribui eles entre jogadores inicialmente iguais 
// ----> Adição inicial das 5 tropas do jogador
const { territorios, adicionarTropa, jogadores, analisa_Bonus, bfs_Continente } = require('./territorios-utils.js');
//console.log(territorios); -> OK

// Módulo de Objetivos ->
// ----> Distribui os objetivos entre os jogadores
const { jogador_objetivo } = require('./objetivos-utils.js');
//console.log(jogador_objetivo); -> OK

// Módulo de Utils ->
// ----> Função de Fim de Jogo
const { fim_Jogo, sistema_Ataque } = require('./utils.js');
//console.log(fim_Jogo()); -> OK

let jogador_vencedor = -1;

// Jogo roda em um loop até um jogador ser vencedor
while (jogador_vencedor == -1) {
    // Cada jogador joga uma rodada
    for (let i = 0; i < jogadores.length; i++) {
        // O padrão é adicionar 5 tropas por jogador
        let quantidadeTropasRestante = 5;
        // Analisa o bônus de 3 territórios a mais por jogador por continente que ele tem
        let bonus = analisa_Bonus(i);
        quantidadeTropasRestante += bonus;
        console.log(quantidadeTropasRestante);

        // Jogador pode alocar suas tropas nos seus territórios
        console.log('\n------- Vez do Jogador ' + i + ' Alocar suas Tropas -------\n');

        // Enquanto o jogador ainda tem 1+ tropas para adicionar
        while (quantidadeTropasRestante > 0) {
            console.log('\nSeus territórios são: ');

            let jogador_territorios = territorios.filter((territorio) => territorio.jogador === i);

            // Lista território
            for (let j = 0; j < jogador_territorios.length; j++) { // Cada jogador tem 7 territórios no início (em ordem)
                console.log("Id: " + jogador_territorios[j].id + " - Nome: " + jogador_territorios[j].nome + " - Tropas:" + jogador_territorios[j].tropas);
            }

            var territorioAdicionar = prompt("Qual território deseja adicionar tropas? (coloque o id) ");

            // Encontra território
            let t = territorios.findIndex(function (elem) {
                return elem.id == territorioAdicionar;
            });

            // Adiciona tropa ao território
            quantidadeTropasRestante = adicionarTropa(t, i, quantidadeTropasRestante);
        }

        console.log('\n');

        // ATAQUE
        var ataque = prompt("Você deseja realizar algum ataque? (0 para NÃO e 1 para SIM) ");
        var continuaAtaque = 1;
        while (continuaAtaque == 1) {
            if (ataque == 1) {
                let jogador_territorios = territorios.filter((territorio) => territorio.jogador === i);

                // Lista território
                for (let j = 0; j < jogador_territorios.length; j++) { // Cada jogador tem 7 territórios no início (em ordem)
                    console.log("Id: " + jogador_territorios[j].id + " - Nome: " + jogador_territorios[j].nome + " - Tropas:" + jogador_territorios[j].tropas);

                    console.log('Territórios possíveis de ataque para esse território: ');

                    let vizinhos = mapa.ListaAdj.get(jogador_territorios[j].id);
                    for (let i = 0; i < vizinhos.length; i++) {
                        // Encontra território
                        let t_vz = territorios.findIndex(function (elem) {
                            return elem.id == vizinhos[i];
                        });

                        console.log("\t -> " + "Id: " + territorios[t_vz].id + " - Nome: " + territorios[t_vz].nome + " - Tropas:" + territorios[t_vz].tropas);
                    }

                    console.log('\n');

                }

                var territorioAtaque = prompt("Coloque o ID do SEU território que deseja usar para atacar. ");
                territorioAtaque = territorios.findIndex(function (elem) {
                    return elem.id == territorioAtaque;
                });

                var territorioDefesa = prompt("Coloque o ID do SEU território que deseja atacar. ");
                territorioDefesa = territorios.findIndex(function (elem) {
                    return elem.id == territorioDefesa;
                });

                let definicaoAtaque = sistema_Ataque(territorios[territorioAtaque].id, territorios[territorioDefesa].id, i);

                continuaAtaque = prompt("Você deseja realizar mais algum ataque? (0 para NÃO e 1 para SIM) ");
            }
        }

    }
    // No fim da rodada analisa se um jogador ganhou o jogo ou não
    jogador_vencedor = fim_Jogo();
}

// Quando o loop é quebrado, um jogador venceu o jogo
console.log(' ----------------- FIM DE JOGO -----------------\n');
console.log('Parabéns ao Jogador ' + jogador_vencedor + '!\nVocê ganhou o jogo por completar o seu objetivo: ' + jogador_objetivo[jogador_vencedor].objetivo[0]);