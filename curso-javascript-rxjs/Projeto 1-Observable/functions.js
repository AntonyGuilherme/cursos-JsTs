
const fs = require('fs');
const path = require('path');
const { Observable } = require('rxjs');


class ReadFiles {

    constructor() {

    }


    /**
     * 
     * @param { string } caminho caminho dos arquivos
     * @returns {Observable<string>}
     */

    readFilesPath(caminho) {
        return new Observable(subscriber => {

            try {

                //passando os arquivos por meio de uma stream de dados

                const arquivos = fs.readdirSync(caminho);
                arquivos.forEach(element => {
                    subscriber.next(path.join(caminho, element));
                });

                subscriber.complete();

            } catch (e) {
                subscriber.error(e);
            }
        });
    }


    filterExtension(std) {

        return createPipebableOperator(subscriber => ({
            next(texto) {
                if (texto.endsWith(std)) {
                    subscriber.next(texto);
                }
            }
        }))

    }

     readFilesContent() {

        return createPipebableOperator(subscriber => ({

            next(pathFile){
                try {
                    
                    const content = fs.readFileSync(pathFile,{encoding : 'utf-8'});
                    subscriber.next(content.toString());
                    subscriber.complete();

                } catch (error) {

                    subscriber.error(error);
                    
                }
            }


        }))

    }

    removeEmptyElement() {
        return createPipebableOperator(subscriber => ({

            next(text){
                if(text.trim()){
                    subscriber.next(text);
                }
            }


        }))

    }

    removeIfHave(std) {

        return (pathFiles) => pathFiles.filter(element => !element.includes(std));

    }

    removeIfStartsWithNumber() {
        return createPipebableOperator(subscriber => ({

            next(text){

                const num = parseInt(text.trim());
                if(num !== num){
                    subscriber.next(text);
                }
                
            }

        }));
    }


    removeChars(chars) {

        return createPipebableOperator(subscriber => ({

            next(text){

                subscriber.next(chars.reduce((acc, char) => acc.split(char).join(''), text));
                
            }

        }));

    }

    joinContent(symbol) { return contents => contents.join(symbol) };


    splitContent_(symbol) { return contentString => contentString.split(symbol) };
    
    splitContent(symbol) { 
        
        return createPipebableOperator(subscriber => ({

            next(text){
                text.split(symbol).forEach(item => subscriber.next(item));
            }

        }))
    
    };



    groupBy() {

        return createPipebableOperator(subscriber => ({

            next(palavras){
                const agrupado = Object.values(
                    palavras.reduce((acc,palavra) => {

                        const el = palavra.toLowerCase();
                        const qtde = acc[el] ? acc[el].qtde + 1 : 1;
                        acc[el] = { elemento : el , qtde};
                        return acc;
                    }
                
                    , {} ) );

                subscriber.next(agrupado);
            }
            
        }))

    }


    /**
     * 
     * @param {*} ordem padrão descendente
     *  
     */
    orderBy(ordem = 1) {

        return function (vector) {
            const desc = (a, b) => ordem * (b[1] - a[1]);
            return vector.sort(desc)
        }


    }

}


function createPipebableOperator(operatorFn) {

    return function (source) {

        return new Observable(subscriber => {

            const sub = operatorFn(subscriber);
            source.subscribe({
                next: sub.next,
                error: sub.error || (e => subscriber.error(e)),
                complete: sub.complete || (e => subscriber.complete(e))
            });

        });
    }

}



module.exports = ReadFiles;


