//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectId

const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error){
        return console.log('unable to connect')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: "Learn UiPth"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    /*db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: 'true'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/

    /*db.collection('users').updateOne({
        _id: new ObjectId("635ba0f87b72152ba34cae36")
    }, {
        $set: {
            name: 'newjane'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/

   /* db.collection('users').findOne({ _id: new ObjectId("635b9c4ed499d9839727ee6b")}, (error, user) => {
        if (error){
            return console.log('unable to fetch')
        }
        console.log(user)
    })

    db.collection('users').find({name: 'Margo'}).toArray ((error, users) => {
    if (error){
        return console.log('unable to fetch')
    }
    console.log(users)
})
    db.collection('tasks').find({completed: true}).toArray((error, tasks) => {
        console.log(tasks)
    })*/

    /*db.collection('users').insertOne({
        _id: id,
        name: 'OLGA',
        age: 30
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert user')
        }
        console.log(result.insertedId)
    })*/
    /*db.collection('users').insertMany([
        {
            name: 'Jane',
            age: 22
        },{
            name: 'John',
            age: 11

        }
    ], (error, result) => {
        if(error) {
            return console.log("unable to insert doc")
        }
        console.log(result.acknowledged)
    })*/

    /*db.collection('tasks').insertMany([
        {
            description: 'Learn node',
            completed: true
        },{
            description: 'Learn UiPth',
            completed: false

        }
    ], (error, result) => {
        if(error) {
            return console.log("unable to insert doc")
        }
        console.log(result.acknowledged)
    })*/
})