

module.exports.home = (app,request,response) =>{
    response.render('index.ejs' , {validacao : []});
}