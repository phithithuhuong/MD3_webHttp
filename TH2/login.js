const http= require ('http');

http.createServer((req, res) => {
    let pars= ''
    if (req.url==='/login'){
        pars= 'Login is success'

    }else {
        pars= 'Login is fail'
    }
    res.end(pars)
}).listen(8000,()=>{
    console.log('ok')
    }

)