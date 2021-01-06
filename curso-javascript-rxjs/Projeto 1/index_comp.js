
const path = require('path');
const caminho = path.join(__dirname, 'legendas');

const ReadFiles = require('./functions');
const RF = new ReadFiles();
const symbols = ['.', '?', '"', '-', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'];


//Execução alternativa

const composition = (...func) => (inicial) => func.reduce(async (acc, fun) => fun(Promise.resolve(acc) === acc ? await acc : acc), inicial);


console.time('#2');
RF.readFilesPath(caminho)
.then(RF.filterExtension('srt')) //filtranto peos paths com finais str
.then(RF.readFilesContent) //lendo os conteúdos
    .then(RF.joinContent(' ')) // juntando o conteudo em uma grande string
    .then(RF.splitContent('\n')) //criando um array com o separador \n
    .then(RF.removeEmptyElement) // removendo linhas vazias
    .then(RF.removeIfHave('-->')) //removendo as linhas que contenham -->
    .then(RF.removeIfOnlyNumber) // removendo as linhas que contenham somente números
    .then(RF.removeChars(symbols)) //removendo symbols
    .then(RF.joinContent(' ')) //juntando todo o conteúdo
    .then(RF.splitContent(' ')) //seprando por palavra
    .then(RF.removeEmptyElement) //retirando as palavras vazias
    .then(RF.removeIfOnlyNumber) //removendo os números
    .then(RF.groupBy) // encontrando a quantidade de vezes em que a palavra é citada
    .then(RF.orderBy(1)) //ordenando pelo quantidade de citações
    .then(console.log);
    
console.timeEnd('#2');


console.time('#1');
const startComposition = composition(
    RF.readFilesPath, RF.filterExtension('srt'), RF.readFilesContent, RF.joinContent(' '), RF.splitContent('\n'),
    RF.removeEmptyElement, RF.removeIfHave('-->'), RF.removeIfOnlyNumber, RF.removeChars(symbols), RF.joinContent(' '),
    RF.splitContent(' '), RF.removeEmptyElement, RF.removeIfOnlyNumber, RF.groupBy, RF.orderBy(1)
);
startComposition(caminho).then(console.log).catch(console.log);
console.timeEnd('#1');

