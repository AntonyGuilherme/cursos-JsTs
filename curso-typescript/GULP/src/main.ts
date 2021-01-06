import $ from 'jquery';
import Livro from './model/livro';


const livro = new Livro('Dom Quixote',100.80,0.90);

$('body').append(`<h1>${livro.nome}</h1>`);
$('body').append(`<h2>${livro.preco}</h2>`);