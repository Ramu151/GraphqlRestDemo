// connect db with app
// DB URL: https://cloud.mongodb.com/v2/5ef4437625a411434fb7c154#metrics/replicaSet/5ff16b21b6faa970e36d035f/explorer/HotelBooking/hotels/find


// MongoDB Atlas cluste setup with node quick start (https://docs.mongodb.com/drivers/node/quick-start)
//https://docs.atlas.mongodb.com/tutorial/insert-data-into-your-cluster - mongodb atlas doc

const MongoClient = require('mongodb').MongoClient;
const Crud = require('./crud')

const uri = "mongodb+srv://admin:admin@cluster0.bn8gj.mongodb.net/HotelBooking?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let hotelDb = null
let collection = null

const mongoConnect = async () => {
    try {
        await client.connect()
        hotelDb = client.db("HotelBooking");
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
}

const getHotelData = async (collectionType, id) =>{
    let hotelId = parseInt(id)
    collection = hotelDb.collection(collectionType || 'hotels')
    let hotelList = await Crud.aggregateData(collection, hotelId, collectionType)
    return hotelList
}

const addHotelData = async (data, collectionType) =>{
    collection = hotelDb.collection(collectionType);
    let insertData = await Crud.insertData(data, collection)
    return insertData
}

const removeHotelData = async (id, collectionType) => {
    collection = hotelDb.collection(collectionType);
    let deletedData = await Crud.deleteHotelData(id, collection)
    return deletedData
}

mongoConnect()

const hotelObj = { getHotelData , addHotelData, removeHotelData }

module.exports = hotelObj