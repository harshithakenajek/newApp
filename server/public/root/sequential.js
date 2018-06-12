var app = require('./../../server.js');
const dbConnection = require('./../lib/dbConnection');
var Promise = require('promise');
const async = require('async');

function sequentialExample(res, bookName,by ,cb) {
    dbConnection.createDBConnection(function (err, db) {
        if (err) {
            console.log("Sequential Errror", err);
            callback(err);
        }
        var collection = db.collection('bookDetails');
        var obj = {};
        var start = new Date();
        // obj = new Promise((resolve, reject) => {
        //     collection.findOne({ bookName: bookName }, function (err, data) {
        //         if (err) {
        //             console.log("ERRRRRRRRRRRRRRrrr");
        //             reject(err);
        //         }

        //         resolve(data);
        //         console.log("DATA", data);
        //     });
        // });
        // console.log("HERE", obj);
        // obj = new Promise((resolve, reject) => {
        //     collection.findOne({ publishedBy: by }, function (err, data) {
        //         if (err) {
        //             console.log("ERRRRRR");
        //             reject(err);
        //         }

        //         resolve(data);
        //         console.log("DATA", data);
        //     });
        // });
        // console.log("HERE", obj);
       var tasks=[];
        tasks.push(function(taskCallback){
            collection.findOne({bookName:bookName},function(err,data){
                if(err){
                    taskCallback(null,err);
                }
                taskCallback(null,data);
            })
        });
        tasks.push(function(taskCallback){
            collection.findOne({publishedBy:by},function(err,data){
                if(err){
                    taskCallback(null,err);
                }
                taskCallback(null,data);
            })
        });
        async.series(tasks,
        // optional callback
        function(err, results){
            if(err){
                console.log('Error');
            } else {
        
            }
            console.log(results);
        res.status(200).send("success");
        dbConnection.closeDB(db);
        console.log('done', new Date().getTime() - start.getTime());
    });
});
}

module.exports = {
    sequentialExample
}



