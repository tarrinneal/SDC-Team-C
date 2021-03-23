const express = require('express')
require('newrelic');
const app = express()
const port = 3000

const db = require('./db.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products/:product_id', (req, res) => {
  db.getProduct(+req.params.product_id, (err, data) => {

    let { product_id, name, slogan, description, category, default_price, created_at, updated_at, features, feature_values } = data;
    let response = {
      product_id,
      name,
      slogan,
      description,
      category,
      default_price,
      created_at,
      updated_at,
    }
    let featuresArr = [];
    for (let i = 0; i < features.length; i++) {
      featuresArr.push({
        feature: features[i],
        value: feature_values[i] || null
      })
    }
    response.features = featuresArr;
    res.send(response)
  })
})

app.get('/products/:product_id/related', (req, res) => {
  db.getProduct(+req.params.product_id, (err, data) => {
    res.send(data.related_products)
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  db.getStyles(+req.params.product_id, (err, data) => {
    let response = [];
    data.forEach(style => {
      currStyle = {
        style_id: style.style_id,
        product_id: style.product_id,
        name: style.name,
        //should these be numbers?
        original_price: style.original_price,
        sale_price: style.sale_price === "null" ? null : style.sale_price,
        'default?': style.default_style,
        skus: {},
        photos: []
      }
      for (let i = 0; i < style.sku_id.length; i++) {
        let currSku = {
          size: style.sku_size[i],
          quantity: style.sku_quantity[i]
        };
        currStyle.skus[style.sku_id[i]] = currSku
      }
      for (let i = 0; i < style.sku_id.length; i++) {
        let currSku = {
          size: style.sku_size[i],
          quantity: style.sku_quantity[i]
        };
        currStyle.skus[style.sku_id[i]] = currSku
      }
      for (let i = 0; i < style.photo_urls.length; i++) {
        let currPhoto = {
          url: style.photo_urls[i],
          thumbnail_url: style.photo_thumbnail_urls[i]
        };
        currStyle.photos.push(currPhoto)
      }
      response.push(currStyle)
    })
    res.send(response)
  })
})

app.get('/products', (req, res) => {
  //5000 item max returnable items
  db.getList(req.query.page, req.query.count, (err, data) => {

    let datas = data.length > req.query.count ? data.slice(data.length - req.query.count) : data;
    let response = [];
    datas.forEach(prod => {
      let { product_id, name, slogan, description, category, default_price, created_at, updated_at, features, feature_values } = prod;
      let product = {
        product_id,
        name,
        slogan,
        description,
        category,
        default_price,
        created_at,
        updated_at,
      }
      let featuresArr = [];
      for (let i = 0; i < features.length; i++) {
        featuresArr.push({
          feature: features[i],
          value: feature_values[i] || null
        })
      }
      product.features = featuresArr;
      response.push(product)
      })
    res.send(response)
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})