const express = require('express')
const request = require('request')
const app = express()
const port = 3000


const servers = ['http://54.212.14.156:3000', 'http://34.222.32.96:3000', 'http://54.218.49.244:3000']
let cur = 0;

app.all('*', (req, res) => {
  req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
