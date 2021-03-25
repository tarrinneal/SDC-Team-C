const ExpressCassandra = require('express-cassandra');
const fs = require('fs');
var LineByLineReader = require('line-by-line');
const addSkus = require('./addSkus.js')




module.exports = {
  init: (models) => {
    let prod = models.instance.Products;

    let header = false;
    let q = [];

    lr = new LineByLineReader('/home/ubuntu/express/expressFiles/related.csv');

    lr.on('line', function (line) {

      let row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

      if (!header) {
        header = !header
      } else {

        let id = +row[1]

        let u = prod.update(
          {product_id: id},
          {
            related_products:{'$add': [+row[2]]},
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
          console.log('completed Related')
          q = [];
          addSkus.init(models)
        }
      })
    })
  }
}
