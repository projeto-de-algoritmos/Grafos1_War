/**
 * Autor: '@victorleaoo'
 * Esse arquivo implementa funções importantes, mas sem um módulo específico
 * - fim_Jogo: Verifica se um jogador ganhou a partida ou não (seu objetivo foi alcançado)
 */

const { mapa } = require('./grafo.js');
const { jogador_objetivo } = require('./objetivos-utils.js');
const { bfs_Continente } = require('./territorios-utils.js');

function fim_Jogo() {
    for (let i = 0; i < jogador_objetivo.length; i++) {
        // Obtém o jogador e seu continente objetivo
        let check_jogador = jogador_objetivo[i].jogador;
        let check_continente = jogador_objetivo[i].objetivo[1];

        let fim_jogo = false;

        // Switch Case para cada continente e analisa se o jogador ganhou ou não (retorna o número do jogador)
        switch (check_continente) {
            case 1:
                fim_jogo = bfs_Continente(mapa, 1, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;

            case 2:
                fim_jogo = bfs_Continente(mapa, 10, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;

            case 3:
                fim_jogo = bfs_Continente(mapa, 14, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;

            case 4:
                fim_jogo = bfs_Continente(mapa, 21, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;

            case 5:
                fim_jogo = bfs_Continente(mapa, 27, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;

            case 6:
                fim_jogo = bfs_Continente(mapa, 39, check_jogador);
                if (fim_jogo == check_jogador) {
                    return check_jogador;
                }
                break;
        }
    }

    // Caso nenhum jogador tenha ganhado o jogo
    return -1;
}

module.exports = {
    fim_Jogo
}