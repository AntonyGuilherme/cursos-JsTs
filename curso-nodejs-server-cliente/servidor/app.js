/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(80, function(){
	console.log('Servidor online');
	const axios = require('axios');
	axios.default.put('http://localhost:3000/').then(console.log).catch((error) => console.log(error.response.status , error.response.statusText , error.response.headers ))
	
});

