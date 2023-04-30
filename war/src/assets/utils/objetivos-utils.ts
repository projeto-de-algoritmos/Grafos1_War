
import { jogadores } from './territorios-utils';

interface JogadorObjetivo {
    jogador: number;
    objetivo: { descricao: string, id: number};
}

let jogador_objetivo : JogadorObjetivo[] = [];

// Lista de objetivos -> Salva o id de cada continente
const objetivos: {descricao: string,id: number}[] = [
    {
        descricao: 'Conquistar a Ásia',
        id: 5
    }, 
    {
        descricao: 'Conquistar a América do Norte',
        id: 1
    }, 
    {
        descricao: 'Conquistar a América do Sul',
        id: 2
    }, 
    {
        descricao: 'Conquistar a Oceania',
        id: 6
    }, 
    {
        descricao: 'Conquistar a Europa',
        id: 3
    }, 
    {
        descricao: 'Conquistar a África',
        id: 4
    }
];

// Embaralha a lista de objetivos
let objetivoIndex = [...objetivos].sort(() => { return Math.random() - 0.5} );

// Adiciona uma lista de objetivos com os jogadores e seus respetivos objetivos.
jogadores.forEach((jogador, index) => {
    jogador_objetivo.push({ jogador: jogador, objetivo: objetivoIndex[index] });
})

// Exporta o módulo necessário
export default {
    jogador_objetivo
};