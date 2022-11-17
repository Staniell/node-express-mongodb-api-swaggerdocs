const users = [
    {
          "_id": "6374d48b2d26b4df3b9c68f7",
          "username": "Prezel",
          "firstname": "Mark",
          "lastname": "John",
          "coin_balance": 100,
          "date_created": "1668600971169",
          "__v": 0
        },
        {
          "_id": "6374d6413de321b04ecf319b",
          "username": "Mary",
          "firstname": "Anna",
          "lastname": "Anze",
          "coin_balance": 300,
          "date_created": "1668601409213",
          "__v": 0
        }
      
    ]

const listUsers = {
    tags:["User"],
    summary:"Lists all users within the database",
    description: "Lists all users within the database with all fields",
    responses:{
        200:{
            description:"Success/OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                            users
                        }
                    }
                }
            }
        }
    }
}


const createUser = {
    tags:["User"],
    summary:"Creates a user with username, firstname, lastname, with a default initial balance of 100 coins",
    description: "Creates a user with initial balance of 100.",
    requestBody:{
       content:{ "application/json":{
            schema:{
                type:"object",
                    properties:{
                        username:{
                            type: "string",
                            description: "Username to be used on the website",
                            example:"Anne"
                        },
                        firstname:{
                            type: "string",
                            description: "First name to be used on the website",
                            example:"Anna"
                        },
                        lastname:{
                            type: "string",
                            description: "Last name to be used on the website",
                            example:"Anze"
                        },
                    },
                }
            }
        
        }
    
    },
    responses:{
        200:{
            description:"Success/OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:users[0]
                    }
                }
            }
        }
    }
}

const setupCoins = {
    tags:["User"],
    summary:"Update all user's coin balance to 100",
    description: "Update all user's coin balance to 100.",
    responses:{
        200:{
            description:"Success/OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                            "acknowledged": true,
                            "modifiedCount": 0,
                            "upsertedId": null,
                            "upsertedCount": 0,
                            "matchedCount": 7
                          }
                    }
                }
            }
        }
    }
}

const getUserbyUserId = {
    tags:["User"],
    summary:"Get user's coin balance from user id through path",
    description: "Get user's coin balance by User ID.",
    parameters:[
        {
            name:"userId",
            in:"path",
            description:"id of the user",
            type:"ObjectId",
            example:"6374d48b2d26b4df3b9c68f7"
        }
    ],
    responses:{
        200:{
            description:"Success/OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:users[0].coin_balance
                    }
                }
            }
        }
    }
}

const transferCoin = {
    tags:["User"],
    summary:"Transfer first user's coin balance to the second user.",
    description: "First user's id passed through the path will be transfered to the second user in the path url.",
    parameters:[
        {
            name:"userId",
            in:"path",
            description:"id of the user",
            type:"ObjectId",
            example:"6374d48b2d26b4df3b9c68f7"
        },
        {
            name:"userId2",
            in:"path",
            description:"id of the user",
            type:"ObjectId",
            example:"6375286a0a0c38e688c0d8e8"
        }
    ],
    responses:{
        200:{
            description:"Success/OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:[{
                            "_id": "6374d48b2d26b4df3b9c68f7",
                            "username": "Prezel",
                            "firstname": "Mark",
                            "lastname": "John",
                            "coin_balance": 0,
                            "date_created": "1668600971169",
                            "__v": 0
                          },
                          {
                            "_id": "6374d6413de321b04ecf319b",
                            "username": "Mary",
                            "firstname": "Anna",
                            "lastname": "Anze",
                            "coin_balance": 1200,
                            "date_created": "1668601409213",
                            "__v": 0
                          }]
                    }
                }
            }
        }
    }
}

const userRouteDocs = { 
    "/users/setupcoins":{
        patch : setupCoins
    },
    "/users":{
        get : listUsers,
        post: createUser
    },
    "/users/{userId}":{
        get:getUserbyUserId
    },
    "/users/transfer/{userId}/{userId2}":{
        patch:transferCoin
    }
}

module.exports = userRouteDocs