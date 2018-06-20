const dbConnection = require('./../lib/dbConnection');
const async = require('async');




const booksParallel = (res, name, by, cb) => {
    // var tasks = [];
    dbConnection.createDBConnection(async (err, db) => {
        if (err) {
            console.log("Sequential Errror", err);
            cb(err);
            return;
        }
        const collection = db.collection('bookDetails');
        const start = new Date();

        const findByBookName = () => {
            return new Promise((resolve, reject) => {
                collection.findOne({ bookName: name }, (err, data) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    else {
                        // console.log("data1",data);
                        resolve(data);
                        // var publishedby = await data.publishedBy;
                    }
                });
            })
        }
        const findByPublishedBy = () => {
            return new Promise((resolve, reject) => {
                collection.findOne({ publishedBy: by }, (err, data) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    else {
                        // console.log("data2",data);
                        resolve(data);
                    }
                });
            })

        }
        const rr = await Promise.all([await findByBookName(), await findByPublishedBy()]);
        console.log('parallel', rr);
        res.status(200).send("success");
        dbConnection.closeDB(db);
        console.log('done', new Date().getTime() - start.getTime());
    });
}

module.exports = {
    booksParallel
}