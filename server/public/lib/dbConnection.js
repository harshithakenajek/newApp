var MongoClient = require('mongodb').MongoClient;


function createDBConnection(cbk) {
    var dbUrl = "mongodb://localhost:27017/Books";

    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {

            return cbk(true, null)
        }

        console.log('connected');
        return cbk(null, db);
    });
}

function closeDB(db) {
    console.log("Close DB");
    db.close();
}
module.exports = {
    createDBConnection,
    closeDB
}

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/Authentication";

// module.exports = {
//     createDbConnection: function (cbk) {
//         MongoClient.connect(url, function (err, db) {
//             if (err) {
//                 return cbk(true, null)
//             }
//             //var dbo = db.db("Authentication");
//             db.createCollection("users", function (err, res) {
//                 if (err) throw err;
//                 console.log("Collection created!");

//             });
//             return cbk(null, db);
//         });
//     },
//     closeDB: function(db, cbk) {
//         console.log("Close DB");
//         db.close(function () {
//             return cbk();
//         });
//     }
// }

// module.exports = { MongoClient };
// const MongoClient = require('').MongoClient;
// const {MongoClient,ObjectID} = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db)=>{
//     if(err){
//        return console.log('Unable to connect to MongoDb server');
//     }
//     console.log('Connected to Mongodb server');

//     db.close();
// });