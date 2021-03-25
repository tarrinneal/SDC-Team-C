const ExpressCassandra = require('express-cassandra');
const fs = require('fs');
var LineByLineReader = require('line-by-line');
const addFeatures = require('./addFeatures.js')




module.exports = {
  init: (models) => {

  let prod = models.instance.Products;

    let header = false;
    let q = [];

    lr = new LineByLineReader('/home/ubuntu/express/expressFiles/product.csv');

    lr.on('line', function (line) {
      let row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)


      if (!header) {
        header = !header
      } else {

        let id = +row[0]

        let u = prod.update(
          {product_id: id},
          {
            created_at: (new Date()).toISOString(),
          },
          {return_query: true}
          )
          q.push(u)
          if (q.length > 1000) {
            lr.pause();

            models.doBatch(q, function(err){
            if(err) {
              console.error(err)
            } else {

              q = [];
              lr.resume();
            }
          })
        }
      }
    });

    lr.on('end', (line) => {
      models.doBatch(q, function(err){
        if(err) {
          console.error(err)
        } else {
          console.log('completed created')
          q = [];
          addFeatures.init(models)
        }
      })
    })
  }
}