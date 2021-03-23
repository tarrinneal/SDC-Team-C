const ExpressCassandra = require('express-cassandra');
const dbSetup = require('./dbSetup.js')

const models = ExpressCassandra.createClient({
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
    created_at: {
      type: "timestamp",
      default: {"$db_function": "toTimestamp(now())"}
    },
    updated_at: {
      type: "timestamp",
      default: {"$db_function": "toTimestamp(now())"}
    },
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
  required: [
    "product_id",
    "name",
    "created_at",
    "product_id"
  ],
  options: {
    timestamps: {
        createdAt: 'created_at', // defaults to createdAt
        updatedAt: 'updated_at' // defaults to updatedAt
    }
  },
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
    sale_price: {
      type: "varchar",
      default: null
    },
    default_style: {
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


const getProduct = (id, cb) => {
  return models.instance.Products.findOne({product_id: id}, function(err, data){
    cb(err, data)
  });
}

const getStyles = (id, cb) => {
  return models.instance.Styles.find({product_id: id}, function(err, data){
    cb(err, data)
  });
}

const getList = (page, count, cb) => {
  page = +page || 1;
  count = +count || 5;
  let totalGet = page * count

  const turnPage = (start = null) => {
    limit = totalGet > 10000 ? 5000 : (totalGet - count === 0 ? count : totalGet - count)
    const query = {
      $limit: limit
    }

    if (start) {
      query.product_id = {
        '$token': {'$gt': start}
      }
    }
    return models.instance.Products.find(
      query,
      function(err, data) {
        if (totalGet <= 5000 ) {

          cb(err, data)
        } else {
          totalGet -= limit
          turnPage(data[count - 1].product_id)
        }
      }
    )
  }
  turnPage()
}


//call dbSetup.js with models

module.exports = {
  getProduct,
  getStyles,
  getList
}
