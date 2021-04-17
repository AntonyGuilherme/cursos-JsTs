// Importar as confgurações do servidor 
const app = require('./config/server');

// configurando a porta de escuta
const server = app.listen(80, () => console.log('Servidor Online'));

/*Socket.IO - não funciona com o protocolo http */
const io = require('socket.io').listen(server);

app.set('io', io);


//Criando a conexão por websocket
//on('nome',function(){}) - escuta pedidos
//emit('nome',/*qualquer coisa*/) - pedido de execução 

io.on('connection', function (socket) {

    console.log('User connected');

    socket.on('disconnect', function () {
        console.log('Usuário desconectado')
    });

    socket.on('msgParaServidor', function ({ apelido, mensagem,  apelido_atualizado_nos_clientes}) {
        
        socket.emit('msgParaCliente', { apelido, mensagem });
        
        //emite o evento para todos os outros demais usuários conectados,
        // ou seja, quem emitiu não receberá o evento
        socket.broadcast.emit('msgParaCliente', { apelido, mensagem });
        


        if(apelido_atualizado_nos_clientes == 0){
            socket.emit('participantesParaCliente', { apelido });
            socket.broadcast.emit('participantesParaCliente', { apelido });
        }
        

    });

});