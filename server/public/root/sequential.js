const dbConnection = require('./../lib/dbConnection');
const Promise = require('promise');

const sequentialExample = (res, bookName, by, cb) => {
    dbConnection.createDBConnection(async (err, db) => {
        if (err) {
            console.log('Sequential Errror', err);
            cb(err);
            return;
        }
        const collection = db.collection('bookDetails');
        const start = new Date();

        const findByBookName = () => {
            return new Promise((resolve, reject) => {
                collection.findOne({ bookName: bookName }, (err, data) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    else {
                        console.log('data1', data);
                        resolve(data);
                        // var publishedby = await data.publishedBy;
                    }
                });
            });
        };
        const findByPublishedBy = () => {
            return new Promise((resolve, reject) => {
                collection.findOne({ publishedBy: by }, (err, data) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    else {
                        console.log('data2', data);
                        resolve(data);
                    }
                });
            });

        };
        const res1 = await findByBookName();
        console.log('result',res1);
        const res2 = await findByPublishedBy();
        console.log('result2',res2);
        res.status(200).send('success');
        dbConnection.closeDB(db);
        console.log('done', new Date().getTime() - start.getTime());
    });
};

module.exports = {
    sequentialExample
};



