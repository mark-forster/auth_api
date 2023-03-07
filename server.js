const express=require('express');
const app=express();
//Routes
const postRoute=require('./routes/post');
const userRoute=require('./routes/user');
//bodyParser
const bodyParser=require('body-parser');
//dotenv
require('dotenv').config();
const PORT=process.env.PORT;
const DB_URL=process.env.DB_URL;
//mongoose 
const mongoose=require('mongoose');

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Database Connection Error"));
db.once('open',()=>{
    console.log("Connected Successfully");
});
//body Parser and Express json middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
// Routes Middleware
app.use('/',postRoute);
app.use('/',userRoute);

app.listen(PORT|| 7000,()=>{
    console.log(`Server is running on ${PORT}`);
})