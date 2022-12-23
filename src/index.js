const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();


app.use(express.json());


mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://cluster0.6evf0.mongodb.net/?retryWrites=true&w=majority", {
        dBname: 'syngenta_db',
        user: 'Avijit07',
        pass: 'Avijit@1998',
        useNewUrlParser: true
    })
.then(() => console.log("MongoDb is connect"))
.catch(err => console.log(err));

app.use('/', route);

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Express app running on port ${PORT}` )
});