const ExpressCassandra = require('express-cassandra');
const dbSetup = require('./dbSetup.js')

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