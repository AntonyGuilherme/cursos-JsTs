const express = require('express');
const mongoDB = require('mongodb');
const multiparty = require('connect-multiparty');
const { ObjectID } = mongoDB;
const fs = require('fs');

const app = express();
const PORT = 8080

//coonfig body-parser
app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());
app.use(multiparty()); // capacidade para interpretar multiparty form data

//preflight - pré requisição para garantir a autorização em realizar algumas ações como put e delete
app.use(function(request,response,next){
    
    response.setHeader('Access-Control-Allow-Origin', "http://localhost"); // para qualquer dominíno pode-se utilizar *
    response.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE"); // indica quais methodos podem ser requisitados
    response.setHeader('Access-Control-Allow-Headers', "content-type"); // habilita a possibilade da requisição feia pela origem sobrescreva algum header
    response.setHeader('Access-Control-Allow-Credentials', true); // para qualquer dominíno pode-se utilizar *

    next();
})



app.listen(PORT);



console.log(`SERVER IS LISTENING IN PORT ${PORT}`);




class Connect {

    #_url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
    #_db = null;
    #_collection = null;
    constructor(db, collection) {

        if (!collection) {
            throw 'Collection not founded';
        }
        if (!db) {
            throw 'DB not founded';
        }

        this.#_collection = collection;
        this.#_db = db;
    }

    async getConnection() {
        return new mongoDB.MongoClient(this.#_url, { useUnifiedTopology: true }).connect()
            .then(mongoClient => ({ collection: mongoClient.db(this.#_db).collection(this.#_collection), mongoClient }));
    }



}

const connect = new Connect('instagram', 'postagens');

app.get('/', function (request, response) {
    response.send({ msg: 'Hello World' });
});


app.post('/api', function (request, response) {

    

    const { path, originalFilename } = request.files.arquivo;
    const comp_url = new Date().getTime() + '_' + originalFilename;
    const path_destiny = `./uploads/${comp_url}`;
    fs.rename(path, path_destiny , function(error){
        if(error){
            response.status(500).json({error});
            return;
        }

        const dados = {
            url_imagem : comp_url,
            titulo : request.body.titulo
        }

        connect.getConnection()
            .then(async ({ collection, mongoClient }) => {
                const result = await collection.insertOne(dados);
                mongoClient.close();
                response.json(result);
            })
            .catch(error => {
                response.json(error);
            });


    });

});


app.get('/imagens/:imagem',function(request,response){

    const img = request.params.imagem;
    fs.readFile(`./uploads/${img}`,function(err , content){

        if(err){
            response.status(400).json(err);
            return;
        }

        response.writeHead(200,{'content-type' : 'image/jpg'});
        response.end(content);

    })

})


app.get('/api', function (request, response) {

    
    
    connect.getConnection()
        .then(async ({ collection, mongoClient }) => {
            const result = await collection.find().toArray();
            mongoClient.close();
            response.status(200).json(result);
        })
        .catch(error => {
            response.status(500).json(error);
        });

})

app.get('/api/:_id', function (request, response) {

    connect.getConnection()
        .then(async ({ collection, mongoClient }) => {
            const result = await collection.find(ObjectID(request.params._id)).toArray();
            mongoClient.close();
            response.json(result);
        })
        .catch(error => {
            response.json(error);
        });


});


app.put('/api/:_id', function (request, response) {


     connect.getConnection()
         .then(async ({ collection, mongoClient }) => {
             const result = await collection.updateOne({ _id: ObjectID(request.params._id) }, 
             { $push: { comentarios : { id_comentario : new ObjectID() ,  comentario : request.body.comentario } } 
            });
             mongoClient.close();
             response.json(result);
         })
         .catch(error => {
             response.json(error);
         });


});


app.delete('/api/:_id', function (request, response) {

    connect.getConnection()
        .then(async ({ collection, mongoClient }) => {
            const result = await collection.updateOne({} , {$pull : { comentarios: { id_comentario : ObjectID(request.params._id) } } });
            mongoClient.close();
            response.json(result);
        })
        .catch(error => {
            response.json(error);
        });

});