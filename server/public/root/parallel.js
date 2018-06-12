const dbConnection = require('./../lib/dbConnection');
const async = require('async');


module.exports = {
    booksParallel: function(res,name,by,cb){
        var tasks = [];
        dbConnection.createDBConnection(function(err,db){
            if(err){
                cb(err);
            }
            var collection = db.collection('bookDetails');
        
        var start = new Date();
        tasks.push(function(taskCallback){
            collection.findOne({bookName:name},function(err,data){
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
        async.parallel(tasks,
        // optional callback
        function(err, results){
            if(err){
                console.log('Error');
            } else {
        
            }
            console.log(results);
            res.status(200).send("success");
            console.log('done', new Date().getTime() - start.getTime());
            //results is now equal to [ 'one', 'two', undefined ]
            // the second function had a shorter timeout.
        });
    });
    }
}