
const path = require('path');
const caminho = path.join(__dirname, 'legendas');
const _ = require('lodash');
const { toArray, map } = require('rxjs/operators');

const ReadFiles = require('./functions');
const RF = new ReadFiles();
const symbols = ['.', '?', '"', '-', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')' , '!'];







RF.readFilesPath(caminho)
.pipe(
    RF.filterExtension('.srt'),//filtranto peos paths com finais str
    RF.readFilesContent() , //lendo os conteúdos
    RF.splitContent('\n'),
    RF.removeEmptyElement(), // removendo linhas vazias
    RF.removeIfStartsWithNumber(),  // removendo as linhas que contenham somente números
    RF.removeChars(symbols) ,  //removendo symbols
    RF.splitContent(' '),  //seprando por palavra
    RF.removeEmptyElement(), // removendo elementos vazios
    RF.removeIfStartsWithNumber(),  // removendo as linhas que contenham somente números
    toArray(), // tranforma a stream de dados em um array
    RF.groupBy(),
    map(array => _.sortBy(array , el => -el.qtde))
    )

    .subscribe(console.log);



