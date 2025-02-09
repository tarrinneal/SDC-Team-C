const ExpressCassandra = require('express-cassandra');
const fs = require('fs');
var LineByLineReader = require('line-by-line');
const addRelated = require('./addRelated.js')


const addF = (models, dict) => {
  let style = models.instance.Styles;

  let header = false;
  let q = [];

  lr = new LineByLineReader('/home/ubuntu/express/expressFiles/photos.csv');

    lr.on('line', function (line) {
      let row = line.split(',')


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

        let u = style.update(
          {
            product_id: dict[id],
            style_id: id
          },
          {
            photo_urls:{'$add': [row[2]]},
            photo_thumbnail_urls:{'$add': [row[3]]},
          },
          {return_query: true}
          )
          q.push(u)
          if (q.length > 100) {
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
          console.log('complete photos')
          q = [];
          addRelated.init(models)
        }
      })
    })
}

module.exports = {
  init: (models) => {
    let style = models.instance.Styles;

    let dict = {};
    let header = false;

    prdSty = new LineByLineReader('/home/ubuntu/express/expressFiles/styles.csv');

    prdSty.on('line', function (line) {
      let row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)


      if (!header) {
        header = !header
      } else {
        dict[row[0]] = +row[1];
      }
    });

    prdSty.on('end', (line) => {
      addF(models, dict);
    })
  }
}
