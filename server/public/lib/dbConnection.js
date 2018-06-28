const MongoClient = require('mongodb').MongoClient;


function createDBConnection(cbk) {
    const dbUrl = 'mongodb://localhost:27017/Books';

    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {

            return cbk(true, null);
        }

        console.log('connected');
        return cbk(null, db);
    });
}

function closeDB(db) {
    console.log('Close DB');
    db.close();
}
module.exports = {
    createDBConnection,
    closeDB
};