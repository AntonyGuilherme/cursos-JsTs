// Closure é qunado uma função 'lembra' seu escopo léxico , mesmo quando a função
// é executada fora desse escopo léxico

//Isso quer dizer que a função consegue acessar os dados no escopo onde a função foi escrita

import {somarx} from './closure_escopo.mjs';

console.log(somarx()());