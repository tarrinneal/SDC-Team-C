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