module.exports = {
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
}

// USE sdc_photos;

// cqlsh DBUSER -f relative/path/to/cql


// COPY listings_by_id (
// share_id,
// name,
// rating,
// reviews,
// listing,
// photo_id,
// description,
// url
// )
// FROM 'database/monsterListing3.csv'
// WITH DELIMITER=','
// AND HEADER=TRUE;

// http://blog.sws9f.org/nosql/2016/02/11/import-csv-to-cassandra.html#:~:text=Import%20CSV%20to%20Cassandra%20Two%20possible%20way%20to,should%20prepare%20sstable-format%20files%20with%20CQLSSTableWriter%20before%20import

// copy from csv file import somehow.
// cql file? that can run commands including pulling


// product = {
//   product_id: 'int',
//   name: 'varchar',
//   slogan: 'varchar',
//   description: 'varchar',
//   category: 'varchar',
//   default_price: 'int',
//   created_at: 'timestamp',
//   updated_at: 'timestamp',
//   features: [
//     {
//       feature: 'varchar',
//       value: 'varchar',
//     }
//   ],
//   related_products: ['int'],
//   styles: [
//     {
//       name: 'varchar',
//       original_price: 'varchar',
//       sale_price: 'varchar',
//       'default?': 'bool',
//       skus: [
//         {
//           style_id: 'int',
//           quantity: 'int',
//           size: 'varchar'
//         }
//       ],
//       photos: [
//         {
//           thumbnail: 'varchar',
//           url: 'varchar'
//         }
//       ]
//     }
//   ]
// }