const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const swaggerUI = require("swagger-ui-express");

const swaggerDocumentation = require("./helper/documentation")
//http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

const bodyParser = require("body-parser")

app.use(bodyParser.json());

// Middleware
const userRoute = require("./routes/users")
app.use("/users", userRoute)

app.get("/", (req, res) => {
    res.send("Initial page");
});


mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log("connected")
})
app.listen(3000);