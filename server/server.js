const express = require('express');
const dbConnection = require('./public/lib/dbConnection');
//const bcrypt = require('bcryptjs');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {Book} = require('./models/books');
const bodyParser = require('body-parser');
const sequential = require('./public/root/sequential');
const parallelExec = require('./public/root/parallel');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());



app.get('/books/sequential',(req,res,callback)=>{
    // console.log("Request",req.query);
    // var bookName = req.query.bookName;
    // console.log("BookName",bookName);
    sequential.sequentialExample(res,"One Indian Girl","President",callback);
});

app.post('/books/add',(req,res,callback)=>{
    var bookName = req.body.bookName;
    var author = req.body.author;
    var publishedBy = req.body.publishedBy;
    var publishedOn = req.body.publishedOn;
    dbConnection.createDBConnection(function (err,db){
        if(err){
            console.log(err);
            callback(err);
        }
        db.collection('bookDetails').insertOne({bookName:bookName,author:author,publishedBy:publishedBy,publishedOn:publishedOn});
        res.status(200).send("Added Successfully");
        dbConnection.closeDB(db);
    });
    
});

app.get('/books/parallel',(req,res,callback)=>{
    // var author = req.query.author;
    // var published = req.query.publishedBy;
    parallelExec.booksParallel(res,"One Indian Girl","President",callback);

});
  

//   user.save().then(()=>{
//  console.log("Signin success");
//   }).catch((e)=>{
//       console.log("unsuccessful");
//       res.status(400).send(e);
//   })

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  


// app.post('/user/login',(req,res)=>{
//     var body = _.pick(req.body, ['email', 'password']);
//     var email = req.body.email;
//     var password = req.body.password;
//     db.collection("users").findOne({email: email, password:password})
// })


module.exports = { app };