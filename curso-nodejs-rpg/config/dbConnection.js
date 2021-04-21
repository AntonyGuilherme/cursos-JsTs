
const { response } = require('express');
const mongo = require('mongodb');
const connect = async function(){

    const db = new mongo.MongoClient('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useUnifiedTopology: true });

    return db.connect();
}

module.exports = () => connect;