
const path = require('path');
const caminho = path.join(__dirname, 'legendas');
const _ = require('lodash');
const { toArray, map , mergeMap, groupBy, reduce } = require('rxjs/operators');
const { from } = require('rxjs');
const ReadFiles = require('./functions');
const RF = new ReadFiles();
const symbols = ['.', '?', '"', '-', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')' , '!'];


    // margeMap

    const obs1 = from([1,2,3,4,5,6]);
    const obs2 = from([1,2,3,4,5,6]);

    obs1
    .pipe(
        mergeMap(n => obs2.pipe(map(n2 => `${n} => ${n2}`)))
        )
    .subscribe(console.log)






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
    groupBy(el => el),
    mergeMap(grupo => grupo.pipe(toArray())),
    map(palavras => ({elemento : palavras[0] , qtde : palavras.length})),
    toArray(),
    map(array => _.sortBy(array, el => -el.qtde))
    )

    .subscribe(console.log);






