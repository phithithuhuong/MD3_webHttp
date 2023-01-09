const http = require('http');
const fs = require('fs');
const qs = require('qs');

http.createServer((req, res) => {
    if (req.method==='GET'){
        fs.readFile('./todo.html','utf8',(err, todoHtml)=>{
            if (err){
                console.log(err)
            }
            res.writeHead(200,{'Content-Type':'text.html'})
            res.write(todoHtml);
            return res.end();

        })
    }else {
        let data = '';
        req.on('data', chunk => {
            data+=chunk
        })
        req.on('end',()=>{
            const todo = qs.parse(data)
            console.log(todo);
            fs.readFile('./display.html','utf8',(err, displayHtml)=>{
                displayHtml= displayHtml.replace('{work}', todo.work)
                displayHtml= displayHtml.replace('{times}', todo.times)
                displayHtml= displayHtml.replace('{date}', todo.date)
                res.writeHead(200,{'Content-Type':'text.html'})
                res.write(displayHtml);
                return res.end();


            })
            req.on('error',()=>{
                console.log( 'This is error !')
            })



        })
    }
}).listen(3001,()=>{
    console.log('http://localhost:3001')
})