const http = require('http');
const fs = require('fs');
const qs = require('qs');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./index.html', "utf8", (err, data) => {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return req.end;
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data = data + chunk
            console.log( data)
            //bắt sự kiện (lấy thông tin trong ô input)
        })
        req.on('end',()=>{
            const userInfo = qs.parse(data);
            console.log(userInfo)
            fs.readFile('./info.html','utf8',(err, infoHtml)=>{
                if (err){
                    console.log(err)
                }
                    infoHtml= infoHtml.replace('{name}', userInfo.name)
                    infoHtml= infoHtml.replace('{email}', userInfo.email)
                    infoHtml= infoHtml.replace('{password}', userInfo.password);
                // thay thông tin bằng giá trị người nhập
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(infoHtml);
                  return res.end()

            })
        })
        req.on('error',()=>{
            console.log('error')
        })

    }

}).listen(3000,()=>{
    console.log('Server is running http://localhost:3000')
})
