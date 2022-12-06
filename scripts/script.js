'use strict';

import {Financiamento} from './financiamento.js';
import {FinanciamentoCarencia} from './financiamentoCarencia.js';

const comCarencia = document.querySelector('#comCarencia');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const botaoCalcular = document.querySelector('#botaoCalcular');
const textoValor = document.querySelector('#textoValor');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');
const botaoSimulacao = document.querySelector('#botaoSimulacao');
const resultados = document.querySelector('#resultados');

function limpaCorpoTabela() {
    while(corpoTabela.firstChild) {
        corpoTabela.removeChild(corpoTabela.firstChild);
    }
}

comCarencia.addEventListener('change', function() {
    if(this.checked) {
        listaSuspensa.style.visibility = 'visible';
    } else {
        listaSuspensa.style.visibility = "hidden";
    }
});

botaoCalcular.addEventListener('click', function() {
    limpaCorpoTabela();
    const valor = parseFloat(textoValor.value);
    const entrada = parseFloat(textoEntrada.value);
    const taxaJuros = parseFloat(textoTaxaJuros.value);
    const prazo = parseFloat(textoPrazo.value);
    let simulacao;
    if(comCarencia.checked) {
        const carencia = parseInt(listaSuspensa.value);
        simulacao = new FinanciamentoCarencia(valor,entrada,taxaJuros,prazo,carencia);
    } else {
        simulacao = new Financiamento(valor,entrada,taxaJuros,prazo);
    }
    simulacao.calcParcelasMensais();
    simulacao.exibeParcelas();

    resultados.style.visibility = 'visible';
    botaoCalcular.style.visibility = 'hidden';
    if(comCarencia.cheked == false) {
        carencia.style.visibility = 'hidden';
    }
});

botaoSimulacao.addEventListener('click', function() {
    textoValor.value = "";
    textoEntrada.value = "";
    textoTaxaJuros.value = "";
    textoPrazo.value = "";
    comCarencia.checked = false;
    listaSuspensa.style.visibility = 'hidden';

    while (corpoTabela.firstChild) {
        corpoTabela.firstChild.remove();
    }

    resultados.style.visibility = 'hidden';
    botaoCalcular.style.visibility = 'visible';
    carencia.style.visibility = 'visible';
});