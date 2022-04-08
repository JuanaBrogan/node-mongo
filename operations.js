const CountOperation = require('mongodb/lib/operations/count');

const assert = require('assert').strict;

exports.insertDocument = ( db, document, collection, callback) => {
    const coll = db.collection(collection); //the collection argument is expecting a string like 'campsites'
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    })
}

exports.findDocument = ( db, collection, callback) => {
    const coll = db.collection(collection); 
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null); 
        callback(docs);
    })
}

exports.removeDocument = ( db, document, collection, callback) => {
    const coll = db.collection(collection); 
    coll.deleteOne(document, (err,result) => {
        assert.strictEqual(err, null);
        callback(result);
    })
}

exports.updateDocument = ( db, document, update, collection, callback) => {
    const coll = db.collection(collection); 
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        callback(result);
    } )
    
}