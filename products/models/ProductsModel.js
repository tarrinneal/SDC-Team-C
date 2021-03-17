module.exports = {
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
      type: "varchar"
    },
    created_at: {
      type: "varchar",
      default: {"$db_function": "toTimestamp(now())"},
      format: "date-time"
    },
    updated_at: {
      type: "varchar",
      default: {"$db_function": "toTimestamp(now())"},
      format: "date-time"
    },
    features: {
      type: "list",
      typeDef: "<varchar>"
    },
    feature_values: {
      type: "list",
      typeDef: "<varchar>"
    },
    related_products: {
      type: "list",
      typeDef: "<int>"
    },
  },
  key:["product_id"],
//   required: [
//     "name",
//     "category",
//     "created_at",
//     "product_id"
//   ],
}
