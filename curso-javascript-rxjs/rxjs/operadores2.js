  
//concatAll() // gera uma stream de dados. Com um array por exemplo ele passa cada elemento dele

const { interval  } = require('rxjs');
const {XMLHttpRequest} = require('xmlhttprequest');
const { map , concatAll } = require('rxjs/operators');
const {ajax} = require('rxjs/ajax');

ajax({
    createXHR : () => new XMLHttpRequest() ,
    url:'https://api.github.com/users/cod3rcursos/repos'
}).pipe(
    
    map((response) => JSON.parse(response.xhr.responseText)) ,
    concatAll() ,
    map(repo => repo.full_name)
    
    
    )
    
    .subscribe(console.log);