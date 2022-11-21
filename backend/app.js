const express = require('express');
const http = require('http');
require('dotenv').config();
const {mongoConnect} = require('./services/mongo');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const transferRoute = require('./routes/transferRoute');
const topupRoute = require('./routes/topupRoute');

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors")
const tokenAuth = require("./middleware/tokenAuth")


app.use(cors())
app.use(express.json());
// configs

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


// route
app.use(userRoute);
app.use(transferRoute);
app.use(topupRoute);
app.use(tokenAuth.authenticator);


const server = http.createServer(app);

const startServer = async () => {
    try {
        await mongoConnect()

        server.listen(port, ()=> {
          console.log("Listening to the server on http://localhost:3000")});
    } catch (error) {
        console.log(error)
    }
}

startServer();