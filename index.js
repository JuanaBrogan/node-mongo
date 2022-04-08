//this is a simple node and mongodb application
const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

/* METHOD: MongoClient.connect: allows mongo client to connect to mongodb server. 
3 arguments: 
1st: url - const we've created, 2nd - passing an object for various options, 3rd - is a callback function with 2 parameters ( error, and client).
*/

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));

    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);
        return dboper.findDocument(db, 'campsites');
    })

    .then(docs => {
        console.log('Found Document:', docs);
        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" }, 'campsites');
    })

    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);
        return dboper.findDocument(db, 'campsites');
    })

    .then(docs => {
        console.log('Found Document:', docs);
        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
            'campsites');
    })

    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);
        return client.close();
    })
    
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));
