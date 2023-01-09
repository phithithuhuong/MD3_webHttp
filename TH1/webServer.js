const  http = require('http');
const server=  http.createServer((req, res)=>{
    res.write(`<h1>Pain in me :((</h1>`);
    res.end();

})
server.listen(8080,()=>{
    console.log('server is running http://localhost:8080')
})