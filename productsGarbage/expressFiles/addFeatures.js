const ExpressCassandra = require('express-cassandra');
const fs = require('fs');
var LineByLineReader = require('line-by-line');
const addPhotos = require('./addPhotos.js')




module.exports = {
  init: (models) => {
    let prod = models.instance.Products;

    let header = false;
    let q = [];

    lr = new LineByLineReader('/home/ubuntu/express/expressFiles/features.csv');

    lr.on('line', function (line) {
      let row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

      for (let i = 0; i < row.length; i++) {
        if (row[i] === 'null') {
          row[i] = ''
        } else {
          if (row[i].substr(0, 1) === '"' && row[i].substr(row[i].length - 1) === '"') {
            row[i] = row[i].substr(1, row[i].length - 2);
          }
        }
      }

      if (!header) {
        header = !header
      } else {

        let id = +row[1]

        let u = prod.update(
          {product_id: id},
          {
            features:{'$add': [row[2]]},
            feature_values:{'$add': [row[3]]},
          },
          {return_query: true}
          )
          q.push(u)
          if (q.length > 250) {
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
          console.log('completed features')
          q = [];
          addPhotos.init(models)
        }
      })
    })
  }
}
