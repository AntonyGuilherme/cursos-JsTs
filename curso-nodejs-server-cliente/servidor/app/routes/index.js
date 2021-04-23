module.exports = function(application){
	application.get('/', function(req, res){
		res.render('sw');
		return;
		res.format({
			html : function(){
				res.send('Bem vindo a sua app NodeJS!');
			} ,
			json : function(){
				
				res.json({ body : 'Bem vindo a sua app NodeJS!'});
			}
		})
	});
	application.post('/', function(req, res){

		const values = req.body;

		res.format({
			html : function(){
				res.send(values);
			} ,
			json : function(){
				
				res.json({ body : values});
			}
		})
	});
}