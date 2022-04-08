//this is a simple node and mongodb application
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

/* METHOD: MongoClient.connect: allows mongo client to connect to mongodb server. 
3 arguments: 
1st: url - const we've created, 2nd - passing an object for various options, 3rd - is a callback function with 2 parameters ( error, and client).
*/

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {

    assert.strictEqual(err, null); 

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped COllection ', result);

        

        //inserting a document here
       dboper.insertDocument( db, {name: "Breadcrumb Trail Campground", description: "Test"},
        'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocument(db, 'campsites',  docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, {name: "Breadcrumb Trail Campground" } , 
                {description: "Updated Test Description"}, 'campsites', result => {
                    console.log('Updated Document Count:', result.result.nMOdified);

                    dboper.findDocument(db, 'campsites', docs => {
                        console.log('Found Documents:', docs);

                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                        'campsites', result => {
                            console.log('Deleted Document Count:', result.deletedCount);

                            client.close();
                        
                        })
                    })
                })
            })
        })
    })
})
