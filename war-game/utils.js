/**
 * Autor: '@victorleaoo'
 * Esse arquivo implementa funções importantes, mas sem um módulo específico
 * - fim_Jogo: Verifica se um jogador ganhou a partida ou não (seu objetivo foi alcançado)
 */

const { mapa, territorios } = require('./grafo.js');
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

function sistema_Ataque(territorioAtaque, territorioDefesa, jogadorAtaque) {

    // Verifica se territórios são vizinhos
    if (mapa.ListaAdj.get(territorioAtaque.id).indexOf(territorioDefesa.id) === -1) {
        console.log('Esses territórios não são vizinhos!\n');
        return -1;
    }

    if (territorioAtaque.jogador != jogadorAtaque) {
        console.log('Esse território não te pertence para realizar um ataque!\n');
        return -1;
    }

    let ataque = 0, quantidade_Ataque = 0;
    let defesa = 0;

    if (territorioAtaque.tropas == 1) {
        console.log('Você não pode atacar com 1 tropa!\n');
        return -1;
    } else if (territorioAtaque.tropas == 2) {
        quantidade_Ataque = 1;
        ataque += Math.floor(Math.random() * 6) + 1;
    } else if (territorioAtaque.tropas == 3) {
        for (let i = 0; i < 2; i++) {
            quantidade_Ataque = 2;
            ataque += Math.floor(Math.random() * 6) + 1;
        }
    } else {
        for (let i = 0; i < 3; i++) {
            quantidade_Ataque = 3;
            ataque += Math.floor(Math.random() * 6) + 1;
        }
    }

    if (territorioDefesa.tropas == 2) {
        defesa += Math.floor(Math.random() * 6) + 1;
    } else if (territorioDefesa.tropas == 3) {
        for (let i = 0; i < 2; i++) {
            defesa += Math.floor(Math.random() * 6) + 1;
        }
    } else {
        for (let i = 0; i < 3; i++) {
            defesa += Math.floor(Math.random() * 6) + 1;
        }
    }

    console.log(ataque, defesa);

    if (ataque > defesa) {
        console.log('Seu ataque venceu!\n');
        territorioDefesa.tropas = territorioDefesa.tropas - quantidade_Ataque;
        if (territorioDefesa.tropas <= 0) {
            console.log('E você ganhou o território!\n');
            territorioDefesa.jogador = jogadorAtaque;
            territorioDefesa.tropas = 1;
        }
        return 1;
    } else {
        console.log('Seu ataque perdeu!\n');
        territorioAtaque.tropas = territorioAtaque.tropas - quantidade_Ataque;
        return 0;
    }
}

module.exports = {
    fim_Jogo,
    sistema_Ataque
}