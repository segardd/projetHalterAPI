var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { graphql } = require('graphql');
var mongoose = require('mongoose');
var path = require('path');
//import { introspectionQuery, printSchema } from 'graphql/utilities';
const fs = require('fs-extra');

var schema = require('./api/resolvers/objectsToGraphQL');
var { introspectionQuery, printSchema } = require('graphql/utilities');
var app = express();

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(console.log('mongoose.connect: cleared')).catch(function (err) { console.error(err) });

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var db = mongoose.connection;
db.on('reject', function () { throw new Error('an error occured at the mongoose.connection') });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('connected')
});
console.log('schema: ',schema)

async function buildSchema() {
    await fs.ensureFile('./data/schema.graphql.json');
    await fs.ensureFile('./data/schema.graphql');

    fs.writeFileSync(
        path.join(__dirname, './data/schema.graphql.json'),
        JSON.stringify(await graphql(schema, introspectionQuery), null, 2)
    );

    fs.writeFileSync(
        path.join(__dirname, './data/schema.graphql'),
        printSchema(schema)
    );
}

async function run() {
    await buildSchema();
    console.log('Schema build complete!');
}

run().catch(e => {
    console.log(e);
    process.exit(0);
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');