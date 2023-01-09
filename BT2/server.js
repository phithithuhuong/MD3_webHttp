const http = require('http');
const fs = require('fs');
const qs = require('qs');
http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./calculator.html', 'utf8', (err, dataHtml) => {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, {'Content-Type': 'text.html'})
            res.write(dataHtml);
            return res.end()
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        console.log(data)
        req.on('end', () => {
            const number = qs.parse(data);
            console.log(number)
            let sum = 0
            // if (number.math === '+') {
            //     sum = (Number(number.a) + Number(number.b));

            // }
            switch (number.math) {
                case '+':
                    sum = (Number(number.a) + Number(number.b));
                    break;
                case '-':
                    sum = (Number(number.a) - Number(number.b));
                    break;
                case 'x':
                    sum = (Number(number.a) * Number(number.b));
                    break;
                case '/':
                    sum = (Number(number.a) /Number(number.b));
                    break;

            }


            fs.readFile('./result.html', 'utf8', (err, resultHtml) => {
                resultHtml = resultHtml.replace('{result}', sum);
                res.writeHead(200, {'Content-Type': 'text.html'});
                res.write(resultHtml);
                res.end()

            })

        })
        req.on('error', () => {
            console.log('This is error !')
        })
    }

}).listen(1000, () => {
    console.log('http://localhost:1000')
})