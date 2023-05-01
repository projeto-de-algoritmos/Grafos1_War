import { Region } from 'src/app/interface/Region';
import { mapa, territorios } from './grafo';
import jogador_objetivo   from './objetivos-utils';
import { bfs_Continente } from './territorios-utils';

export function fim_Jogo(): number {

    for (let objetivo of jogador_objetivo.jogador_objetivo) {
        // Obtém o jogador e seu continente objetivo
        let check_jogador = objetivo.jogador;
        let check_continente = objetivo.objetivo.id;

        let fim_jogo = 0;

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

export function sistema_Ataque(territorioAtaque: Region, territorioDefesa: Region, jogadorAtaque: number): number {
    // Verifica se territórios são vizinhos
    if (mapa.ListaAdj.get(territorioAtaque.id).indexOf(territorioDefesa.id) === -1) {
        window.alert('Esses territórios não são vizinhos!');
        return -1;
    }

    if (territorioAtaque.owner != jogadorAtaque) {
        window.alert('Esse território não te pertence para realizar um ataque!');
        return -1;
    }

    if(territorioDefesa.owner == jogadorAtaque) {
        window.alert('Esse território já é seu! Você não pode atacar o próprio território')
        return -1
    }

    let ataque = 0,
    quantidade_Ataque = 0;
    let defesa = 0;

    if (territorioAtaque.tropas === 1) {
        window.alert('Você não pode atacar com 1 tropa!');
        return -1;
    } else if (territorioAtaque.tropas === 2) {
        quantidade_Ataque = 1;
        ataque += Math.floor(Math.random() * 6) + 1;
    } else if (territorioAtaque.tropas === 3) {
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

    if(territorioDefesa.tropas == 1) {
        defesa += Math.floor(Math.random() * 6) + 1;
    } else if (territorioDefesa.tropas === 2) {
        for (let i = 0; i < 2; i++) {
            defesa += Math.floor(Math.random() * 6) + 1;
        }
    } else if (territorioDefesa.tropas >= 3) {
        for (let i = 0; i < 3; i++) {
            defesa += Math.floor(Math.random() * 6) + 1;
        }
    }

    console.log(ataque, defesa);

    if (ataque > defesa) {
        window.alert('Seu ataque venceu!\n');
        territorioDefesa.tropas = territorioDefesa.tropas - quantidade_Ataque;
        if (territorioDefesa.tropas <= 0) {
            window.alert('E você ganhou o território!\n');
            territorioDefesa.owner = jogadorAtaque;
            territorioDefesa.tropas = 1;
        }
        return 1;
    } else {
        window.alert('Seu ataque perdeu!\n');
        territorioAtaque.tropas = territorioAtaque.tropas - quantidade_Ataque;
        return 0;
    }

}




