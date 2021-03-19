const ExpressCassandra = require('express-cassandra');
const fs = require('fs');
const readline = require('readline');
const addFeatures = require('./addFeatures')

var models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'products',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

var ProductModel = models.loadSchema('Products', {
    fields: {
      product_id: {
        type: "int"
      },
      name: {
        type: "varchar"
      },
      slogan: {
        type: "varchar"
      },
      description: {
        type: "varchar"
      },
      category: {
        type: "varchar"
      },
      default_price: {
        type: "int"
      },
      created_at: "timestamp",
      updated_at: "timestamp",
      features: {
        type: "list",
        typeDef: "<varchar>",
      },
      feature_values: {
        type: "list",
        typeDef: "<varchar>",
      },
      related_products: {
        type: "list",
        typeDef: "<int>",
      },
    },
    key:["product_id"],
  //   required: [
  //     "name",
  //     "category",
  //     "created_at",
  //     "product_id"
  //   ],
  });

  var StyleModel = models.loadSchema('Styles', {
    fields: {
      style_id: {
        type: "int"
      },
      product_id: {
        type: "int"
      },
      name: {
        type: "varchar"
      },
      original_price: {
        type: "varchar"
      },
      original_price: {
        type: "varchar",
        default: null
      },
      "default?": {
        type: "boolean",
        default: false
      },
      sku_id: {
        type: "list",
        typeDef: "<int>"
      },
      sku_size: {
        type: "list",
        typeDef: "<varchar>"
      },
      sku_quantity: {
        type: "list",
        typeDef: "<int>"
      },
      photo_urls: {
        type: "list",
        typeDef: "<varchar>"
      },
      photo_thumbnail_urls: {
        type: "list",
        typeDef: "<varchar>"
      }
    },
    key:["product_id", "style_id"],
  //   required: [
  //     "name",
  //     "category",
  //     "created_at",
  //     "product_id"
  //   ],
  });

// addFeatures.init(models)


ProductModel.syncDB(function(err, result) {
    if (err) throw err;
    console.log('changed?', result)
});

StyleModel.syncDB(function(err, result) {
    if (err) throw err;
    console.log('changed?', result)
});


// COPY products."Products"(product_id, name, slogan, description, category, default_price) FROM '/home/bargle/hackreactor/SDC-Team-C/products/product.csv' WITH DELIMITER=',' AND HEADER=TRUE ;