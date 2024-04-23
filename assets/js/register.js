/*const { MongoClient } = require('mongodb')
const { connect } = require('mongoose')

let dbConnection
let uri = 'mongodb+srv://aferrerodaw:VFRHUPWzcCvclNax@cluster0.nxj9ol6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = { 
    connectToDb: (cb) => {
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        }).catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}*/