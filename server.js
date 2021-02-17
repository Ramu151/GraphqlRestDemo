const express = require('express')
const bodyParser = require('body-parser')
const { GraphQLServer } = require('graphql-yoga')

const router = require('./restApi/route')

const Crud = require('./db/index')
const Query = require('./graphql/resolvers/query')
const Mutation = require('./graphql/resolvers/mutation')

const Server = new GraphQLServer({
    typeDefs : './graphql/typeDef/schema.graphql', 
    resolvers: {
        Query,
        Mutation
    },
    context: Crud
})

Server.start(() => {
    console.log('Graphql Server is running on localhost:4000')
})


const app = new express() 
const port = 8000

let ApiLogger = (req, res, next) => {
    console.log("Request Details : ", req.url, req.method);
    console.log("Response Details : ", res.statusCode, res.headers);
    next();
};
  
app.use(bodyParser.json())
app.use(ApiLogger);
app.use('/api', router)


app.listen(port,() => {
    console.log('Rest server running in port 8000')
})

