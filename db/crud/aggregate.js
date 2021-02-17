const aggregateData = async (collection, hotelid, collectionType) =>
   {
     let data = null
     if(collectionType == "amentities"){
        data = await collection.find({}).toArray()
        return data
     }
     if(hotelid){
        data = await collection.aggregate([
          { $match: { id: hotelid } },
          {
            $project: {
              wifi: 0,
              roomService: 0,
              laundry: 0,
              locker: 0,
              swimmingPool: 0,
              giftShops: 0,
              _id: 0,
            },
          },
        ]).toArray()
     }
     else{
        data = await collection.aggregate([
          {
            $project: {
              wifi: 0,
              roomService: 0,
              laundry: 0,
              locker: 0,
              swimmingPool: 0,
              giftShops: 0,
              _id: 0,
            },
          },
        ]).toArray()
     }
      return data
  }

module.exports = aggregateData