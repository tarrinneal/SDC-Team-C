const express = require('express')
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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// {
//   "style_id": 4660348,
//   "product_id": 1000011,
//   "name": "Teal",
//   "original_price": "662",
//   "sale_price": "null",
//   "default_style": false,
//   "sku_id": [
//       26961698,
//       26961699,
//       26961700,
//       26961701,
//       26961702,
//       26961703
//   ],
//   "sku_size": [
//       "XS",
//       "S",
//       "M",
//       "L",
//       "XL",
//       "XXL"
//   ],
//   "sku_quantity": [
//       8,
//       29,
//       4,
//       59,
//       34,
//       21
//   ],
//   "photo_urls": [
//       "https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80",
//       "https://images.unsplash.com/photo-1479756212843-6314ad5121dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
//       "https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
//       "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
//   ],
//   "photo_thumbnail_urls": [
//       "https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//       "https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//       "https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//       "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
//   ]
// },
