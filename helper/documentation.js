const userRouteDocs = require('../routes/users.doc')

const swaggerOptions = {
    openapi:"3.0.0",
    info:{
        title: "NodeJS API w/ MongoDB",
        version: '1.0.0',
        description: "RESTFUL API using NodeJS w/ MongoDB"
    },
    tags:[
        {
            name: "User",
            description:"Routes for users"
        }
    ],
    paths:{...userRouteDocs},
};

module.exports = swaggerOptions;