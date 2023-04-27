/**
 * Autor: '@victorleaoo'
 * Esse arquivo implementa funções importantes em relação a objetivos:
 * - Atribui objetivos para os jogadores.
 */

const { jogadores } = require('./territorios-utils.js');

jogador_objetivo = [];

// Lista de objetivos -> Salva o id de cada continente
const objetivos = [['Conquistar a América do Sul', 2], ['Conquistar a Ásia', 5], ['Conquistar a América do Norte', 1], ['Conquistar a Oceania', 6], ['Conquistar a Europa', 3], ['Conquistar a África', 4]];

// Embaralha a lista de objetivos
let objetivoIndex = objetivos.sort(function () {
    return Math.random() - 0.5;
});

// Adiciona uma lista de objetivos com os jogadores e seus respetivos objetivos.
for (let i = 0; i < jogadores.length; i++) {
    jogador_objetivo.push({ 'jogador': i, 'objetivo': objetivoIndex[i] });
}

// Exporta o módulo necessário
module.exports = {
    jogador_objetivo
};