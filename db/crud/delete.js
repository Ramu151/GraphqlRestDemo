const deleteHotelData = async (id, collection) =>   {
    try{
        let result = await collection.deleteMany({"id": id})
        // let result = await collection.deleteMany({ "id": { $gt: id } })
        // let result = await collection.deleteMany({"name": null})
        return result
    }
    catch(e){
        console.log('delete query : ',e)

    }
}
module.exports = deleteHotelData
