const http = require('http');

// ? npm i name@latest -save -> traz os arquivos de fato para o projeto
// ? facilitando por exemplo para outras pessoas utilizarem nosso código
// ? posteriormente somente executando o npm install ele vai instalar todos os pacotes com o -save


/**
 * @Node plataforma que executa códigos js
 * @express Um framework NODEjs para aplicações web com intuito de por exemplo criar rotas otimizar as respostas do servidor
 * @EJS Uma linguagem de modelagem para a criação de páginas HTML utilizando js
 * @NodeMom reinicializa o servidor quando detecta alguma alteração
 * @npm Gerenciador de pacotes JS
 * @ejs Processador de páginas html
 */

const server = http.createServer((request, response) => {

    const categoria = request.url;

    if (categoria == '/tecnologia')
        response.end('<html><body>Tecnologia</body></html>');
    else if (categoria == '/computadores')
        response.end('<html><body>Computadores</body></html>');
    else
        response.end('<html><body>Portal de Noticias</body></html>');

});

server.listen(3000);