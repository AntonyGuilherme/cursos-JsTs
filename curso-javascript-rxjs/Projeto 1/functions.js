
const fs = require('fs');
const path = require('path');


class ReadFiles {

    constructor() {

    }

    readFilesPath(caminho) {
        return new Promise((resolve, reject) => {

            const arquivos = fs.readdirSync(caminho);

            if (arquivos.length)
                resolve(arquivos.map(element => path.join(caminho, element)));
            else
                reject('Nenhum arquivo encontrado');
        });
    }

    filterExtension(std) {

        return (pathFiles) => pathFiles.filter(element => element.endsWith(std));

    }

    async readFilesContent(PathsFiles) {

        const readFileContent = (pathfile) => new Promise((resolve, reject) => {

            try {
                const filecontent = fs.readFileSync(pathfile, { encoding: 'utf-8' }).toString();
                resolve(filecontent);
            }
            catch (error) {
                reject(error);
            }

        });


        try {
            const Contents = await Promise.all(PathsFiles.map(readFileContent));

            return Contents;
        }

        catch (error) { return error; };



    }

    removeEmptyElement(vector) {

        return vector.filter(el => el.trim()); // trim remove os espaços vazios

    }

    removeIfHave(std) {

        return (pathFiles) => pathFiles.filter(element => !element.includes(std));

    }

    removeIfOnlyNumber(vector) {
        return vector.filter(element => !Number(element));
    }


    removeChars(chars) {

        return (lines) => lines.map(line => chars.reduce((acc,char)=> acc.split(char).join(''),line));
        
                    // let newline = line;
                    // chars.forEach(char => newline = newline.split(char).join(''));
                    // return newline;
        
    }

    joinContent(symbol) { return contents => contents.join(symbol) };

    splitContent(symbol) { return contentString => contentString.split(symbol) };

    groupBy(palavras) {

        return Object.entries(palavras.reduce((acc, palavra) => {

            const p = palavra.toLowerCase();

            if (acc.hasOwnProperty(p))
                acc[p] += 1;
            else
                acc[p] = 1;

            return acc;


        }, {}));



    }

    /**
     * 
     * @param {*} ordem padrão descendente
     *  
     */
    orderBy(ordem=1){

        return function (vector){
            const desc = (a ,b) => ordem*(b[1] - a[1]) ;
            return vector.sort(desc)
        }


    }

}


module.exports = ReadFiles;


