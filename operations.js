const CountOperation = require('mongodb/lib/operations/count');

exports.insertDocument = ( db, document, collection ) => {
    const coll = db.collection(collection); //the collection argument is expecting a string like 'campsites'
    return coll.insertOne(document);
}

exports.findDocument = ( db, collection) => {
    const coll = db.collection(collection); 
    return coll.find().toArray();
}

exports.removeDocument = ( db, document, collection) => {
    const coll = db.collection(collection); 
    return coll.deleteOne(document);
}

exports.updateDocument = ( db, document, update, collection) => {
    const coll = db.collection(collection); 
    return coll.updateOne(document, { $set: update }, null);
    
}