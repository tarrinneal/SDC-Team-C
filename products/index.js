const express = require('express')
const app = express()
const port = 3000

const db = require('./db.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products/:product_id', (req, res) => {
  debugger;
  db.getProduct(+req.params.product_id, (err, data) => {
      debugger;
      res.send(data)
    })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

